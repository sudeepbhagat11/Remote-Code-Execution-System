import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProblemStatement({ description }: { description: string }) {
  return (
    <div className="prose lg:prose-xl dark:prose-gray dark:prose-h1:text-gray-200 dark:prose-h3:text-gray-200">
      <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
    </div>
  );
}
