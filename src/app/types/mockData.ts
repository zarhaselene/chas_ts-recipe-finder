// Testdata

import { SearchResponse } from "./shared";

export const mockSearchResponse: SearchResponse = {
  criteria: {
    ingredients: ["tomato", "pasta", "cheese"],
    preferences: ["vegetarian"],
  },
  results: [
    {
      id: "1",
      title: "Tomato Pasta",
      ingredients: ["tomato", "pasta", "olive oil"],
      steps: ["Boil pasta", "Cook sauce", "Mix together"],
      timeMinutes: 20,
      tags: ["vegeratian", "vegan"],
    },
    {
      id: "2",
      title: "Veggie Salad",
      ingredients: ["lettuce", "tomato", "cucumber", "olive oil"],
      steps: ["Wash veggies", "Chop", "Mix", "Serve"],
      timeMinutes: 10,
      tags: ["vegetarian", "vegan"],
    },
    {
      id: "3",
      title: "Cheese Omelette",
      ingredients: ["eggs", "cheese", "butter", "salt"],
      steps: ["Beat eggs", "Melt butter", "Cook omelette", "Add cheese"],
      timeMinutes: 8,
      tags: ["vegetarian"],
    },
    {
      id: "4",
      title: "Pasta Salad",
      ingredients: ["pasta", "tomato", "cucumber", "feta cheese"],
      steps: ["Cook pasta", "Chop vegetables", "Mix with cheese", "Serve cold"],
      timeMinutes: 15,
      tags: ["vegetarian"],
    },
    {
      id: "5",
      title: "Grilled Vegetable Sandwich",
      ingredients: ["bread", "tomato", "zucchini", "bell pepper", "cheese"],
      steps: [
        "Slice vegetables",
        "Grill veggies",
        "Assemble sandwich",
        "Toast sandwich",
      ],
      timeMinutes: 12,
      tags: ["vegetarian"],
    },
  ],
  createdAt: new Date().toISOString(),
};
