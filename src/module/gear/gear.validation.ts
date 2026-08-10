import z from "zod";

export const createGearSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    brand: z.string().min(1, "Brand is required"),
    pricePerDay: z.number("price Per Day is required"),
    stock: z.number("stock is required"),
    categoryId: z.uuid("invalid categoryId")
})


export const getGearsQuerySchema = z.object({
  categoryId: z.uuid("invalid categoryId").optional(),

  brand: z.string().optional(),

  minPrice: z.coerce.number().min(0).optional(),

  maxPrice: z.coerce.number().min(0).optional(),
});