import { ToastProvider } from "@/components/Toast/ToastProvider";
import { antdThemeProvider } from "@/utils/store/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import { ConfigProvider } from "antd";
import { ComponentProps, useState, type PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> { }

export function renderWithProviders(
  ui: React.ReactElement,
  renderOptions: ExtendedRenderOptions = {},
  providerOptions?: {
    router?: ComponentProps<typeof MemoryRouter>;
  },
) {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    const [queryClient] = useState(new QueryClient());

    return (
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <ConfigProvider theme={antdThemeProvider}>
            <MemoryRouter {...providerOptions?.router}>
              {children}
            </MemoryRouter>
          </ConfigProvider>
        </ToastProvider>
      </QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export const mockedNavigateFn = vi.fn();
