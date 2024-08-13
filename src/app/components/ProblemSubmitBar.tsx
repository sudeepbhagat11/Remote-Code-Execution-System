"use client";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Editor from "@monaco-editor/react";
// import RenderTestcase from "./RenderTestcase"; // Import your RenderTestcase component
import { signIn, useSession } from "next-auth/react";


const LANGUAGE_MAPPING = {
  cpp: { name: "C++", monaco: "cpp" },
  java: { name: "Java", monaco: "java" },
  python: { name: "Python", monaco: "python" },
};

enum SubmitStatus {
  SUBMIT = "SUBMIT",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  FAILED = "FAILED",
}

export interface IProblem {
  id: string;
  title: string;
  description: string;
  slug: string;
  defaultCode: {
    languageId: number;
    code: string;
  }[];
}

const ProblemSubmitBar = ({
  problem,
}: {
  problem: IProblem;
  contestId?: string;
}) => {
  //   const [language, setLanguage] = useState("cpp");
  const [language, setLanguage] = useState(
    Object.keys(LANGUAGE_MAPPING)[0] as string
  );
  const [code, setCode] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string>(SubmitStatus.SUBMIT);
  const [testcases, setTestcases] = useState<any[]>([]);
  const [token, setToken] = useState<string>("");
//   const session = useSession();
  const { data: session } = useSession();


  return (
    <div className="pt-4 rounded-md">
      <Form.Group controlId="language">
        <Form.Label>Language</Form.Label>
        <Form.Control
          as="select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {Object.keys(LANGUAGE_MAPPING).map((lang) => (
            <option key={lang} value={lang}>
              {/* @ts-ignore */}
              {LANGUAGE_MAPPING[lang]?.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <div className="mt-4">
        <Editor
          height="60vh"
          value={code[language]}
          theme="vs-dark"
          onMount={() => {}}
          options={{
            fontSize: 14,
            scrollBeyondLastLine: false,
          }}
          //   @ts-ignore
          language={LANGUAGE_MAPPING[language]?.monaco}
          //   onChange={(value) => {
          //     setCode({ ...code, [language]: value });
          //   }}
          defaultLanguage="javascript"
        />
      </div>

      <div className="d-flex justify-content-end mt-4">
        <Button
          disabled={status === SubmitStatus.PENDING}
          type="submit"
          //   onClick={session?.data?.user ? submit : () => signIn()}
          className="ml-2"
        >
          {session?.data?.user
            ? status === SubmitStatus.PENDING
              ? "Submitting"
              : "Submit"
            : "Login to submit"}
        </Button>
      </div>

      {/* <RenderTestcase testcases={testcases} /> */}
    </div>
  );
};

export default ProblemSubmitBar;
