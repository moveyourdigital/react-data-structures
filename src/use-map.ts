import { useCallback, useState } from 'react'

export type MapOrEntries<K, V> = Map<K, V> | [K, V][]

export type UseMapActions<K, V> = Pick<Map<K, V>, 'entries' | 'forEach' | 'get' | 'has' | 'keys' | 'size' | 'values'> & {
  /**
   * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
   * @param key 
   * @param value 
   */
  set(key: K, value: V): void
  /**
   * Replaces the entire Map with new entries
   * @param entries 
   */
  setAll(entries: MapOrEntries<K, V>): void
  /**
   * Deletes an element from the map
   * @param key 
   * @returns — true if an element in the Map existed and has been removed, or false if the element does not exist.
   */
  delete(key: K): void
  /**
   * Removes all Map elements
   */
  clear(): void
}

new Map().delete

function useMap<K, V>(
  initialState: MapOrEntries<K, V> = new Map(),
): UseMapActions<K, V> {
  new Map()
  const [map, setMap] = useState<Map<K, V>>(new Map<K, V>(
    initialState
  ))

  const set = useCallback((key: K, value: V) => {
    setMap((prev) => {
      const copy = new Map(prev)
      copy.set(key, value)
      return copy
    })
  }, [])

  const setAll = useCallback((entries: MapOrEntries<K, V>) => {
    setMap(() => new Map(entries))
  }, [])

  const _delete = useCallback((key: K) => {
    setMap((prev) => {
      const copy = new Map(prev)
      copy.delete(key)
      return copy
    })
  }, [])

  const clear = useCallback(() => {
    setMap(() => new Map<K, V>())
  }, [])

  return {
    size: map.size,
    get: map.get.bind(map),
    has: map.has.bind(map),
    set,
    setAll,
    keys: map.keys.bind(map),
    values: map.values.bind(map),
    entries: map.entries.bind(map),
    forEach: map.forEach.bind(map),
    delete: _delete,
    clear,
  }
}

export default useMap
