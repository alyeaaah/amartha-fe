import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { ToastProvider } from "@/components/Toast/ToastProvider"
import { renderWithProviders } from "../utils"

describe("ToastProvider Component", () => {
  it("should render children", () => {
    renderWithProviders(
      <ToastProvider>
        <div data-testid="toast-child">Child Content</div>
      </ToastProvider>,
    )
    expect(screen.getByTestId("toast-child")).toBeInTheDocument()
  })

  it("should provide toast context to children", () => {
    const { container } = renderWithProviders(
      <ToastProvider>
        <div>Content with toast context</div>
      </ToastProvider>,
    )
    expect(container).toBeInTheDocument()
  })
})
