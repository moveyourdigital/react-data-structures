import { act, renderHook } from '@testing-library/react'
import useArray from './use-array'

describe('useArray', function () {
  it('returns correct length', function () {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    expect(
      result.current[0].length
    ).toEqual(3)
  })

  describe('fill', function () {
    it('mutates the whole array', function () {
      const { result } = renderHook(() => useArray([1, 2, 3]));

      act(() => {
        result.current[1].fill(42)
      })

      expect(
        result.current[0]
      ).toEqual([42, 42, 42])
    })

    it('mutates from start to end of array', function () {
      const { result } = renderHook(() => useArray([1, 2, 3, 4, 5]));

      act(() => {
        result.current[1].fill(42, 2)
      })

      expect(
        result.current[0]
      ).toEqual([1, 2, 42, 42, 42])
    })

    it('mutates from start to end', function () {
      const { result } = renderHook(() => useArray([1, 2, 3, 4, 5]));

      act(() => {
        result.current[1].fill(42, 2, 4)
      })

      expect(
        result.current[0]
      ).toEqual([1, 2, 42, 42, 5])
    })
  })

  it('pop removes last element', async function () {
    const { result } = renderHook(() => useArray([1, 2, 3, 4, 5]));

    await act(async () => {
      const removed = await result.current[1].pop()

      expect(
        removed
      ).toBe(5)
    })

    expect(
      result.current[0]
    ).toEqual([1, 2, 3, 4])
  })

  it('push', async function () {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current[1].push(4, 5)
    })

    expect(
      result.current[0]
    ).toEqual([1, 2, 3, 4, 5])
  })

  it('reverse', async function () {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current[1].reverse()
    })

    expect(
      result.current[0]
    ).toEqual([3, 2, 1])
  })

  it('shift', async function () {
    const { result } = renderHook(() => useArray([1, 2, 3, 4, 5]));

    await act(async () => {
      const removed = await result.current[1].shift()

      expect(
        removed
      ).toBe(1)
    })

    expect(
      result.current[0]
    ).toEqual([2, 3, 4, 5])
  })

  it('sort', async function () {
    const { result } = renderHook(() => useArray([3, 42, 1, 37]));

    act(() => {
      result.current[1].sort((a, b) => a - b)
    })

    expect(
      result.current[0]
    ).toEqual([1, 3, 37, 42])
  })

  it('ushift', async function () {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current[1].unshift(5, 42)
    })

    expect(
      result.current[0]
    ).toEqual([5, 42, 1, 2, 3])
  })

  it('removeAt', async function () {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current[1].removeAt(1)
    })

    expect(
      result.current[0]
    ).toEqual([1, 3])

    act(() => {
      result.current[1].removeAt(-1)
    })

    expect(
      result.current[0]
    ).toEqual([1])
  })

  it('remove', async function () {
    class Foo { constructor (public item: string) {} }

    const values = [new Foo('foo'), new Foo('bar')]
    const { result } = renderHook(() => useArray(values));

    act(() => {
      result.current[1].remove(values[1])
    })

    expect(
      result.current[0]
    ).toEqual([values.at(0)])
  })

  it('replace', async function () {
    class Foo { constructor(public item: string) { } }

    const values = [new Foo('foo'), new Foo('bar')]
    const baz = new Foo('baz')
    const { result } = renderHook(() => useArray(values));

    act(() => {
      result.current[1].replace(values[1], baz)
    })

    expect(
      result.current[0]
    ).toEqual([values.at(0), baz])
  })

  it('swap', async function () {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current[1].swap(0, 2)
    })

    expect(
      result.current[0]
    ).toEqual([3, 2, 1])
  })

  it('insert', async function () {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current[1].insert(1, 42)
    })

    expect(
      result.current[0]
    ).toEqual([1, 42, 2, 3])

    act(() => {
      result.current[1].insert(10000, 37)
    })

    expect(
      result.current[0]
    ).toEqual([1, 42, 2, 3, 37])
  })

  it('set', async function () {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current[1].set(1, 42)
    })

    expect(
      result.current[0]
    ).toEqual([1, 42, 3])

    act(() => {
      result.current[1].set(10000, 37)
    })

    expect(
      result.current[0]
    ).toEqual([1, 42, 3, 37])

    act(() => {
      result.current[1].set(-10000, 103)
    })

    expect(
      result.current[0]
    ).toEqual([103, 1, 42, 3, 37])
  })

  it('clear', async function () {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current[1].clear()
    })

    expect(
      result.current[0]
    ).toEqual([])
  })

  it.each([
    'at', 'entries', 'filter', 'find', 'findIndex', 'flat', 'map', 'forEach', 'reduce', 
    'every', 'some', 'slice', 'keys', 'includes', 'join', 'concat', 'indexOf', 'value',
  ])(
    'can invoke readonly method "%s" directly',
    (method) => {
      const { result } = renderHook(() => useArray([1, 2, 3]));

      expect(() => {
        (result.current[0] as any)[method]()
      }).toBeDefined()
    },
  )

  it.each([
    'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'
  ])(
    'cannot invoke method "%s" directly',
    (method) => {
      const { result } = renderHook(() => useArray([1, 2, 3]));

      expect(() => {
        (result.current[0] as any)[method]()
      }).toThrow(`Cannot modify immutable Array`)
    },
  )
})
