import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import LayoutWrapper from "@/components/LayoutWrapper"
import { renderWithProviders } from "../utils"

describe("LayoutWrapper Component", () => {
  it("should render children with default responsive padding", () => {
    renderWithProviders(
      <LayoutWrapper>
        <div data-testid="test-content">Test Content</div>
      </LayoutWrapper>,
    )
    expect(screen.getByTestId("test-content")).toBeInTheDocument()
  })

  it("should apply custom className", () => {
    const { container } = renderWithProviders(
      <LayoutWrapper className="custom-class">
        <div>Content</div>
      </LayoutWrapper>,
    )
    const wrapper = container.querySelector(".custom-class")
    expect(wrapper).toBeInTheDocument()
  })

  it("should render in preview mode without padding", () => {
    const { container } = renderWithProviders(
      <LayoutWrapper isPreview>
        <div>Preview Content</div>
      </LayoutWrapper>,
    )
    const div = container.firstChild
    expect(div).toHaveClass("w-full")
  })

  it("should render with padding in normal mode", () => {
    const { container } = renderWithProviders(
      <LayoutWrapper isPreview={false}>
        <div>Normal Content</div>
      </LayoutWrapper>,
    )
    const div = container.firstChild
    expect(div).toHaveClass("px-4")
    expect(div).toHaveClass("sm:px-8")
  })
})
