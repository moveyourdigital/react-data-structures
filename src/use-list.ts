import { useCallback } from 'react'
import useArray, { ReadOnlyArray, ReadOnlyArrayActions } from './use-array'

function useList<T>(items?: T[]): [
  ReadOnlyArray<T>,
  Pick<ReadOnlyArrayActions<T>, 'remove' | 'removeAt' | 'replace' | 'swap' | 'clear'> & {
    prepend(...items: T[]): void
    append(...items: T[]): void
    replaceAt(index: number, item: T): void
  }
] {
  const [list, { unshift, push, remove, replace, removeAt, set, clear, swap }] = useArray(items)

  const prepend = useCallback(function (...items: T[]) {
    unshift(...items)
  }, [])

  const append = useCallback(function (...items: T[]) {
    push(...items)
  }, [])

  const replaceAt = useCallback(function (index: number, item: T) {
    set(index, item)
  }, [])

  return [list, {
    prepend,
    append,
    removeAt,
    remove,
    replaceAt,
    replace,
    swap,
    clear,
  }]
}

export default useList
