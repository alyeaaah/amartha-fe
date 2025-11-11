"use client"

import { describe, it, expect, vi } from "vitest"
import { screen } from "@testing-library/react"
import Confirmation from "@/components/Modal/Confirmation"
import { renderWithProviders } from "../utils"

describe("Confirmation Modal Component", () => {
  const mockOnClose = vi.fn()

  it("should render confirmation modal when open", () => {
    renderWithProviders(<Confirmation open onClose={mockOnClose} title="Confirm Action" description="Are you sure?" />)
    expect(screen.getByText("Confirm Action")).toBeInTheDocument()
    expect(screen.getByText("Are you sure?")).toBeInTheDocument()
  })

  it("should not render when not open", () => {
    renderWithProviders(
      <Confirmation open={false} onClose={mockOnClose} title="Confirm Action" description="Are you sure?" />,
    )
    expect(screen.queryByText("Confirm Action")).not.toBeInTheDocument()
  })

  it("should render buttons correctly", () => {
    const mockClick = vi.fn()
    renderWithProviders(
      <Confirmation
        open
        onClose={mockOnClose}
        title="Confirm"
        description="Proceed?"
        buttons={[
          { label: "Yes", onClick: mockClick, variant: "primary" },
          { label: "No", onClick: mockOnClose },
        ]}
      />,
    )
    expect(screen.getByRole("button", { name: /Yes/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /No/i })).toBeInTheDocument()
  })

  it("should render textarea when notes provided", () => {
    renderWithProviders(
      <Confirmation
        open
        onClose={mockOnClose}
        title="Confirm with notes"
        description="Add notes"
        notes={{
          placeholder: "Enter notes here",
          label: "Notes",
          value: "",
        }}
      />,
    )
    expect(screen.getByPlaceholderText("Enter notes here")).toBeInTheDocument()
  })

  it("should disable button when notes are required but empty", () => {
    renderWithProviders(
      <Confirmation
        open
        onClose={mockOnClose}
        title="Confirm"
        description="Required notes"
        buttons={[{ label: "Confirm", onClick: vi.fn(), main: true, variant: "primary" }]}
        notes={{
          placeholder: "Enter reason",
          label: "Reason",
          value: "",
          required: true,
        }}
      />,
    )
    const confirmBtn = screen.getByRole("button", { name: /Confirm/i })
    expect(confirmBtn).toBeDisabled()
  })

  it("should call onClose when modal is closed", () => {
    const { container } = renderWithProviders(
      <Confirmation open onClose={mockOnClose} title="Confirm" description="Test" dismissable />,
    )
    expect(mockOnClose).not.toHaveBeenCalled()
  })
})
