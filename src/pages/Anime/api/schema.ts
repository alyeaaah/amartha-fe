import { z } from "zod";

// 🧩 ENUM TYPES — extracted for clarity

// Type (format: "tv", "movie", etc.)
export const AnimeTypeEnum = z.enum(["tv", "movie", "ova", "special", "ona", "music"]);
export type AnimeType = z.infer<typeof AnimeTypeEnum>;

// Status (format: "airing", "complete", "upcoming")
export const AnimeStatusEnum = z.enum(["airing", "complete", "upcoming"]);
export type AnimeStatus = z.infer<typeof AnimeStatusEnum>;

// Rating (format: "g", "pg", etc.)
export const AnimeRatingEnum = z.enum(["g", "pg", "pg13", "r17", "r", "rx"]);
export type AnimeRating = z.infer<typeof AnimeRatingEnum>;

// Order By
export const AnimeOrderByEnum = z.enum([
  "mal_id",
  "title",
  "start_date",
  "end_date",
  "episodes",
  "score",
  "scored_by",
  "rank",
  "popularity",
  "members",
  "favorites",
]);
export type AnimeOrderBy = z.infer<typeof AnimeOrderByEnum>;

// Sort Direction
export const SortDirectionEnum = z.enum(["desc", "asc"]);
export type SortDirection = z.infer<typeof SortDirectionEnum>;

// 🖼️ Images
export const imageSetSchema = z.object({
  image_url: z.string().url().nullish(),
  small_image_url: z.string().url().nullish(),
  large_image_url: z.string().url().nullish(),
});
export type ImageSet = z.infer<typeof imageSetSchema>;

// 🎬 Trailer
export const trailerSchema = z.object({
  youtube_id: z.string().nullish(),
  url: z.string().url().nullish(),
  embed_url: z.string().url().nullish(),
});
export type Trailer = z.infer<typeof trailerSchema>;

// 📆 Aired Information
export const airedSchema = z.object({
  from: z.string().nullish(),
  to: z.string().nullish(),
  string: z.string().nullish(),
});
export type Aired = z.infer<typeof airedSchema>;

// 🏷️ Genre
export const genreSchema = z.object({
  mal_id: z.number(),
  type: z.string(),
  name: z.string(),
  url: z.string().url(),
});
export type Genre = z.infer<typeof genreSchema>;

// 📺 Anime Item
export const animeSchema = z.object({
  mal_id: z.number(),
  url: z.string().url(),
  images: z.object({
    jpg: imageSetSchema,
    webp: imageSetSchema,
  }),
  trailer: trailerSchema,
  title: z.string(),
  title_english: z.string().nullish(),
  title_japanese: z.string().nullish(),
  type: z.string().nullish(),
  source: z.string().nullish(),
  episodes: z.number().nullish(),
  status: z.string().nullish(),
  airing: z.boolean(),
  aired: airedSchema.nullish(),
  duration: z.string().nullish(),
  rating: z.string().nullish(),
  score: z.number().nullish(),
  scored_by: z.number().nullish(),
  rank: z.number().nullish(),
  popularity: z.number().nullish(),
  members: z.number().nullish(),
  favorites: z.number().nullish(),
  synopsis: z.string().nullish(),
  background: z.string().nullish(),
  season: z.string().nullish(),
  year: z.number().nullish(),
  genres: z.array(genreSchema).nullish(),
});
export type Anime = z.infer<typeof animeSchema>;

// 📑 Pagination
export const paginationSchema = z.object({
  last_visible_page: z.number(),
  has_next_page: z.boolean(),
  items: z.object({
    count: z.number(),
    total: z.number(),
    per_page: z.number(),
  }),
});
export type Pagination = z.infer<typeof paginationSchema>;

const dropDownSchema = z.object({
  value: z.string(),
  label: z.string(),
  title: z.string().nullish(),
  subtitle: z.string().nullish(),
})
export type CustomDropdownType = z.infer<typeof dropDownSchema>

export const animeSearchQueryObjectSchema = {
  q: z.string().min(1, "Query is required").optional(),

  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(25).default(25),

  type: AnimeTypeEnum.optional(),

  score: z.coerce.number().min(0).max(10).optional(),
  min_score: z.coerce.number().min(0).max(10).optional(),
  max_score: z.coerce.number().min(0).max(10).optional(),

  status: AnimeStatusEnum.optional(),

  rating: AnimeRatingEnum.optional(),

  sfw: z.coerce.boolean().optional(),

  genres: z
    .string()
    .regex(/^(\d+(,\d+)*)?$/, "Must be comma-separated IDs")
    .nullish(),
  selectedGenres: z.array(dropDownSchema).nullish(),

  producers: z
    .string()
    .regex(/^(\d+(,\d+)*)?$/, "Must be comma-separated IDs")
    .nullish(),
  selectedProducers: z.array(dropDownSchema).nullish(),

  order_by: AnimeOrderByEnum.nullish(),

  sort: SortDirectionEnum.nullish(),

  letter: z.string().max(1).nullish(),
  year: z.coerce.number().min(1900).max(new Date().getFullYear()).nullish(),

  start_date: z.string().optional(),
  end_date: z.string().optional(),
};
export const animeSearchQuerySchema = z.object(animeSearchQueryObjectSchema);
export type AnimeSearchQuery = z.infer<typeof animeSearchQuerySchema>;