import { mockSearchResponse } from "@/app/types/mockData";
import { SearchCriteriaSchema } from "@/app/types/shared";
import type { SearchResponse } from "@/app/types/shared";

export async function POST(req: Request) {
    const body = SearchCriteriaSchema.parse(await req.json());
    const response: SearchResponse = mockSearchResponse;
    return new Response(JSON.stringify(response), { status: 200 });
}
