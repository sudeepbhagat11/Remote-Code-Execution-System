import { PrismaClient } from "@prisma/client";
import fs from "fs";
const prisma = new PrismaClient();

const MOUNT_PATH = "./src/Problems";
function promisifedReadFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function main(problemSlug: string, problemTitle: string) {
  const problemStatement = await promisifedReadFile(
    `${MOUNT_PATH}/${problemSlug}/Problem.md`
  );
  const problem = await prisma.problem.upsert({
    where: {
      slug: problemSlug,
    },
    create: {
      title: problemSlug,
      slug: problemSlug,
      description: problemStatement,
      hidden: false,
    },
    update: {
      description: problemStatement,
    },
  });
}

main(process.env.PROBLEM_SLUG!, process.env.PROBLEM_TITLE!);
