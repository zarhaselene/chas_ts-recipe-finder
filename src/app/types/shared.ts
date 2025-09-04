import { z } from "zod"; //Runtime Validation

// Request-typ: vad användaren skickar in till api:et
export type SearchCriteria = {
  ingredients: string[];
  preferences: string[];
};

// Enskilt recept
export type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  timeMinutes: number;
};

// Vad api:et svarar med
export type SearchResponse = {
  criteria: SearchCriteria;
  results: Recipe[];
  createdAt: string; //när sökningen skapades
};

// Validerar inkommande request (SearchCriteria)
export const SearchCriteriaSchema = z.object({
  ingredients: z.array(z.string()),
  preferences: z.array(z.string()),
});

// Validerar ett recept object
export const RecipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  ingredients: z.array(z.string()),
  steps: z.array(z.string()),
  timeMinutes: z.number(),
});

// Validerar hela responsen från api:et
export const SearchResponseSchema = z.object({
  criteria: SearchCriteriaSchema,
  results: z.array(RecipeSchema),
  createdAt: z.string(),
});

// Använder z.infer för att undvika duplicera typdefinitioner och säkerställa typ-säkerhet
export type SearchCriteriaZod = z.infer<typeof SearchCriteriaSchema>;

export type RecipeZod = z.infer<typeof RecipeSchema>;

export type SearchResponseZod = z.infer<typeof SearchResponseSchema>;
