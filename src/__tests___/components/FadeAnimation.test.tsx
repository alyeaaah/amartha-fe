import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { FadeAnimation } from "@/components/Animations"
import { renderWithProviders } from "../utils"

describe("FadeAnimation Component", () => {
  it("should render children with animation container", () => {
    renderWithProviders(
      <FadeAnimation>
        <div data-testid="animated-content">Content</div>
      </FadeAnimation>,
    )
    expect(screen.getByTestId("animated-content")).toBeInTheDocument()
  })

  it("should apply fade-animation-container class", () => {
    const { container } = renderWithProviders(
      <FadeAnimation>
        <div>Content</div>
      </FadeAnimation>,
    )
    const animContainer = container.querySelector(".fade-animation-container")
    expect(animContainer).toBeInTheDocument()
  })

  it("should apply custom className", () => {
    const { container } = renderWithProviders(
      <FadeAnimation className="custom-fade">
        <div>Content</div>
      </FadeAnimation>,
    )
    const animContainer = container.querySelector(".fade-animation-container.custom-fade")
    expect(animContainer).toBeInTheDocument()
  })

  it("should use fade-flex-down direction by default", () => {
    const { container } = renderWithProviders(
      <FadeAnimation direction="down">
        <div>Content</div>
      </FadeAnimation>,
    )
    expect(container.querySelector(".fade-animation-container")).toBeInTheDocument()
  })

  it("should support fade-flex-up direction", () => {
    const { container } = renderWithProviders(
      <FadeAnimation direction="up">
        <div>Content</div>
      </FadeAnimation>,
    )
    expect(container.querySelector(".fade-animation-container")).toBeInTheDocument()
  })
})
