import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { AboutPage } from "@/pages/About"
import { renderWithProviders } from "../utils"

describe("About Page", () => {
  it("should render About Us heading", () => {
    renderWithProviders(<AboutPage />)
    expect(screen.getByRole("heading", { name: /About Us/i })).toBeInTheDocument()
  })

  it("should render mission section", () => {
    renderWithProviders(<AboutPage />)
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument()
  })

  it("should contain introductory text", () => {
    renderWithProviders(<AboutPage />)
    expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument()
  })

  it("should apply custom className", () => {
    const { container } = renderWithProviders(<AboutPage className="custom-about" />)
    expect(container.querySelector(".custom-about")).toBeInTheDocument()
  })

  it("should have mission mission content", () => {
    renderWithProviders(<AboutPage />)
    expect(screen.getByText(/I hope this test will pass/i)).toBeInTheDocument()
  })
})
