"use client";

import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "./FormContainer";
import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (response.ok) {
      router.push("/log-in");
    } else {
      console.error("Registration Failed");
    }
  };

  const toastStyle = {
    color: "white",
    background: "#0f1b21",
    fontFamily: "serif",
  };

  return (
    <div>
      <FormContainer>
        <h1
          className="my-4 text-center"
          style={{ color: "grey", fontFamily: "serif" }}
        >
          Sign Up
        </h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-4">
            <Form.Label
              style={{ color: "grey", fontFamily: "serif" }}
            ></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              style={{
                background: "transparent",
                borderRadius: "20px",
                height: "50px",
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="my-4">
            <Form.Label style={{ color: "grey", fontFamily: "serif" }}>
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="my-4">
            <Form.Label style={{ color: "grey", fontFamily: "serif" }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              style={{
                background: "transparent",
                borderRadius: "20px",
                height: "50px",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label style={{ color: "grey", fontFamily: "serif" }}>
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              style={{
                background: "transparent",
                borderRadius: "20px",
                height: "50px",
              }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="text-center mt-4">
            <Button
              type="submit"
              variant="outline-primary"
              className="mt-4"
              style={{ width: "140px", borderRadius: "20px", padding: "10px" }}
            >
              Sign Up
            </Button>
            <ToastContainer toastStyle={toastStyle} />
          </Form.Group>
        </Form>

        <Row className="py-3 text-center mt-4">
          <Col style={{ color: "grey", fontFamily: "serif" }}>
            Already have an account? <Link href="/log-in">Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default SignUp;
