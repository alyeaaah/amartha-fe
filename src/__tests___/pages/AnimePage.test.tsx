import { describe, it, expect, beforeEach, vi } from "vitest"
import { screen } from "@testing-library/react"
import { AnimePage } from "@/pages/Anime"
import { renderWithProviders } from "../utils"
import { BrowserRouter } from "react-router-dom"

vi.mock("@/pages/Anime/api", () => ({
  AnimeApiHooks: {
    useGetAnimeList: vi.fn(() => ({
      data: {
        data: [
          {
            mal_id: 1,
            title: "Test Anime",
            rating: "PG-13",
            popularity: 100,
            synopsis: "Test synopsis",
            type: "TV",
            status: "Finished Airing",
            producers: [],
            max_score: 10,
            min_score: 0,
            start_date: "2020-01-01",
            end_date: "2020-12-31",
            images: { jpg: { image_url: "test.jpg" }, webp: { image_url: "test.webp" } },
          },
        ],
        pagination: { items: { total: 1 } },
      },
      isLoading: false,
    })),
    useGetAnimeGenres: vi.fn(() => ({
      data: {
        data: [
          {
            mal_id: 1,
            name: "Test Genre",
            type: "genre",
          },
        ],
        pagination: { items: { total: 1 } },
      },
      isLoading: false,
    })),
    useGetAnimeProducers: vi.fn(() => ({
      data: {
        data: [
          {
            mal_id: 1,
            name: "Test Producer",
            type: "producer",
          },
        ],
        pagination: { items: { total: 1 } },
      },
      isLoading: false,
    })),
  },
}))

describe("Anime Page", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render the anime page header", () => {
    renderWithProviders(
      <AnimePage />
    )
    console.log("title", screen.getByText("Anime Archives"));

    expect(screen.getByText("Anime Archives")).toBeInTheDocument()
  })

  it("should render search input", () => {
    renderWithProviders(
      <AnimePage />
    )

    expect(screen.getByPlaceholderText("Search anime")).toBeInTheDocument()
  })

  it("should render filter button", () => {
    renderWithProviders(
      <AnimePage />
    )

    const filterButton = screen.getByTestId("filter-button")
    expect(filterButton).toBeInTheDocument()
  })

  it("should render sort select dropdowns", () => {
    renderWithProviders(
      <AnimePage />
    )

    expect(screen.getByTestId("sort-by")).toBeInTheDocument()
    expect(screen.getByTestId("sort")).toBeInTheDocument()
  })
})
