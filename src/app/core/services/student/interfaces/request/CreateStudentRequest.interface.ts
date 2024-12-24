import { GenderEnum } from "../../../../../shared/modules/students/constants/GenderEnum";

export interface CreateStudentRequest {
    name: string; // Requerido, longitud mínima 2, máxima 50
    lastname: string; // Requerido, longitud mínima 2, máxima 50
    email?: string | null; // Opcional, debe ser un correo válido
    number?: string | null; // Opcional, debe tener una longitud exacta de 10
    gender?: GenderEnum | null; // Opcional, debe seguir el formato definido en Gender
    birthday?: Date | null;
    coursesId: number[]; // Opcional, IDs de cursos mayores a 0
}
