'use client';
import { SessionProvider } from "next-auth/react";

export default function AuthSession({ children, session }) {
  return <SessionProvider basePath='/api/auth' session={session}>{children}</SessionProvider>;
}