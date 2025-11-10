
import { makeEndpoint, parametersBuilder } from "@zodios/core";
import { z } from "zod";
import { animeSchema, paginationSchema, animeSearchQueryObjectSchema, imageSetSchema } from "./schema";

const animeListApi = makeEndpoint({
  alias: "getAnimeList",
  method: "get",
  path: `/anime`,
  parameters: parametersBuilder().addQueries(animeSearchQueryObjectSchema).build(),
  response: z.object({
    pagination: paginationSchema,
    data: z.array(animeSchema),
  })
});

const animeTopApi = makeEndpoint({
  alias: "getAnimeTop",
  method: "get",
  path: `/top/anime`,
  parameters: parametersBuilder().addQueries({
    ...animeSearchQueryObjectSchema,
    filter: z.enum(["airing", "upcoming", "favorite", "bypopularity"]).optional(),
  }).build(),
  response: z.object({
    pagination: paginationSchema,
    data: z.array(animeSchema),
  })
});

const animeDetailApi = makeEndpoint({
  alias: "getAnimeDetail",
  method: "get",
  path: `/anime/:id`,
  response: z.object({
    data: animeSchema,
  })
});
const animeGenresApi = makeEndpoint({
  alias: "getAnimeGenres",
  method: "get",
  path: `/genres/anime`,
  response: z.object({
    data: z.array(z.object({
      name: z.string(),
      mal_id: z.number(),
      count: z.number().nullish(),
      url: z.string().nullish(),
    }))
  })
});
const animeProducersApi = makeEndpoint({
  alias: "getAnimeProducers",
  method: "get",
  path: `/producers`,
  parameters: parametersBuilder().addQueries({
    q: z.string().optional(),
    limit: z.coerce.number().int().max(25).nullish(),
  }).build(),
  response: z.object({
    data: z.array(z.object({
      name: z.string().nullish(),
      mal_id: z.number(),
      count: z.number().nullish(),
      titles: z.array(z.object({
        type: z.string(),
        title: z.string(),
      })).nullish(),
      images: imageSetSchema.nullish(),
    }))
  })
});

export const endpoints = {
  animeListApi,
  animeTopApi,
  animeGenresApi,
  animeProducersApi,
  animeDetailApi,
};