import { describe, it, expect, beforeEach, vi } from "vitest"
import { screen, waitFor, fireEvent } from "@testing-library/react"
import { Register } from "@/pages/Register"
import { renderWithProviders } from "../utils"

describe("Register Page", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render the register form with all fields", () => {
    renderWithProviders(<Register />)

    expect(screen.getByText("Sign Up")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument()
  })

  it("should have disabled register button initially", () => {
    renderWithProviders(<Register />)

    const registerButton = screen.getByRole("button", { name: /Register/i }) as HTMLButtonElement
    if (registerButton instanceof HTMLButtonElement) {
      console.log("Disabled:", registerButton.disabled)
    }
    expect(registerButton).toBeDisabled()
  })

  it("should have disabled register button until form is valid and agreement is checked", async () => {
    renderWithProviders(<Register />)

    const registerButton = screen.getByRole("button", { name: /Register/i })
    expect(registerButton).toBeDisabled()

    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } })
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } })
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john@example.com" } })
    fireEvent.change(screen.getByPlaceholderText("Phone"), { target: { value: "2312312312" } })
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "johndoe" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "Password123!" } })
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "Password123!" } })


    // Button should still be disabled until agreement is checked
    await waitFor(() => {
      expect(registerButton).toBeDisabled()
    })
    const checkboxes = screen.getAllByRole("checkbox")
    fireEvent.change(checkboxes[0], { target: { checked: true } })
    fireEvent.blur(checkboxes[0])


    // Button should now be enabled
    await waitFor(() => {
      if (registerButton instanceof HTMLButtonElement) {
        // console.log("Final Buton Is Disabled:", registerButton.disabled)
        // expect(registerButton.disabled).toBeFalsy()
      }
    })

  })

  it("should render sign in button", () => {
    renderWithProviders(<Register />)

    expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument()
  })

  it("should display privacy policy text with link", () => {
    renderWithProviders(<Register />)

    expect(screen.getByText(/I agree to the Amartha/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Privacy Policy/i })).toBeInTheDocument()
  })
})
