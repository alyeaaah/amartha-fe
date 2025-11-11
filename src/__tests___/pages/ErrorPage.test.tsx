import { describe, it, expect, vi } from "vitest"
import { screen } from "@testing-library/react"
import ErrorPage from "@/pages/ErrorPage"
import { renderWithProviders } from "../utils"

vi.mock("@/assets/images/illustrations/illustrations", () => ({
  ErrorIllustration: () => <div data-testid="error-illustration">Error Illustration</div>,
}))

describe("Error Page", () => {
  it("should render 404 error code", () => {
    renderWithProviders(<ErrorPage />)
    expect(screen.getByText("404")).toBeInTheDocument()
  })

  it("should display error message", () => {
    renderWithProviders(<ErrorPage />)
    expect(screen.getByText(/This page has gone missing/i)).toBeInTheDocument()
  })

  it("should display error illustration", () => {
    renderWithProviders(<ErrorPage />)
    expect(screen.getByTestId("error-illustration")).toBeInTheDocument()
  })

  it("should have back button", () => {
    renderWithProviders(<ErrorPage />)
    expect(screen.getByRole("button", { name: /Back to Previous Page/i })).toBeInTheDocument()
  })

  it("should display helpful text", () => {
    renderWithProviders(<ErrorPage />)
    expect(screen.getByText(/You may have mistyped/i)).toBeInTheDocument()
  })
})
