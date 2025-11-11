import { describe, it, expect, beforeEach, vi } from "vitest"
import { screen } from "@testing-library/react"
import { AnimeDetailPage } from "@/pages/Anime/Detail"
import { renderWithProviders } from "../utils"
import { BrowserRouter } from "react-router-dom"

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useRouteParams: vi.fn(() => ({ id: "1" })),
  }
})

vi.mock("@/pages/Anime/api", () => ({
  AnimeApiHooks: {
    useGetAnimeDetail: vi.fn(() => ({
      data: {
        title: "Test Anime",
        title_japanese: "テストアニメ",
        synopsis: "Test synopsis",
        score: 8.5,
        rank: 10,
        popularity: 50,
        images: { jpg: { large_image_url: "test.jpg" } },
        genres: [{ name: "Action" }],
        producers: [{ name: "Studio" }],
        themes: [{ name: "School" }],
      },
    })),
    useGetAnimeRelated: vi.fn(() => ({ data: [] })),
    useGetAnimeRecommendations: vi.fn(() => ({ data: [] })),
  },
}))

describe("Anime Detail Page", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render the anime detail page", () => {
    renderWithProviders(
      <AnimeDetailPage />
    )

    // Check for basic anime info rendering
    expect(screen.getByText(/Test Anime/i)).toBeInTheDocument()
  })
})
