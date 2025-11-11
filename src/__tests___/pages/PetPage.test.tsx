import { describe, it, expect, beforeEach, vi } from "vitest"
import { screen } from "@testing-library/react"
import { PetPage } from "@/pages/Admin/Pet"
import { renderWithProviders } from "../utils"

vi.mock("jotai", () => ({
  atom: vi.fn((initialValue) => ({ init: initialValue })),
  useAtom: vi.fn(() => [undefined, vi.fn()]),
  useSetAtom: vi.fn(() => vi.fn()),
  useAtomValue: vi.fn(() => undefined),
  createStore: vi.fn(() => ({})), // ✅ add this
}))


vi.mock("@/pages/Admin/Pet/api", () => ({
  PetApiHooks: {
    useGetPetListByStatus: vi.fn(() => ({
      data: [{ id: 1, name: "Test Pet", status: "available", tags: [], category: null }],
      isLoading: false,
    })),
    useDeletePet: vi.fn(() => ({
      mutateAsync: vi.fn(),
    })),
    getKeyByAlias: vi.fn(),
  },
  usePetQuery: vi.fn(() => ({
    data: [],
  })),
}))

describe("Pet Page", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render the pet page heading", () => {
    renderWithProviders(<PetPage />)
    expect(screen.getByText("Pet List")).toBeInTheDocument()
  })

  it("should render add new pet button", () => {
    renderWithProviders(<PetPage />)
    expect(screen.getByText(/Add New Pet/i)).toBeInTheDocument()
  })

  it("should render status tabs", () => {
    renderWithProviders(<PetPage />)
    expect(screen.getByText("Available")).toBeInTheDocument()
    expect(screen.getByText("Pending")).toBeInTheDocument()
    expect(screen.getByText("Sold")).toBeInTheDocument()
  })
})
