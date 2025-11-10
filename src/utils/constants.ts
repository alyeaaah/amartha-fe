import _ from "lodash";

import { AnimeOrderByEnum, AnimeRatingEnum } from "@/pages/Anime/api/schema";

export const sfColor = {
  primary: "#065F46",
  secondary: "#471F81",
};

export const mapCenter = {
  lat: -7.275751,
  lng: 112.744225,
}

export const ratingOptions = [
  { value: AnimeRatingEnum.enum.g, label: "All Ages" },
  { value: AnimeRatingEnum.enum.pg, label: "Children" },
  { value: AnimeRatingEnum.enum.pg13, label: "Teens 13 or older" },
  { value: AnimeRatingEnum.enum.r17, label: "17+ (violence & profanity)" },
  { value: AnimeRatingEnum.enum.r, label: "Mild Nudity" },
  { value: AnimeRatingEnum.enum.rx, label: "Hentai" },
]
export const orderOptions = [
  {
    value:AnimeOrderByEnum.enum.popularity,
    label:"Popularity"
  },
  {
    value:AnimeOrderByEnum.enum.score,
    label:"Score"
  },
  {
    value:AnimeOrderByEnum.enum.members,
    label:"Members"
  },
  {
    value:AnimeOrderByEnum.enum.favorites,
    label:"Favorites"
  },
  {
    value:AnimeOrderByEnum.enum.start_date,
    label:"Start Date"
  },
  {
    value:AnimeOrderByEnum.enum.end_date,
    label:"End Date"
  },
  {
    value:AnimeOrderByEnum.enum.episodes,
    label:"Episodes"
  },
  {
    value:AnimeOrderByEnum.enum.scored_by,
    label:"Scored By"
  },
  {
    value:AnimeOrderByEnum.enum.rank,
    label:"Rank"
  },
  {
    value:AnimeOrderByEnum.enum.title,
    label:"Title"
  },
  {
    value:AnimeOrderByEnum.enum.mal_id,
    label:" ID"
  },
]