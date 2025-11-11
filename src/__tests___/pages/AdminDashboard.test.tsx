import { describe, it, expect, beforeEach, vi } from "vitest"
import { screen } from "@testing-library/react"
import Main from "@/pages/Admin/DashboardAdministrator"
import { renderWithProviders } from "../utils"

vi.mock("@/pages/Admin/DashboardAdministrator/api", () => ({
  GeneralReportApiHooks: {
    useGetGeneralReport: vi.fn(() => ({
      data: {
        approved: 100,
        available: 50,
        delivered: 75,
        place: 25,
        pending: 10,
      },
      isLoading: false,
      refetch: vi.fn(),
    })),
  },
}))

describe("Admin Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render inventory report heading", () => {
    renderWithProviders(<Main />)

    expect(screen.getByText("Inventory Report")).toBeInTheDocument()
  })

  it("should render reload button", () => {
    renderWithProviders(<Main />)

    expect(screen.getByText(/Reload Data/i)).toBeInTheDocument()
  })

  it("should display report statistics", () => {
    renderWithProviders(<Main />)

    expect(screen.getByText("Approved")).toBeInTheDocument()
    expect(screen.getByText("Available")).toBeInTheDocument()
    expect(screen.getByText("Delivered")).toBeInTheDocument()
    expect(screen.getByText("Place")).toBeInTheDocument()
  })

  it("should display pending orders section", () => {
    renderWithProviders(<Main />)

    expect(screen.getByText("Pending Orders")).toBeInTheDocument()
  })
})
