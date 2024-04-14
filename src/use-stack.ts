import { useCallback } from "react"
import useArray from "./use-array"

/**
 * Immutable Stack implementation
 * @param initialState
 * @returns
 */
function useStack<T>(initialState: T[] = []): {
  size: number
  clear(): void
  push(...items: T[]): void
  peek(): T | undefined
  pop(): Promise<T | undefined>
} {
  const [list, { pop, push, clear }] = useArray(initialState)

  const peek = useCallback(
    function () {
      return list[list.length - 1]
    },
    [list],
  )

  return {
    size: list.length,
    clear,
    push,
    peek,
    pop,
  }
}

export default useStack
