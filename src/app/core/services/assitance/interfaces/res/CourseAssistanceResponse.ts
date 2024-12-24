export interface CourseAssistanceResponse {
  data: Data ;
  metadata: Metadata;
}

export interface StudentFromCourseAssit {
  id: number;
  name: string;
  lastname: string;
  email: string;
  number: string;
  entrance: number;
}

interface Data {
  date: Date | null;
  students: StudentFromCourseAssit[] | null;
}

interface Metadata {
  page: number | null;
  pageSize: number | null;
  pageCount: number;
  total: number;
}
