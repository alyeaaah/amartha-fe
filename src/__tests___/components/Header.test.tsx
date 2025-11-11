import { describe, it, expect, vi, test } from "vitest"


import {
  fireEvent,
  getByText,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"
import { PublicHeader } from "@/components/Header"
import { renderWithProviders } from "../utils";

vi.mock("@/assets/images/icons", () => ({
  IconLogo: () => <div data-testid="icon-logo">Logo</div>,
}))

describe("Header Component", () => {
  test("should render header component", () => {
    renderWithProviders(
      <PublicHeader />
    )
    expect(screen.getByText("Home")).toBeInTheDocument()
  })
})
