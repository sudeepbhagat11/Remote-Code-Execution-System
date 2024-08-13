"use client";

import { useState, useEffect } from "react";

import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "@/app/components/FormContainer";
import Link from "next/link";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signInData = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (signInData?.error) {
      toast({
        title: "Signin error",
        description: "Something Went Wrong",
        variant: "destructive",
      });
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 text-foreground">
      <FormContainer>
        <h1 className="my-4 text-center" style={{ fontFamily: "serif" }}>
          Log In
        </h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="my-4 ">
            <Form.Label style={{ fontFamily: "serif" }}>
              Email Address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              style={{
                background: "transparent",

                borderRadius: "20px",
                height: "50px",
              }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="my-4 ">
            <Form.Label style={{ fontFamily: "serif" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              style={{
                background: "transparent",
                borderRadius: "20px",
                height: "50px",
              }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="text-center  mt-4">
            {/* <Button
              type="submit"
              variant="outline-primary"
              className="mt-4"
              style={{ width: "140px", borderRadius: "20px", padding: "10px" }}
              //   disabled={isLoading}
            >
              
              Sign In
            </Button> */}
            <button className="border-balck  w-fit rounded-xl border-2 bg-black px-4 py-2  text-white transition-all hover:border-black hover:bg-black hover:bg-transparent  hover:text-black/90">
              Sign In
            </button>
          </Form.Group>
        </Form>

        <Row className="py-3 text-center mt-4">
          <Col style={{ fontFamily: "serif" }}>
            Not registered? <Link href="/sign-up">SignUp</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default Login;
