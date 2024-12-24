import { GenderEnum } from "../../../../../shared/modules/students/constants/GenderEnum";

export interface StudentResponse {
  id: number;
  name: string;
  lastname: string;
  email?: string | null;
  number?: string | null;
  gender?: GenderEnum | null;
  birthday?: string | null;
  createdAt: string; // Usar string para representar time.Time
  updatedAt: string; // Usar string para representar time.Time
  courses: StudentCourse[];
}

export interface StudentCourse {
  id: number;
  name: string;
}



