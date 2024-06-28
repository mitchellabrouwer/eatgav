-- Create or replace the function to get recipes with ratings
CREATE OR REPLACE FUNCTION get_recipes_with_ratings(
  _cursor int DEFAULT 0, 
  _limit int DEFAULT 10, 
  _query text DEFAULT NULL, 
  _cost cost_type DEFAULT NULL, 
  _difficulty difficulty_type DEFAULT NULL, 
  _occasion text DEFAULT NULL, 
  _time_to_plate int DEFAULT NULL
) RETURNS TABLE(
    id uuid,
    user_id uuid,
    title text,
    description text,
    ingredients text[],
    steps text[],
    created_at timestamptz,
    updated_at timestamptz,
    occasion occasion_type[],
    cost cost_type,
    difficulty difficulty_type,
    time_to_plate int,
    average_rating double precision,
    total_votes bigint
  )
  AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.user_id,
    r.title,
    r.description,
    r.ingredients,
    r.steps,
    r.created_at,
    r.updated_at,
    r.occasion,
    r.cost,
    r.difficulty,
    r.time_to_plate,
    COALESCE(CAST(AVG(rev.rating) OVER(PARTITION BY r.id) AS double precision), 0) AS average_rating,
    CAST(COUNT(rev.id) OVER(PARTITION BY r.id) AS bigint) AS total_votes
  FROM
    recipes r
  LEFT JOIN reviews rev ON r.id = rev.recipe_id
  WHERE
    (
      _query IS NULL
      OR _query = ''
      OR search_vector @@ to_tsquery('english', regexp_replace(_query, '\s+', ':* & ', 'g') || ':*')
    )
    AND(_cost IS NULL OR r.cost = _cost)
    AND(_difficulty IS NULL OR r.difficulty = _difficulty)
    AND(_occasion IS NULL OR r.occasion @> ARRAY[_occasion]::occasion_type[])
    AND(_time_to_plate IS NULL OR r.time_to_plate = _time_to_plate)
  ORDER BY
    r.id
  LIMIT _limit OFFSET _cursor;
END;
$$
LANGUAGE plpgsql;
