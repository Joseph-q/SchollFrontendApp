export interface HistorialAssistanceResponse {
  data: DataHistorial[];
}

export interface DataHistorial {
  courseId: number;
  assistances: AssistanceCount[];
}

export interface AssistanceCount {
  date: string;
  total: number;
}
