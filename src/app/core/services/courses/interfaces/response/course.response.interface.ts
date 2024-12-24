export interface CourseResponse{
    id: number,
    name:string
    students:students[] | null;
}

export type CourseWithoutStudents = Omit<CourseResponse, 'students'>;

interface students {
    id: number;
    name: string;
    lastname: string;
    email: string;
    number: string;
}
  