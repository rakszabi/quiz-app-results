export interface Question {
  id?: string;
  question: string;
  answers: string[];
  order?: number;
  correctAnswer?: string;
}
