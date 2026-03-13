import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).replace(/ /g, "-"); // Converts "12 Jan 2025" → "12-Jan-2025"
}

export function getBatchDuration(startDate: string, endDate: string): string {
  const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
  const weeks = Math.ceil(days / 7)
  return weeks > 1 ? `${weeks} weeks` : `${days} days`
}

export function generateOrderNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let random = ""

  for (let i = 0; i < 8; i++) {
    random += chars[Math.floor(Math.random() * chars.length)]
  }

  return `MM${random}`
}
