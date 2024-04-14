import { act, renderHook } from '@testing-library/react'
import useQueue from './use-queue'

describe('useQueue', function () {
  it('enqueue', async function () {
    const { result } = renderHook(() => useQueue([1, 2, 3]));

    act(() => {
      result.current.enqueue(4)
    })

    expect(
      result.current.size
    ).toEqual(4)
  })

  it('dequeue', async function () {
    const { result } = renderHook(() => useQueue([1, 2, 3]));

    await act(async () => {
      const item = await result.current.dequeue()

      expect(
        item
      ).toEqual(1)
    })

    expect(
      result.current.size
    ).toEqual(2)
  })
  
  it('peek', async function () {
    const { result } = renderHook(() => useQueue([1, 2, 3]));

    expect(
      result.current.peek()
    ).toEqual(1)
  })
})
