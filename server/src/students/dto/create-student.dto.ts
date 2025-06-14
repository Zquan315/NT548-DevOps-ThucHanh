export class CreateStudentDto {
  id: string;
  name: string;
  major: string;
  GPA: number;
  subjects: { name: string; score: number }[];
}
