"use client";

import React from "react";

interface DisplayStarsProps {
  rating: number;
  totalVotes: number;
}

export const DisplayStars: React.FC<DisplayStarsProps> = ({
  rating,
  totalVotes,
}) => {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < Math.round(rating) ? "★" : "☆",
  );

  return (
    <div className="flex items-center">
      {stars.map((star, index) => (
        <span key={index} className="text-yellow-500">
          {star}
        </span>
      ))}
      <span className="ml-2 text-xs text-gray-500">({totalVotes})</span>
    </div>
  );
};
