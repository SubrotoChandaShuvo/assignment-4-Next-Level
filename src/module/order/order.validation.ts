import z from "zod";

export const createOrderSchema = z.object({
  gearId: z.string().min(1, "gearId is required"),

  quantity: z
    .number()
    .int("quantity must be an integer")
    .positive("quantity must be greater than 0"),

  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
}).refine((input)=> input.endDate>input.startDate, "End date must be after start date")

export type createOrderInput = z.infer<typeof createOrderSchema>