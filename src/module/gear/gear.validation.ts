import z from "zod";

export const createGearSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    brand: z.string().min(1, "Brand is required"),
    pricePerDay: z.number("price Per Day is required"),
    stock: z.number("stock is required"),
    categoryId: z.uuid("invalid categoryId")
})