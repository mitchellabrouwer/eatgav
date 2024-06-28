"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Card } from "../../components/ui/Card";
import { Database } from "../../types/supabase";
import { createClientInBrowser } from "../../utils/supabase/client";
import {
  CostValue,
  DifficultyValue,
  OccasionValue,
  costOptions,
  difficultyOptions,
  occasionOptions,
  timeOptions,
} from "../categories";

type RecipeBase = Database["public"]["Tables"]["recipes"]["Row"];
type RecipeWithoutSearchVector = Omit<RecipeBase, "search_vector">;
type RecipeWithRatings = RecipeWithoutSearchVector & {
  average_rating: number;
  total_votes: number;
};

const Browse: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<RecipeWithRatings[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cost, setCost] = useState<CostValue | undefined>(undefined);
  const [difficulty, setDifficulty] = useState<DifficultyValue | undefined>(
    undefined,
  );
  const [occasion, setOccasion] = useState<OccasionValue | undefined>(
    undefined,
  );
  const [time, setTime] = useState<number | undefined>(undefined);
  const supabase = createClientInBrowser();

  const fetchRecipes = async (cursor: number = 0) => {
    setLoading(true);
    console.log({
      _cursor: cursor,
      _limit: 10,
      _query: query,
      _cost: cost,
      _difficulty: difficulty,
      _occasion: occasion,
      _time_to_plate: time,
    });
    const { data, error } = await supabase.rpc("get_recipes_with_ratings", {
      _cursor: cursor,
      _limit: 10,
      _query: query,
      _cost: cost,
      _difficulty: difficulty,
      _occasion: occasion,
      _time_to_plate: time,
    });

    if (error) {
      console.error("Error fetching recipes: ", error);
      setLoading(false);
      return;
    }
    console.log(data);
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setRecipes(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    setRecipes([]);
    setHasMore(true);
    fetchRecipes(0);
  }, [query, cost, difficulty, occasion, time]);

  const loadMoreRecipes = () => {
    if (hasMore && !loading) {
      fetchRecipes(recipes.length);
    }
  };

  return (
    <div className="mt-16">
      <div className="relative m-auto max-w-2xl p-2">
        <input
          type="search"
          className="block w-full rounded-full border p-4 pl-10 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search recipe name or ingredient..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          options={costOptions}
          placeholder="Select Cost"
          onChange={(selectedOption) =>
            setCost(selectedOption?.value || undefined)
          }
          isClearable
          className="mt-4"
        />
        <Select
          options={difficultyOptions}
          placeholder="Select Difficulty"
          onChange={(selectedOption) =>
            setDifficulty(selectedOption?.value || undefined)
          }
          isClearable
          className="mt-4"
        />
        <Select
          options={occasionOptions}
          placeholder="Select Occasion"
          onChange={(selectedOption) =>
            setOccasion(selectedOption?.value || undefined)
          }
          isClearable
          className="mt-4"
        />
        <Select
          options={timeOptions}
          placeholder="Select Time"
          onChange={(selectedOption) =>
            setTime(selectedOption?.value || undefined)
          }
          isClearable
          className="mt-4"
        />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            occasion={recipe.occasion}
            cost={recipe.cost}
            difficulty={recipe.difficulty}
            time={recipe.time_to_plate}
            averageRating={recipe.average_rating}
            totalVotes={recipe.total_votes}
            createdAt={recipe.created_at} // Add createdAt
          />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && hasMore && (
        <button
          className="mt-4 block mx-auto px-4 py-2 bg-blue-500 text-white rounded"
          onClick={loadMoreRecipes}
        >
          Load More
        </button>
      )}
      {!loading && !hasMore && (
        <p className="mt-4 text-center italic">No more recipes...</p>
      )}
    </div>
  );
};

export default Browse;
