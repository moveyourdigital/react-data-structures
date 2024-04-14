import { act, renderHook } from "@testing-library/react";
import useMap from "./use-map";

describe('useMap', function () {
  it('set / get', async function () {
    const { result } = renderHook(() => useMap<Object, number>());
    const foo = { foo: 'bar' }

    act(() => {
      result.current.set(foo, 37)
    })

    expect(
      result.current.get(foo)
    ).toEqual(37)
  })

  it('setAll', async function () {
    const { result } = renderHook(() => useMap<Object, number>(Object.entries({ foo: 1 })));
    const foo = { foo: 42 }

    act(() => {
      result.current.setAll(Object.entries(foo))
    })

    expect(
      result.current.get('foo')
    ).toEqual(42)
  })

  it('delete', async function () {
    const { result } = renderHook(() => useMap<Object, number>(Object.entries({ foo: 1 })));

    act(() => {
      result.current.delete('foo')
    })

    expect(
      result.current.get('foo')
    ).toEqual(undefined)
  })

  it('clear', async function () {
    const { result } = renderHook(() => useMap<Object, number>(Object.entries({ foo: 1 })));

    act(() => {
      result.current.clear()
    })

    expect(
      result.current.size
    ).toEqual(0)
  })
})
