import { describe, it, expect, vi } from "vitest"
import { screen } from "@testing-library/react"
import LoginPage from "@/pages/Login"
import { renderWithProviders } from "../utils"

vi.mock("@/assets/images/icons", () => ({
  IconLogo: () => <div data-testid="login-logo">Logo</div>,
}))

vi.mock("@/assets/images/illustrations/illustrations", () => ({
  Illustration: () => <div data-testid="login-illustration">Illustration</div>,
}))

vi.mock("@/utils/axios", () => ({
  callApiDirect: vi.fn(() => Promise.reject(new Error("Mock error"))),
}))

describe("Login Page", () => {
  it("should render login page", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText("Sign In")).toBeInTheDocument()
  })

  it("should display logo", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByTestId("login-logo")).toBeInTheDocument()
  })

  it("should render email input", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument()
  })

  it("should render password input", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument()
  })

  it("should render login button", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument()
  })

  it("should render register button", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument()
  })

  it("should display terms and conditions text", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText(/Terms and Conditions/i)).toBeInTheDocument()
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument()
  })
})
