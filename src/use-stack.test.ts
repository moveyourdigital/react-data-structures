import { act, renderHook } from '@testing-library/react'
import useStack from './use-stack'

describe('useStack', function () {
  it('push', async function () {
    const { result } = renderHook(() => useStack([1, 2, 3]));

    act(() => {
      result.current.push(4)
    })

    expect(
      result.current.size
    ).toEqual(4)
  })

  it('pop', async function () {
    const { result } = renderHook(() => useStack([1, 2, 3]));

    await act(async () => {
      const item = await result.current.pop()

      expect(
        item
      ).toEqual(3)
    })

    expect(
      result.current.size
    ).toEqual(2)
  })

  it('peek', async function () {
    const { result } = renderHook(() => useStack([1, 2, 3]));

    expect(
      result.current.peek()
    ).toEqual(3)
  })
})
