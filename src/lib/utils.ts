import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const blogHeadingId = (key?: string) =>
  key ? `blog-heading-${key}` : undefined;
