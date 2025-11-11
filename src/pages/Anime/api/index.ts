
import { Zodios } from "@zodios/core";
import { endpoints } from "./endpoints";
import { ZodiosHooks } from "@zodios/react";
import { createAxiosInstance } from "@/utils/axios";
import { clientEnv } from "@/env";
export { endpoints };


export const AnimeApiClient = new Zodios(
  clientEnv.JIKAN_BASE_URL,
  [
    endpoints.animeListApi,
    endpoints.animeTopApi,
    endpoints.animeDetailApi,
    endpoints.animeGenresApi,
    endpoints.animeProducersApi,
    endpoints.animeRelatedApi,
    endpoints.animeRecommendationsApi,
  ],
  { validate: true, axiosInstance: createAxiosInstance() },
);

export const AnimeApiHooks = new ZodiosHooks("anime", AnimeApiClient);
