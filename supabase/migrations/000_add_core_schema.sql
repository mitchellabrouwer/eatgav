-- Create the recipes table
CREATE TYPE cost_type AS ENUM ('really_cheap', 'cheap', 'ok', 'expensive', 'really_expensive');
CREATE TYPE difficulty_type AS ENUM ('very_easy', 'easy', 'moderate', 'hard', 'very_hard');
CREATE TYPE occasion_type AS ENUM ('breakfast', 'lunch', 'dinner', 'snack', 'dessert');

CREATE TABLE recipes(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  title text NOT NULL,
  description text NOT NULL,
  ingredients text [] NOT NULL,
  steps text [] NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW(),
  occasion occasion_type[], 
  cost cost_type,
  difficulty difficulty_type,
  time_to_plate int,
  search_vector tsvector -- search_vector column
);

-- Create the index for search_vector
CREATE INDEX search_vector_idx ON recipes USING gin(search_vector);

-- Create the comments table
CREATE TABLE comments(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id uuid REFERENCES recipes(id),
  user_id uuid REFERENCES auth.users(id),
  comment text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

-- Create the reviews table
CREATE TABLE reviews(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer CHECK (
    rating >= 1
    AND rating <= 5
  ),
  review text,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_recipe_user UNIQUE (recipe_id, user_id)
);

-- Create the favourites table
CREATE TABLE favourites(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  CONSTRAINT unique_favourite_recipe UNIQUE (recipe_id, user_id)
);