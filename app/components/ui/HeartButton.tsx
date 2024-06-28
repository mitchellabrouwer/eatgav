"use client";

import React, { useState } from "react";

interface HeartButtonProps {
  recipeId: string;
}

export const HeartButton: React.FC<HeartButtonProps> = ({ recipeId }) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const toggleFavorite = async () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <button
      onClick={toggleFavorite}
      aria-label="Favorite"
      className="focus:outline-none"
    >
      {isFavorited ? "❤️" : "🤍"}
    </button>
  );
};
