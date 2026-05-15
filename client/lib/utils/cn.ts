import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with clsx + tailwind-merge.
 * Resolves Tailwind class conflicts (e.g. 'p-4' and 'p-6' → keeps 'p-6').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
