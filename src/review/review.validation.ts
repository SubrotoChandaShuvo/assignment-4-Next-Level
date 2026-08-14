import z from "zod";

export const createReviewSchema = z.object({
  gearId: z.uuid("Invalid gear ID"),

  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),

  comment: z.string().optional(),
});