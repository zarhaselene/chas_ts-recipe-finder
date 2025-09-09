import { SearchCriteriaSchema, SearchResponseSchema, type SearchResponse } from "@/app/types/shared";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
    try {
        // Validera inkommande request
        const body = SearchCriteriaSchema.parse(await req.json());

        // Skicka prompt till Gemini
        const result = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `Generate exactly 3 recipes in **valid JSON only**, matching this schema:
{
  "criteria": { "ingredients": [], "preferences": [] },
  "results": [
    { "id": "", "title": "", "ingredients": [], "steps": [], "timeMinutes": 0, "tags": [] }
  ],
  "createdAt": ""
}

Do NOT add any extra text or markdown. Use this input as criteria: ${JSON.stringify(body)}`
                        }
                    ]
                }
            ]
        });

        // Hämta texten från AI-svaret
        const candidate = result.candidates?.[0];
        const rawText = candidate?.content?.parts?.[0]?.text;

        if (!rawText) throw new Error("No text from Gemini");

        // Få ut JSON från texten
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No valid JSON from Gemini");
        const parsed = JSON.parse(jsonMatch[0]);

        // Validera mot typer
        const validated: SearchResponse = SearchResponseSchema.parse(parsed);

        // Returnera JSON
        return new Response(JSON.stringify(validated), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("API error:", error);
        return new Response(JSON.stringify({ error: "Invalid request or server error" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
}
