import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { FooterComponent } from "@/components/Footer"

vi.mock("@/assets/images/icons", () => ({
  IconLogo: () => <div data-testid="icon-logo">Logo</div>,
  IconTiktok: () => <div data-testid="icon-tiktok">TikTok</div>,
  IconXTwitter: () => <div data-testid="icon-twitter">Twitter</div>,
}))
describe("Footer Component", () => {
  it("should render footer component", () => {
    const { container } = render(<FooterComponent />)
    expect(container).toBeTruthy()
  })
})
