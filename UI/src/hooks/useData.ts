import { use, useEffect } from 'react'

export const useData = <T>({
  promise,
  onLoad,
}: {
  promise: Promise<T>
  onLoad?: (data: T) => void
}) => {
  const data = use(promise)

  useEffect(() => {
    onLoad?.(data)
  }, [data])

  return data
}
