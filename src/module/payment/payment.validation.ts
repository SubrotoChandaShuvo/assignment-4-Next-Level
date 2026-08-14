import z from "zod";

export const confirmPaymentSchema = z.object({
  sessionId: z.string().min(1, "sessionId is required"),
});
