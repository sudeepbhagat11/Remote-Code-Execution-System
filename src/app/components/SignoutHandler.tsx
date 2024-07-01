"use client";
import React from "react";
import { signOut } from "next-auth/react";

export const SignoutHandler = () => {
  return (
    <button
      className="w-full  max-w-[200px]  rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/log-in`,
        })
      }
    >
      Signout
    </button>
  );
};
