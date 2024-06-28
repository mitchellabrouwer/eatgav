"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { MouseEvent } from "react";
import {
  CostValue,
  DifficultyValue,
  OccasionValue,
} from "../../recipes/categories";
import { DisplayStars } from "./DisplayStars";
import { HeartButton } from "./HeartButton";

interface CardProps {
  id: string;
  title: string;
  occasion?: OccasionValue[] | null;
  cost: CostValue | null;
  difficulty: DifficultyValue | null;
  time: number | null;
  averageRating: number;
  totalVotes: number;
  createdAt: string;
}

const costSymbols: Record<Exclude<CardProps["cost"], null>, string> = {
  really_cheap: "¢",
  cheap: "$",
  ok: "$$",
  expensive: "$$$",
  really_expensive: "$$$$",
};

export const Card: React.FC<CardProps> = ({
  id,
  title,
  occasion,
  cost,
  difficulty,
  time,
  averageRating,
  totalVotes,
  createdAt,
}) => {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    router.push(`./recipes/${id}`);
  };

  return (
    <div className="hover:cursor-pointer" onClick={handleClick}>
      <div className="relative w-full rounded-lg border shadow-lg">
        <div className="relative block h-[400px]">
          <Image
            alt={title}
            src="/sample_ai_image.webp"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8/ggAAnYBq60PPYYAAAAASUVORK5CYII="
            fill
            style={{
              objectFit: "cover",
            }}
            quality={10}
            priority
          />
        </div>

        <div className="absolute top-2 right-2">
          <HeartButton recipeId={id} />
        </div>

        <div className="absolute top-2 left-2">
          <span className="text-2xl font-light">
            {cost && costSymbols[cost]}
          </span>
        </div>

        <div className="spacing-0 h-[135px] py-2 text-center">
          <span className="text-xs uppercase text-gray-500">
            {occasion
              ? occasion.map((o) => o.replace(/_/g, " ")).join(" | ")
              : ""}
          </span>
          <h2>{title}</h2>
          <div className="flex w-full justify-between">
            <span className="flex-[50%] pl-2 text-left text-sm italic md:text-xs">
              {time} min
            </span>
            <DisplayStars rating={averageRating} totalVotes={totalVotes} />
            <span className="flex-[50%] pr-2 text-right text-sm italic text-gray-500 md:text-xs">
              {difficulty}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Created on {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};
