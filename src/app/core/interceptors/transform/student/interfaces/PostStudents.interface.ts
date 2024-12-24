import { GenderEnum } from "@shared/modules/students/constants/GenderEnum";

export interface PostReqStudent {
    name: string; // Requerido, longitud mínima 2, máxima 50
    lastname: string; // Requerido, longitud mínima 2, máxima 50
    email?: string | null; // Opcional, debe ser un correo válido
    number?: string | null; // Opcional, debe tener una longitud exacta de 10
    gender?: GenderEnum | null; // Opcional, debe seguir el formato definido en Gender
    birthday?: string | null; // Opcional, debe cumplir un formato de fecha
    coursesId?: number[]; // Opcional, IDs de cursos mayores a 0
}


export interface PostResStudent {
    id: number;
    name: string;
    lastname: string;
    email?: string | null;
    number?: string | null;
    gender?: GenderEnum | null;
    birthday?: string | null;
    createdAt: string; // Usar string para representar time.Time
    updatedAt: string; // Usar string para representar time.Time
    courses: Course[];
}

interface Course {
    id: number;
    name: string;
  }