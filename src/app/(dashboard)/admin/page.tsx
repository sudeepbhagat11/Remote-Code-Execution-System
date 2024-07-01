"use client";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

const page = () => {
  // const session = await getServerSession(authOptions);
  const { data: session } = useSession();
  console.log(session);
  return <div>Welcome {session?.user.username}</div>;
};

export default page;
