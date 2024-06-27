"use client";

import React, { FormEvent, useState } from "react";
import { useAuth } from "../../auth/shared/AuthContext";
import { ProtectedRoute } from "../../auth/shared/ProtectedRoute";
import EditableList from "../../components/ui/EditableList";
import { createClientInBrowser } from "../../utils/supabase/client";

const CreateRecipe: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [stepInput, setStepInput] = useState("");
  const [editIngredientIndex, setEditIngredientIndex] = useState<number | null>(
    null
  );
  const [editStepIndex, setEditStepIndex] = useState<number | null>(null);
  const [editIngredientInput, setEditIngredientInput] = useState("");
  const [editStepInput, setEditStepInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { userSession, loading } = useAuth();
  const supabase = createClientInBrowser();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!userSession) {
      setError("You must be logged in to create a recipe");
      return;
    }

    const { data, error } = await supabase.from("recipes").insert([
      {
        user_id: userSession.user.id,
        title,
        description,
        ingredients: JSON.stringify(ingredients),
        steps: JSON.stringify(steps),
      },
    ]);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Recipe created successfully!");
      setTitle("");
      setDescription("");
      setIngredients([]);
      setSteps([]);
      setIngredientInput("");
      setStepInput("");
    }
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput("");
    }
  };

  const handleAddStep = () => {
    if (stepInput.trim()) {
      setSteps([...steps, stepInput]);
      setStepInput("");
    }
  };

  const handleDeleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleEditIngredient = (index: number) => {
    setEditIngredientIndex(index);
    setEditIngredientInput(ingredients[index]);
  };

  const handleSaveEditIngredient = () => {
    if (editIngredientIndex !== null) {
      const updatedIngredients = [...ingredients];
      updatedIngredients[editIngredientIndex] = editIngredientInput;
      setIngredients(updatedIngredients);
      setEditIngredientIndex(null);
      setEditIngredientInput("");
    }
  };

  const handleCancelEditIngredient = () => {
    setEditIngredientIndex(null);
    setEditIngredientInput("");
  };

  const handleDeleteStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleEditStep = (index: number) => {
    setEditStepIndex(index);
    setEditStepInput(steps[index]);
  };

  const handleSaveEditStep = () => {
    if (editStepIndex !== null) {
      const updatedSteps = [...steps];
      updatedSteps[editStepIndex] = editStepInput;
      setSteps(updatedSteps);
      setEditStepIndex(null);
      setEditStepInput("");
    }
  };

  const handleCancelEditStep = () => {
    setEditStepIndex(null);
    setEditStepInput("");
  };

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto p-4 text-white">
        <h1 className="text-2xl font-bold mb-4">Create Recipe</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-2 mb-4">{success}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Ingredients</label>
            <div className="flex mb-2">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="ml-2 bg-blue-500 text-white p-2 rounded-md"
              >
                Add
              </button>
            </div>
            <EditableList
              items={ingredients}
              editIndex={editIngredientIndex}
              editInput={editIngredientInput}
              setEditInput={setEditIngredientInput}
              handleEdit={handleEditIngredient}
              handleDelete={handleDeleteIngredient}
              handleSaveEdit={handleSaveEditIngredient}
              handleCancelEdit={handleCancelEditIngredient}
              type="ingredients"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Steps</label>
            <div className="flex mb-2">
              <input
                type="text"
                value={stepInput}
                onChange={(e) => setStepInput(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              />
              <button
                type="button"
                onClick={handleAddStep}
                className="ml-2 bg-blue-500 text-white p-2 rounded-md"
              >
                Add
              </button>
            </div>
            <EditableList
              items={steps}
              editIndex={editStepIndex}
              editInput={editStepInput}
              setEditInput={setEditStepInput}
              handleEdit={handleEditStep}
              handleDelete={handleDeleteStep}
              handleSaveEdit={handleSaveEditStep}
              handleCancelEdit={handleCancelEditStep}
              type="steps"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Create Recipe
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default CreateRecipe;