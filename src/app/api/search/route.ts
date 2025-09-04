import { mockSearchResponse } from "@/app/types/mockData";
import { SearchCriteriaSchema } from "@/app/types/shared";
import type { SearchResponse } from "@/app/types/shared";

//exempel på struktur
export async function POST(req: Request) {
  const body = await req.json();
  // validera body
  // anropa AI eller dataset
  // returnera typad JSON
}