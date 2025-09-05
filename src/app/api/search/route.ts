import { mockSearchResponse } from "@/app/types/mockData";
import { SearchCriteriaSchema } from "@/app/types/shared";
import type { SearchResponse } from "@/app/types/shared";

export async function POST(req: Request) {
    try {
        const body = SearchCriteriaSchema.parse(await req.json());
        const filteredResult = mockSearchResponse.results.filter(recipe => {
            return body.ingredients.every(ing => recipe.ingredients.includes(ing));
        });
        const response: SearchResponse = {
            ...mockSearchResponse,
            results: filteredResult
        }
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("API error:", error);
        return new Response(
            JSON.stringify({ error: "Invalid request or server error" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }
}
