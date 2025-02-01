import { useRef } from 'react'

export const useFocusManager = () => {
  const focusRefs = useRef<Map<string, HTMLElement | null>>(new Map())

  const getFocusRefs = () => {
    if (!focusRefs.current) {
      focusRefs.current = new Map()
    }

    return focusRefs.current
  }

  const handleFocus = (
    key: string,
    options: {
      scrollIntoViewOptions?: ScrollIntoViewOptions
    } = {},
  ) => {
    focusRefs.current.forEach((ref, k) => {
      if (key !== k && ref?.tabIndex === -1) {
        ref.removeAttribute('tabindex')
      }
    })

    const ref = focusRefs.current.get(key)

    if (ref) {
      const addedTabIndexManually = ref.tabIndex === -1

      if (addedTabIndexManually) {
        ref.tabIndex = -1
      }

      if (getComputedStyle(ref).outlineStyle === 'none') {
        ref.style.outline = 'none'
      }

      ref.focus({ preventScroll: true })

      if (addedTabIndexManually) {
        ref.removeAttribute('tabindex')
      }

      if (options.scrollIntoViewOptions) {
        ref.scrollIntoView(options.scrollIntoViewOptions)
      }
    }
  }

  return { getFocusRefs, handleFocus }
}
