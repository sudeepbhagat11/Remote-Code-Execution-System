"use client";
import React from "react";
import Link from "next/link";
import { Problem, ProblemsProps } from "../../types/problem";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const Problems: React.FC<ProblemsProps> = ({ problems }) => {
  return (
    <section className="py-8 md:py-12 min-h-screen">
      <div className="container">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Popular Problems</h2>
          <p className="text-muted">
            Check out the most popular programming problems of DSA
          </p>
        </div>
        <div className="row">
          {problems.map((problem: Problem) => (
            <div className="col-md-6 col-lg-4 mb-4" key={problem.id}>
              <Card
                style={{
                  padding: "40px",
                  border: "1px solid grey",
                  borderRadius: "20px",
                  background: "white",
                }}
              >
                <Card.Header
                  style={{
                    background: "white",
                  }}
                >
                  <Card.Title>{problem.title}</Card.Title>
                  <Card.Text>Easy problem for beginners</Card.Text>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    {/* <div>
                      <p className="text-muted">Difficulty</p>
                      <p>{problem.difficulty}</p>
                    </div> */}
                    <div>
                      <p>Submissions</p>
                      <p>{problem.solved}</p>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer
                  style={{
                    background: "white",
                  }}
                >
                  <Link href={`/problem/${problem.id}`} passHref>
                    <button className="border-balck  w-fit rounded-xl border-2 bg-black px-4 py-2  text-white transition-all hover:border-black hover:bg-black hover:bg-transparent  hover:text-black/90">
                      View Problem
                    </button>
                  </Link>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
