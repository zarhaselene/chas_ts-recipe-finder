"use client";

import React, { useState } from "react";
import type { SearchCriteria, SearchResponse } from "@/app/types/shared";
import { SearchResponseSchema } from "@/app/types/shared";
import { search as doSearch } from "@/lib/client";
import Loader from "./shared/Loader";

type UiState = "idle" | "loading" | "ready" | "error";

export default function SearchClient() {
  const [ingredientsText, setIngredientsText] = useState<string>(""),
   [preferencesText, setPreferencesText] = useState<string>(""),
   [uiState, setUiState] = useState<UiState>("idle"),
   [errorMessage, setErrorMessage] = useState<string | null>(null),
   [response, setResponse] = useState<SearchResponse | null>(null);

  const parseRecipeListInput = (input: string): string[] => {
    return input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

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
    <div>
      <form onSubmit={handleSearch} className="flex flex-col gap-3 mb-6">
        <label className="flex flex-col gap-1">
          Ingredients (comma separated)
          <input
            className="border rounded px-3 py-2 mt-1"
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            placeholder="e.g. tomato, pasta, cheese"
          />
        </label>

        <label className="flex flex-col gap-1">
          Preferences / tags (comma separated)
          <input
            className="border rounded px-3 py-2 mt-1"
            value={preferencesText}
            onChange={(e) => setPreferencesText(e.target.value)}
            placeholder="e.g. vegetarian, vegan"
          />
        </label>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={uiState === "loading"}
          >
            {uiState === "loading" ? <Loader /> : "Search"}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded border"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>

      <section>
        {uiState === "idle" && (
          <p className="text-sm text-neutral-600">Fill the form and press Search to find recipes.</p>
        )}


        {uiState === "error" && (
          <div className="p-3 border rounded bg-red-50 text-red-800">
            <strong>Error:</strong> {errorMessage}
            <div className="mt-2">
              <button className="text-sm underline" onClick={() => handleSearch()}>
                Retry
              </button>
            </div>
          </div>
        )}

        {uiState === "ready" && response && (
          <div>
            <div className="mb-4 text-sm text-neutral-600">Found {response.results.length} result(s)</div>
            <ul className="grid gap-3">
              {response.results.map((r) => (
                <li key={r.id} className="p-3 border rounded">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{r.title}</h3>
                    <span className="text-sm text-neutral-500">{r.timeMinutes} min</span>
                  </div>
                  <div className="text-sm text-neutral-600 mt-2">
                    <strong>Ingredients:</strong> {r.ingredients.join(", ")}
                  </div>
                  <details className="mt-2 text-sm">
                    <summary className="cursor-pointer">Steps</summary>
                    <ol className="pl-4 mt-2 list-decimal">
                      {r.steps.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ol>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
