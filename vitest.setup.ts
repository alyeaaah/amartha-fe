import { expect, afterEach, afterAll, beforeAll, vi } from "vitest"
import { cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"
import { JSDOM } from "jsdom"

import { mockedNavigateFn } from "@/__tests___/utils"
import { server } from "@/__tests___/mocks/server"

// Extend Vitest matchers with testing library matchers


vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockedNavigateFn,
}))

beforeAll(() => {
  const jsdom = new JSDOM("<!doctype html><html><body></body></html>")

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  Object.defineProperty(window, "getComputedStyle", {
    value: jsdom.window.getComputedStyle,
  })

  server.listen({ onUnhandledRequest: "error" })
})

// Cleanup after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  mockedNavigateFn.mockClear()
  server.resetHandlers()
})

afterAll(() => server.close())
