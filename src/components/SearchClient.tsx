"use client";

import React, { useState } from "react";
import type { SearchCriteria, SearchResponse } from "@/app/types/shared";
import { SearchCriteriaSchema, SearchResponseSchema } from "@/app/types/shared";
import { search as doSearch } from "@/lib/client";
import { Search, ChefHat, RefreshCw, Users, Loader } from "lucide-react";
import ResultCard from "./ResultCard";

type UiState = "idle" | "loading" | "ready" | "error";

export default function SearchClient() {
  const [ingredientsText, setIngredientsText] = useState<string>(""),
   [preferencesText, setPreferencesText] = useState<string>(""),
   [uiState, setUiState] = useState<UiState>("idle"),
   [errorMessage, setErrorMessage] = useState<string | null>(null),
   [response, setResponse] = useState<SearchResponse | null>(null);

  const parseRecipeListInput = (input: string): string[] =>
    input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);


  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrorMessage(null);
    setUiState("loading");

    const criteria: SearchCriteria = {
      ingredients: parseRecipeListInput(ingredientsText),
      preferences: parseRecipeListInput(preferencesText),
    };

    try {
      const res = await doSearch(criteria),
       validated = SearchResponseSchema.parse(res);

      setResponse(validated);
      setUiState("ready");
    } catch (err: unknown) {
      console.error("Search failed:", err);
      const message = err instanceof Error ? err.message : String(err);
      setErrorMessage(message);
      setUiState("error");
    }
  }
  const handleReset = () => {
    setIngredientsText("");
    setPreferencesText("");
    setResponse(null);
    setUiState("idle");
    setErrorMessage(null);
  }


  return (
    <div className="space-y-8">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ChefHat size={16} />
                Ingredients
              </label>
              <input
                className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                placeholder="e.g. tomato, pasta, cheese"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Users size={16} />
                Preferences
              </label>
              <input
                className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
                value={preferencesText}
                onChange={(e) => setPreferencesText(e.target.value)}
                placeholder="e.g. vegetarian, vegan"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              className="cursor-pointer flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 hover:shadow-lg hover:scale-102 transition-all duration-200 flex items-center justify-center gap-2"
              disabled={uiState === "loading"}
            >
              {uiState === "loading" ? (
                <Loader className="animate-spin w-4 h-4" />
              ) : (
                <>
                  <Search size={18} />
                  Search Recipes
                </>
              )}
            </button>
            <button
              type="button"
              className="cursor-pointer px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
              onClick={handleReset}
            >
              <RefreshCw size={18} />
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {uiState === "idle" && (
          <div className="text-center py-12">
            <ChefHat size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg text-gray-500 font-medium">
              Ready to find your perfect recipe?
            </p>
            <p className="text-gray-400 mt-2">
              Enter your ingredients and preferences, then click search to discover amazing recipes.
            </p>
          </div>
        )}

        {uiState === "error" && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-1">Search Failed</h3>
                <p className="text-red-700 text-sm">{errorMessage}</p>
                <button 
                  className="mt-3 text-sm font-medium text-red-600 hover:text-red-800 underline transition-colors"
                  onClick={() => handleSearch()}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {uiState === "ready" && response && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Found {response.results.length} Recipe{response.results.length !== 1 ? 's' : ''}
              </h2>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {response.results.length} result{response.results.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
              {response.results.map((recipe) => (
                <ResultCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}