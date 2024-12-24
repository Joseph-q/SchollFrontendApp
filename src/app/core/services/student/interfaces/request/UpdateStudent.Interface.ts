import { GenderEnum } from "../../../../../shared/modules/students/constants/GenderEnum";

export interface UpdateStudentRequest {
  name?: string | null; // Opcional
  lastname?: string | null; // Opcional
  email?: string | null; // Opcional, debe ser un correo válido
  number?: string | null; // Opcional, debe tener una longitud exacta de 10
  gender?: GenderEnum | null; // Opcional
  birthday?: Date | null; // Opcional, debe cumplir un formato de fecha
  coursesId?: number[]; // Opcional, IDs de cursos mayores a 0
}
