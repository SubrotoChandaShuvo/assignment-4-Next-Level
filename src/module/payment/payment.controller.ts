import type Stripe from "stripe";
import { AppError } from "../../utils/app-error";
import { catchAsync } from "../../utils/catch-async";
import type { Request, Response } from "express";
import { stripe } from "../../lib/stripe";
import config from "../../config";
import z from "zod";

export const webhook = catchAsync(async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    throw new AppError(404, "Missing stripe-signature Header");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      config.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    throw new AppError(400, "Invalid webhook signature");
  }
  const session = event.data.object;
  // const bookingId = session.metadata
});

const orderIdParamsSchema = z.object({
  orderId: z.uuid("invalid booking id"),
});

export const checkout = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = orderIdParamsSchema.parse(req.params);
});
