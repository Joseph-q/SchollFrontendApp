import MetadataPage from "../../../../../shared/interfaces/Metadata.constant";

export interface CoursesResponse {
  courses: CourseFromCoursesResponse[];
  metadata: MetadataPage;
}

export interface CourseFromCoursesResponse {
  id: number; // ID del curso
  name: string; // Nombre del curso
  totalStudents: number; // Total de estudiantes inscritos
}
