/** @format */

"use client";

import { GoogleOAuthProvider as GoogleProvider } from "@react-oauth/google";
import { ReactNode } from "react";

interface GoogleOAuthProviderProps {
  children: ReactNode;
}

const GoogleOAuthProvider = ({ children }: GoogleOAuthProviderProps) => {
  // You should get this from environment variables
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return <GoogleProvider clientId={clientId}>{children}</GoogleProvider>;
};

export default GoogleOAuthProvider;
