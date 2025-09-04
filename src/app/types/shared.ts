
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
