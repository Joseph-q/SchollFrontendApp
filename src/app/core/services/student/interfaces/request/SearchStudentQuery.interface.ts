export interface QuerySearchStudent {
  limit: number; // Opcional
  searchValues: SearchValuesStudents;
}

export interface SearchValuesStudents {
  name?: string;
  email?: string;
  number?: string;
}
