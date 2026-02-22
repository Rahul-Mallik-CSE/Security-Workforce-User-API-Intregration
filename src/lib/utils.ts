/** @format */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFullImageFullUrl = (
  imagePath: string | null | undefined
): string => {
  if (!imagePath) return "";

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If it starts with /uploads, prepend the backend URL
  if (imagePath.startsWith("/media")) {
    return `${
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.securiverse.com.au"
    }${imagePath}`;
  }

  // Otherwise return as is (for paths like /hero.jpg)
  return imagePath;
};
