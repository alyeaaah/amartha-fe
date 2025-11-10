import { useQuery } from "@tanstack/react-query";
import { petQueryKey } from "./pet-query-key";
import { callApiDirect } from "@/utils/axios";

export function usePetQuery(params: { status?: string }) {
  return useQuery({
    queryKey: [petQueryKey.list(params)],
    queryFn: () => callApiDirect("get", "pet/findByStatus", { params: { status: params.status || "availables" } }),
  });
}