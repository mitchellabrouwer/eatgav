-- Insert users into auth.users
INSERT INTO
  auth.users (
    id,
    email,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  )
VALUES
  (
    '123e4567-e89b-12d3-a456-426614174000',
    'user1@example.com',
    '{}',
    '{"first_name": "John", "last_name": "Doe"}',
    NOW(),
    NOW()
  ),
  (
    '123e4567-e89b-12d3-a456-426614174001',
    'user2@example.com',
    '{}',
    '{"first_name": "Jane", "last_name": "Smith"}',
    NOW(),
    NOW()
  ),
  (
    '123e4567-e89b-12d3-a456-426614174002',
    'user3@example.com',
    '{}',
    '{"first_name": "Alice", "last_name": "Johnson"}',
    NOW(),
    NOW()
  );

-- Insert sample data into recipes table
INSERT INTO
  recipes (
    id,
    user_id,
    title,
    description,
    ingredients,
    steps,
    created_at,
    updated_at,
    occasion,
    cost,
    difficulty,
    time_to_plate,
    search_vector
  )
VALUES
  (
    '1f6d9cda-9ec0-4ad1-bf7c-3774f3e9f400',
    '123e4567-e89b-12d3-a456-426614174000',
    'Spaghetti',
    'Delicious homemade spaghetti.',
    '{"pasta", "tomato sauce", "cheese"}',
    '{"boil pasta", "add sauce", "sprinkle cheese"}',
    NOW(),
    NOW(),
    '{"dinner"}',
    'ok', 
    'easy',
    30,
    NULL
  ),
  (
    '2a7b3e5f-bdae-478f-9b1f-3e9c528bcfb2',
    '123e4567-e89b-12d3-a456-426614174001',
    'Tacos',
    'Authentic Mexican tacos.',
    '{"tortilla", "beef", "cheese", "salsa"}',
    '{"cook beef", "assemble tacos", "serve with salsa"}',
    NOW(),
    NOW(),
    '{"lunch"}',
    'cheap', 
    'moderate',
    20,
    NULL
  ),
  (
    '3c8e7fda-a7b3-4a4a-89fb-4a8b5f8d1c2b',
    '123e4567-e89b-12d3-a456-426614174002',
    'Cheesecake',
    'Creamy cheesecake with a graham cracker crust.',
    '{"cream cheese", "sugar", "eggs", "graham crackers"}',
    '{"make crust", "mix filling", "bake"}',
    NOW(),
    NOW(),
    '{"dessert"}',
    'expensive', 
    'hard',
    60,
    NULL
  );

-- Insert sample data into comments table
INSERT INTO
  comments (
    id,
    recipe_id,
    user_id,
    comment,
    created_at,
    updated_at
  )
VALUES
  (
    '1d1b2a3c-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
    '1f6d9cda-9ec0-4ad1-bf7c-3774f3e9f400',
    '123e4567-e89b-12d3-a456-426614174001',
    'This spaghetti is amazing!',
    NOW(),
    NOW()
  ),
  (
    '2d1b2a3c-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
    '2a7b3e5f-bdae-478f-9b1f-3e9c528bcfb2',
    '123e4567-e89b-12d3-a456-426614174002',
    'Loved these tacos!',
    NOW(),
    NOW()
  );

-- Insert sample data into reviews table
INSERT INTO
  reviews (
    id,
    recipe_id,
    user_id,
    rating,
    review,
    created_at,
    updated_at
  )
VALUES
  (
    '3e1f2a3b-4c5d-6a7b-8c9d-0e1f2a3b4c5d',
    '1f6d9cda-9ec0-4ad1-bf7c-3774f3e9f400',
    '123e4567-e89b-12d3-a456-426614174002',
    5,
    'Best spaghetti I ever had!',
    NOW(),
    NOW()
  ),
  (
    '4f1e2a3b-4c5d-6a7b-8c9d-0e1f2a3b4c5d',
    '3c8e7fda-a7b3-4a4a-89fb-4a8b5f8d1c2b',
    '123e4567-e89b-12d3-a456-426614174001',
    4,
    'Great cheesecake, a bit sweet for my taste.',
    NOW(),
    NOW()
  );

-- Insert sample data into favourites table
INSERT INTO
  favourites (id, user_id, recipe_id)
VALUES
  (
    '5f1e2a3b-4c5d-6a7b-8c9d-0e1f2a3b4c5d',
    '123e4567-e89b-12d3-a456-426614174000',
    '2a7b3e5f-bdae-478f-9b1f-3e9c528bcfb2'
  ),
  (
    '6f1e2a3b-4c5d-6a7b-8c9d-0e1f2a3b4c5d',
    '123e4567-e89b-12d3-a456-426614174001',
    '3c8e7fda-a7b3-4a4a-89fb-4a8b5f8d1c2b'
  );
