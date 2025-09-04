import type { SearchCriteria, SearchResponse } from "@/app/types/shared";

//exempel på struktur
export async function search(
  criteria: SearchCriteria
): Promise<SearchResponse> {
  const res = await fetch("/api/search", {
    method: "POST",
    body: JSON.stringify(criteria),
    headers: { "Content-Type": "application/json" },
  });
  return (await res.json()) as SearchResponse;
}