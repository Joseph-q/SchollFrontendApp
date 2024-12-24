export interface Hit {
    email: string;
    id: number;
    name: string;
    number: string;
}


export interface SearchStudentResponse {
    hits: Hit[];
    estimatedTotalHits: number;
    limit: number;
    processingTimeMs: number;
    query: string;
}
