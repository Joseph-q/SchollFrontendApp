export interface AssistancesStudentResponse {
  studentId: number;
  courses: StudentCourseAssistances[];
}

export interface StudentCourseAssistances {
  id: number;
  name: string;
  assistances: StudentAssistance[];
}

export interface StudentAssistance {
  date: string; // Use ISO 8601 string for time
  entrance: string;
}
