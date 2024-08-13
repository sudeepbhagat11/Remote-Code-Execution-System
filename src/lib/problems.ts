import { db } from "./db";

export const getProblems = async (problemId: string) => {
  const problems = await db.problem.findMany({
    where: {
      hidden: false,
    },
  });
  return problems;
};

export const getProblem = async (problemId: string) => {
  const problem = await db.problem.findFirst({
    where: {
      id: problemId,
    },
    // include: {
    //   defaultCode: true,
    // },
  });
  return problem;
};
