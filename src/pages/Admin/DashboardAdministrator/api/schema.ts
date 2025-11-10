import { z } from "zod";

export const generalReportSchema = z.object({
  approved: z.number(),
  placed: z.number(),
  pending: z.number(),
  available: z.number(),
  delivered: z.number(),
  place: z.number().nullish(),
});

export type GeneralReport = z.infer<typeof generalReportSchema>;

