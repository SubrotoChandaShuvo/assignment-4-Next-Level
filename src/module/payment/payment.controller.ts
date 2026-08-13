import type Stripe from "stripe";
import { AppError } from "../../utils/app-error";
import { catchAsync } from "../../utils/catch-async";
import type { Request, Response } from "express";
import { stripe } from "../../lib/stripe";
import config from "../../config";
import z from "zod";
import { completePayment, createCheckoutSession, getPaymentHistory } from "./payment.service";
import { sendResponse } from "../../utils/send-response";
import prisma from "../../lib/prisma";

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
  const session = event.data.object as {id:string, metadata?:{orderId: string}}
  const orderId = session.metadata?.orderId

  if(orderId){
    if(event.type === "checkout.session.completed"){
        await completePayment(orderId, session.id)
    }else if(event.type ==="checkout.session.expired" || event.type === "checkout.session.async_payment_failed"){
        await prisma.payment.updateMany({
            where:{
                orderId,
                status:"PENDING"
            },
            data:{
                status:"FAILED"
            }
        })
    }
  }

  res.json({received:true})
});

const orderIdParamsSchema = z.object({
  orderId: z.uuid("invalid booking id"),
});

export const checkout = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = orderIdParamsSchema.parse(req.params);

  const result = await createCheckoutSession(req.user!.id, orderId);

  sendResponse(res, { message: "Checkout session created", data: result });
});

export const getPayments = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getPaymentHistory(req.user!.id);

    sendResponse(res, {
      message: "Payment history retrieved successfully",
      data: result,
    });
  }
);