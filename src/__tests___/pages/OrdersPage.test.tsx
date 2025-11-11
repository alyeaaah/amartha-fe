import { describe, it, expect, beforeEach, vi } from "vitest"
import { screen } from "@testing-library/react"
import { OrderPage } from "@/pages/Admin/Orders"
import { renderWithProviders } from "../utils"

vi.mock("@/pages/Admin/Orders/api", () => ({
  OrderApiHooks: {
    useGetOrderById: vi.fn(() => ({
      data: undefined,
      isLoading: false,
    })),
    useDeleteOrder: vi.fn(() => ({
      mutateAsync: vi.fn(),
    })),
    getKeyByAlias: vi.fn(),
  },
}))

vi.mock("@/pages/Admin/Pet/api", () => ({
  PetApiHooks: {
    useGetPetById: vi.fn(() => ({
      data: undefined,
    })),
  },
}))

describe("Orders Page", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render the orders page heading", () => {
    renderWithProviders(<OrderPage />)

    expect(screen.getByText("Pet Orders")).toBeInTheDocument()
  })

  it("should render search input for order ID", () => {
    renderWithProviders(<OrderPage />)

    expect(screen.getByPlaceholderText("Enter Order ID")).toBeInTheDocument()
  })

  it("should render search button", () => {
    renderWithProviders(<OrderPage />)

    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument()
  })

  it("should render helper text", () => {
    renderWithProviders(<OrderPage />)

    expect(screen.getByText(/Enter Order ID to get information/i)).toBeInTheDocument()
  })

  it("should have disabled search button initially", () => {
    renderWithProviders(<OrderPage />)

    const searchButton = screen.getByRole("button", { name: /Search/i })
    expect(searchButton).toBeDisabled()
  })
})
