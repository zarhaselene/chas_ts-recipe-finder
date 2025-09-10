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
      tags: ["vegetarian", "vegan"],
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

    {
      id: "6",
      title: "Avocado Toast",
      ingredients: ["bread", "avocado", "salt", "pepper", "chili flakes"],
      steps: [
        "Toast bread",
        "Mash avocado with salt and pepper",
        "Spread on toast",
        "Sprinkle chili flakes",
      ],
      timeMinutes: 5,
      tags: ["vegetarian", "vegan"],
    },
    {
      id: "7",
      title: "Garlic Butter Pasta",
      ingredients: ["spaghetti", "butter", "garlic", "parsley", "salt"],
      steps: [
        "Cook pasta",
        "Melt butter",
        "Fry garlic",
        "Mix pasta with garlic butter and parsley",
      ],
      timeMinutes: 15,
      tags: ["vegetarian"],
    },
    {
      id: "8",
      title: "Egg Fried Rice",
      ingredients: ["rice", "eggs", "soy sauce", "spring onion", "oil"],
      steps: [
        "Cook rice",
        "Scramble eggs",
        "Add rice and soy sauce",
        "Stir well and top with spring onion",
      ],
      timeMinutes: 12,
      tags: ["vegetarian"],
    },
    {
      id: "9",
      title: "Banana Pancakes",
      ingredients: ["banana", "eggs", "oil or butter"],
      steps: ["Mash banana", "Mix with eggs", "Fry small pancakes"],
      timeMinutes: 10,
      tags: ["vegetarian", "gluten-free"],
    },
    {
      id: "10",
      title: "Caprese Salad",
      ingredients: ["tomatoes", "mozzarella", "basil", "olive oil", "salt"],
      steps: [
        "Slice tomatoes and mozzarella",
        "Layer with basil",
        "Drizzle with olive oil",
        "Sprinkle salt",
      ],
      timeMinutes: 7,
      tags: ["vegetarian", "gluten-free"],
    },
  ],
  createdAt: new Date().toISOString(),
};
