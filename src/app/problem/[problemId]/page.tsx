import { ProblemStatement } from "../../components/ProblemStatement";
import ProblemSubmitBar from "@/app/components/ProblemSubmitBar";

import { getProblem } from "../../../lib/problems";

export default async function ProblemPage({
  params: { problemId },
}: {
  params: {
    problemId: string;
  };
}) {
  const problem = await getProblem(problemId);
  if (!problem) {
    return <div>Problem not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      <main className="flex-1 py-8 md:py-12 grid md:grid-cols-2 gap-8 md:gap-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray dark:bg-gray-900 rounded-lg shadow-lg p-6 md:p-8">
          <div className="prose prose-stone dark:prose-invert max-w-none">
            <ProblemStatement description={problem.description} />
          </div>
        </div>
        <ProblemSubmitBar problem={problem} />
      </main>
    </div>
  );
}
export const dynamic = "force-dynamic";
