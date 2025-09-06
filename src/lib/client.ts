import type { SearchCriteria, SearchResponse } from "@/app/types/shared";

export async function search(
  criteria: SearchCriteria
): Promise<SearchResponse> {
  const res = await fetch("/api/search", {
    method: "POST",
    body: JSON.stringify(criteria),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return (await res.json()) as SearchResponse;
}
