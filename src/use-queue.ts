import { useCallback } from "react"
import useArray from "./use-array"

/**
 * Immutable Queue implementation
 * @param initialState
 * @returns
 */
function useQueue<T>(initialState?: T[]): {
  size: number
  enqueue(...items: T[]): void
  dequeue(): Promise<T | undefined>
  clear(): void
  peek(): T | undefined
} {
  const [list, { shift, push, clear }] = useArray(initialState)

  const peek = useCallback(
    function () {
      return list[0]
    },
    [list],
  )

  return {
    size: list.length,
    enqueue: push,
    dequeue: shift,
    clear,
    peek,
  }
}

export default useQueue
