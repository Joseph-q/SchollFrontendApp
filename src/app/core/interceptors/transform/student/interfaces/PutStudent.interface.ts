import { GenderEnum } from "@shared/modules/students/constants/GenderEnum";

export default interface PutReqStudent {
    name?: string | null; // Opcional
    lastname?: string | null; // Opcional
    email?: string | null; // Opcional, debe ser un correo válido
    number?: string | null; // Opcional, debe tener una longitud exacta de 10
    gender?: GenderEnum | null; // Opcional
    birthday?: string | null; // Opcional, debe cumplir un formato de fecha yyyy/MM/dd
    coursesId?: number[]; // Opcional, IDs de cursos mayores a 0
}