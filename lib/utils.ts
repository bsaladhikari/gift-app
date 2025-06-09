import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { User } from "@supabase/supabase-js"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Removed local User type definition to avoid conflict
// export type User = {
//   id: string;
//   email: string | undefined;
//   role?: 'admin' | 'user';
// };

export function isUserAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}
