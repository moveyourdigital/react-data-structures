import { useCallback, useState } from 'react'

function t(): false {
  throw new Error('Cannot modify immutable Array')
}

/**
 * Creates an immutable array
 * 
 * @param array
 * @returns Proxied array
 */
function createReadOnlyArray<T>(array: T[]) {
  return new Proxy(array, {
    set: t,
    deleteProperty: t,
    defineProperty: t,
    setPrototypeOf: t,
    preventExtensions: t,
  })
}

export type ReadOnlyArray<T> = Omit<Array<T>, 'fill' | 'pop' | 'push' | 'reverse' | 'shift' | 'sort' | 'splice' | 'unshift'>
export type ReadOnlyArrayActions<T> = {
  /**
   * Changes all array elements from start to end index to a static value
   * 
   * @param value value to fill array section with
   * @param start index to start filling the array at. If start is negative, it is treated as length+start where length is the length of the array.
   * @param end index to stop filling the array at. If end is negative, it is treated as length+end.
   */
  fill(value: T, start?: number, end?: number): void
  /**
   * Removes the last element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.
   */
  pop(): Promise<T | undefined>
  /**
   * Appends new elements to the end of an array.
   * 
   * @param items new elements to add to the array.
   */
  push(...items: T[]): void
  /**
   * Reverses the elements in an array in place.
   */
  reverse(): void
  /**
   * Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.
   */
  shift(): Promise<T | undefined>
  /**
   * Sorts an array in place.
   * 
   * @param compareFn function used to determine the order of the elements. It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * 
   * ```js
   * [11,2,22,1].sort((a, b) => a - b)
   * ```
   */
  sort(compareFn?: (a: T, b: T) => number): void
  /**
   * Inserts new elements at the start of an array.
   * 
   * @param items elements to insert at the start of the array.
   */
  unshift(...items: T[]): void
  /**
   * Removes element at specified index.
   * 
   * @param index position of the element to remove
   */
  removeAt(index: number): void
  /**
   * Removes specified element, if in array, and stops at first finding.
   * 
   * @param item T
   */
  remove(item: T): void
  /**
   * Replaces specified element, if in array, and stops at first finding.
   * 
   * @param prev T
   * @param item T
   */
  replace(prev: T, item: T): void
  /**
   * Swap (exchange) elements between two positions
   * 
   * @param a position
   * @param b position
   */
  swap(a: number, b: number): void
  /**
   * Inserts one element in a given position
   * 
   * @param index position
   * @param value T
   */
  insert(index: number, value: T): void
  /**
   * Updates or inserts an item at a given position
   * 
   * @param index position
   * @param value T
   */
  set(index: number, value: T): void
  /**
   * Resets (removes all elements from) the array.
   */
  clear(): void
}

/**
 * ReadOnly Array hook logic, state and methods
 * 
 * @param initialState a normal array (optional)
 */
function useArray<T>(initialState: T[] = []): [ReadOnlyArray<T>, ReadOnlyArrayActions<T>] {
  const [state, setState] = useState<ReadOnlyArray<T>>(
    createReadOnlyArray(initialState)
  )

  const fill = useCallback(function (value: T, start?: number, end?: number) {
    setState((state) => [...state].fill(value, start, end))
  }, [])

  const pop = useCallback(async function () {
    return new Promise<T | undefined>((resolve) => {
      setState((prevState) => {
        if (prevState.length === 0) {
          resolve(undefined)
          return prevState
        }

        const [last, ...state] = prevState.toReversed()
        resolve(last)
        return state.reverse()
      })
    })
  }, [])

  const push = useCallback(function (...items: T[]) {
    setState((state) => [...state, ...items])
  }, [])

  const reverse = useCallback(function () {
    setState((state) => [...state].reverse())
  }, [])

  const shift = useCallback(async function () {
    return new Promise<T | undefined>((resolve) => {
      setState((prevState) => {
        if (prevState.length === 0) {
          resolve(undefined)
          return prevState
        }

        const [first, ...state] = prevState
        resolve(first)
        return state
      })
    })
  }, [])

  const sort = useCallback(function (compareFn?: (a: T, b: T) => number) {
    setState((state) => [...state].sort(compareFn))
  }, [])


  const unshift = useCallback(function (...items: T[]) {
    setState((state) => [...items, ...state])
  }, [state])

  const removeAt = useCallback(
    function (index: number) {
      if (index === undefined) return

      setState((state) => {
        return [...state.slice(0, index), ...(index === -1 ? [] : state.slice(index + 1))]
      })
    },
    [state],
  )

  const remove = useCallback(
    function (item: T) {
      const index = state.findIndex((it) => it === item)

      if (index < 0) return
      removeAt(index)
    },
    [state],
  )

  const replace = useCallback(
    function (prev: T, item: T) {
      const index = state.findIndex((it) => it === prev)

      if (index < 0) return
      set(index, item)
    },
    [state],
  )

  const swap = useCallback(function (a: number, b: number) {
    setState((state) => {
      const v = [...state]
      const t = v[a]
      v[a] = v[b]
      v[b] = t
      return v
    })
  }, [])

  const insert = useCallback(function (index: number, value: T) {
    setState((state) => [
      ...state.slice(0, index),
      value,
      ...state.slice(index),
    ])
  }, [])

  const set = useCallback(function (index: number, value: T) {
    setState((state) => [
      ...state.slice(0, index),
      value,
      ...state.slice(index + 1),
    ])
  }, [])

  const clear = useCallback(function () {
    setState([])
  }, [])

  return [state, {
    removeAt,
    replace,
    reverse,
    unshift,
    insert,
    remove,
    clear,
    shift,
    swap,
    sort,
    fill,
    push,
    pop,
    set,
  }]
}

export default useArray
