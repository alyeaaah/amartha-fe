
import { makeEndpoint, parametersBuilder } from "@zodios/core";
import { z } from "zod";
import { animeSchema, paginationSchema, animeSearchQueryObjectSchema, imageSetSchema, animeDetailSchema, genreSchema, imagesSchema } from "./schema";

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
    data: animeDetailSchema,
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

const animeRelatedApi = makeEndpoint({
  alias: "getAnimeRelated",
  method: "get",
  path: `/anime/:id/relations`,
  response: z.object({
    data: z.array(z.object({
      relation:z.string(),
      entry: z.array(genreSchema.extend({
        type: z.string().nullish(),
        images: imagesSchema.nullish(),
        url: z.string().url().nullish(),
      })),
    }))
  })
});

const animeRecommendationsApi = makeEndpoint({
  alias: "getAnimeRecommendations",
  method: "get",
  path: `/anime/:id/recommendations`,
  response: z.object({
    data: z.array(  z.object({
      entry: genreSchema.extend({
        type: z.string().nullish(),
        title: z.string(),
        name:z.string().nullish(),
        images: imagesSchema.nullish(),
        url: z.string().url().nullish(),
      }),
    }))
  })
});

export const endpoints = {
  animeListApi,
  animeTopApi,
  animeGenresApi,
  animeProducersApi,
  animeDetailApi,
  animeRelatedApi,
  animeRecommendationsApi,
};