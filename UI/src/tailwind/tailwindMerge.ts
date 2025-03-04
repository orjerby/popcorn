import clsx, { ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}
