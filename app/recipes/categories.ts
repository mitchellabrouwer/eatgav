export const costOptions = [
  { value: "really_cheap", label: "Really Cheap" },
  { value: "cheap", label: "Cheap" },
  { value: "ok", label: "OK" },
  { value: "expensive", label: "Expensive" },
  { value: "really_expensive", label: "Really Expensive" },
] as const;

export const difficultyOptions = [
  { value: "very_easy", label: "Very Easy" },
  { value: "easy", label: "Easy" },
  { value: "moderate", label: "Moderate" },
  { value: "hard", label: "Hard" },
  { value: "very_hard", label: "Very Hard" },
] as const;

export const occasionOptions = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
  { value: "dessert", label: "Dessert" },
] as const;

export const timeOptions = [
  { value: 5, label: "5 minutes" },
  { value: 10, label: "10 minutes" },
  { value: 15, label: "15 minutes" },
  { value: 20, label: "20 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 45, label: "45 minutes" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1.5 hours" },
  { value: 120, label: "2 hours" },
] as const;

export type CostValue = (typeof costOptions)[number]["value"];
export type DifficultyValue = (typeof difficultyOptions)[number]["value"];
export type OccasionValue = (typeof occasionOptions)[number]["value"];
export type TimeValue = (typeof timeOptions)[number]["value"];
