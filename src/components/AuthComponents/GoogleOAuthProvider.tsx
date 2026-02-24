/** @format */

"use client";

import { GoogleOAuthProvider as GoogleProvider } from "@react-oauth/google";
import { ReactNode } from "react";

interface GoogleOAuthProviderProps {
  children: ReactNode;
  clientId: string;
}

const GoogleOAuthProvider = ({
  children,
  clientId,
}: GoogleOAuthProviderProps) => {
  return <GoogleProvider clientId={clientId}>{children}</GoogleProvider>;
};

export default GoogleOAuthProvider;
