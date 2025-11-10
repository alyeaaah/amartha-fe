import { useMutation } from "@tanstack/react-query";
import { RegisterPayload } from "./schema";
import { callApiDirect } from "@/utils/axios";
interface RegisterResponse {
  message: string; 
}

export interface MutationCallbacks<TData = unknown, TVariables = unknown> {
	onSuccess?: (data: TData, variables: TVariables) => void;
	onError?: (error: Error, variables: TVariables) => void;
	showToast?: boolean;
}

export function useRegisterMutation(
	callbacks?: MutationCallbacks<RegisterResponse, RegisterPayload>
) {
  return useMutation({
    mutationFn: (params: RegisterPayload) => {
      return callApiDirect("post", "user", params);
    },
    onSuccess: (data, variables) => {
      callbacks?.onSuccess?.(data.data as RegisterResponse, variables);
    },
    onError: (error, variables) => {
      callbacks?.onError?.(error as Error, variables);
    },
  });

}
  
