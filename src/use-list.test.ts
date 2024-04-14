import { act, renderHook } from '@testing-library/react'
import useList from './use-list'

describe('useList', function () {
  it('append', async function () {
    const { result } = renderHook(() => useList([1, 2, 3]));

    act(() => {
      result.current[1].append(4, 5)
    })

    expect(
      result.current[0]
    ).toEqual([1, 2, 3, 4, 5])
  })

  it('prepend', async function () {
    const { result } = renderHook(() => useList([1, 2, 3]));

    act(() => {
      result.current[1].prepend(5, 42)
    })

    expect(
      result.current[0]
    ).toEqual([5, 42, 1, 2, 3])
  })

  it('replaceAt', async function () {
    const { result } = renderHook(() => useList([1, 2, 3]));

    act(() => {
      result.current[1].replaceAt(1, 42)
    })

    expect(
      result.current[0]
    ).toEqual([1, 42, 3])

    act(() => {
      result.current[1].replaceAt(10000, 37)
    })

    expect(
      result.current[0]
    ).toEqual([1, 42, 3, 37])

    act(() => {
      result.current[1].replaceAt(-10000, 103)
    })

    expect(
      result.current[0]
    ).toEqual([103, 1, 42, 3, 37])
  })
})
