import { mockSearchResponse } from "@/app/types/mockData";
import type { SearchCriteria, SearchResponse, SearchResponseSchema } from "@/app/types/shared";
import { z } from "zod";

//exempel på struktur
export async function POST(req: Request) {
  const body = await req.json();
  // validera body
  // anropa AI eller dataset
  // returnera typad JSON
}