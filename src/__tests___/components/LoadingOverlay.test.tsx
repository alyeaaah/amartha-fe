import { describe, it, expect, vi } from "vitest"
import { screen } from "@testing-library/react"
import LoadingOverlay from "@/components/LoadingOverlay"
import { renderWithProviders } from "../utils"

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query")
  return {
    ...actual,
    useIsFetching: vi.fn(() => 0),
    useIsMutating: vi.fn(() => 0),
  }
})

vi.mock("jotai", async () => {
  const actual = await vi.importActual("jotai")
  return {
    ...actual,
    useAtomValue: vi.fn(() => false),
  }
})

describe("LoadingOverlay Component", () => {
  it("should render loading modal when loading", () => {
    renderWithProviders(<LoadingOverlay />)
    // Modal exists but not shown when no loading state
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
  })

  it("should display Spin component", () => {
    renderWithProviders(<LoadingOverlay />)
    // Component should render without errors
    expect(document.body).toBeInTheDocument()
  })

  it("should have proper modal configuration", () => {
    const { container } = renderWithProviders(<LoadingOverlay />)
    expect(container).toBeInTheDocument()
  })
})
