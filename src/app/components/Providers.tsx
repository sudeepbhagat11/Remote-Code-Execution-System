"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode, FC } from "react";

interface ProviderProps {
  children: ReactNode;
}
export const Providers: FC<ProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
