export const petQueryKey = {
  all: ["pet"] as const,
  list: (params: { status?: string }) => [...petQueryKey.all, "list", params.status] as const,
};