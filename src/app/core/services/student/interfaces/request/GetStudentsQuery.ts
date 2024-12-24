interface QueryGetStudents {
  limit: number; // Requerido, cantidad de resultados por página
  page: number; // Requerido, número de la página
  orderBy: string; // Requerido, criterio de ordenamiento
  courseId?: string | null; // Opcional, ID del curso
}
