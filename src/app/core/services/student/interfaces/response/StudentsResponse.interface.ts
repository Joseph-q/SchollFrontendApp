import { GenderEnum } from "../../../../../shared/modules/students/constants/GenderEnum";
import MetadataPage from "../../../../../shared/interfaces/Metadata.constant";


export interface StudentsResponse {
  data: StudentFromStudents[];
  metadata: MetadataPage;
}

export interface StudentFromStudents {
  id: number;
  name: string;
  lastname: string;
  email?: string | null;
  number?: string | null;
  gender?: GenderEnum | null;
  birthday?: string | null;
  createdAt: string; // Representación de time.Time
  updatedAt: string; // Representación de time.Time
}
