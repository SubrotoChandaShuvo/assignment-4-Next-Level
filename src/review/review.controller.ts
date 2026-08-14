import prisma from "../lib/prisma";
import { AppError } from "../utils/app-error";
import { catchAsync } from "../utils/catch-async";
import { sendResponse } from "../utils/send-response";
import { createReviewSchema } from "./review.validation";
import type { Request, Response } from "express";

export const createReview = catchAsync(
  async (req: Request, res: Response) => {
    const input = createReviewSchema.parse(req.body);

    const customerId = req.user!.id;

    const rental = await prisma.rentalOrder.findFirst({
      where: {
        customerId,
        gearId: input.gearId,
        status: "RETURNED",
      },
    });

    if (!rental) {
      throw new AppError(
        400,
        "You can review the gear only after returning it"
      );
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        customerId,
        gearId: input.gearId,
      },
    });

    if (existingReview) {
      throw new AppError(
        400,
        "You have already reviewed this gear"
      );
    }

    const review = await prisma.review.create({
      data: {
        customerId,
        gearId: input.gearId,
        rating: input.rating,
        comment: input.comment ?? null,
      },
    });

    sendResponse(res, {
      message: "Review created successfully",
      data: {
        review,
      },
    });
  }
);



export const getReviews = catchAsync(
  async (req: Request, res: Response) => {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    sendResponse(res, {
      message: "Reviews retrieved successfully",
      data: {
        reviews,
      },
    });
  }
);