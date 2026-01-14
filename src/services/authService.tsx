/** @format */

"use server";

import { cookies } from "next/headers";

// Define a function to save the token in cookies
export const saveTokens = async (
  token: string,
  verified?: boolean
): Promise<void> => {
  (await cookies()).set("token", token);
  if (verified !== undefined) {
    (await cookies()).set("verified", verified.toString());
  }
};

// Define a function to get the current user (token) from cookies
export const getCurrentUser = async (): Promise<string | undefined> => {
  const token = (await cookies()).get("token")?.value;
  return token;
};

// Define a function to get verified status from cookies
export const getVerifiedStatus = async (): Promise<boolean> => {
  const verified = (await cookies()).get("verified")?.value;
  return verified === "true";
};

// Define a function to logout by deleting the token from cookies
export const logout = async (): Promise<void> => {
  (await cookies()).delete("token");
  (await cookies()).delete("verified");
};
