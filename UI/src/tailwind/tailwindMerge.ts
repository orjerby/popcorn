import clsx, { ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * ⚠️ IMPORTANT: Keep in sync with `text.css`
 * If you add or modify font size values in `text.css`, update this list accordingly
 * to ensure Tailwind class merging remains consistent.
 */

const fontSize = [
  { text: Array.from({ length: 100 }, (_, index) => `${index + 1}`) },
]

export const twMergeConfig = {
  extend: {
    classGroups: {
      'font-size': fontSize,
    },
  },
}

export const twMerge = extendTailwindMerge(twMergeConfig)

/**
 * Merges Tailwind classes with the ability to extend the class groups.
 * @param inputs - Tailwind classes to merge.
 * @returns Merged Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}
