// types/problem.d.ts

export interface Problem {
  id: string;
  title: string;
  // difficulty: string;
  solved: number;
}

export interface ProblemsProps {
  problems: Problem[];
}
