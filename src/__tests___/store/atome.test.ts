import { describe, it, expect } from "vitest"
import { useAtom } from "jotai"
import { renderHook } from "@testing-library/react"

describe("Jotai Store", () => {
  it("should use jotai atoms", () => {
    const { result } = renderHook(() => useAtom)
    expect(result.current).toBeDefined()
  })
})
