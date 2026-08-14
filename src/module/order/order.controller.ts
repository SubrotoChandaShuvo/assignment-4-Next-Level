import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import prisma from "../../lib/prisma";
import { sendResponse } from "../../utils/send-response";
import { createOrderSchema, orderIdParamsSchema, updateOrderStatusSchema } from "./order.validation";
import { createOrder } from "./order.service";
import { AppError } from "../../utils/app-error";
import z from "zod";


// export const getGears = catchAsync(async(req: Request, res: Response)=>{})

export const addOrder = catchAsync(async (req:Request, res:Response)=>{
    const input = createOrderSchema.parse(req.body)
    
    const order = await createOrder(req.user!.id, input);

    sendResponse(res,{message: "Order Successful", data:{order}},201)
    // return
})


export const getOrders = catchAsync(
  async (req: Request, res: Response) => {
    const orders = await prisma.rentalOrder.findMany({
      where: {
        customerId: req.user!.id,
      },
      include: {
        gear: true,
        payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    sendResponse(res, {
      message: "Rental orders retrieved successfully",
      data: { orders },
    });
  },
);


export const getOrder = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = orderIdParamsSchema.parse(req.params);

    const order = await prisma.rentalOrder.findFirst({
      where: {
        id,
        customerId: req.user!.id,
      },
      include: {
        gear: true,
        payment: true,
      },
    });

    if (!order) {
      throw new AppError(404, "Rental order not found");
    }

    sendResponse(res, {
      message: "Rental order retrieved successfully",
      data: { order },
    });
  },
);


export const getProviderOrders = catchAsync(
  async (req: Request, res: Response) => {
    const orders = await prisma.rentalOrder.findMany({
      where: {
        gear: {
          providerId: req.user!.id,
        },
      },

      include: {
        customer: true,
        gear: true,
        payment: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    sendResponse(res, {
      message: "Provider orders retrieved successfully",
      data: {
        orders,
      },
    });
  }
);



// patch orders
export const updateOrderStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = orderIdParamsSchema.parse(req.params);

    const { status } = updateOrderStatusSchema.parse(req.body);

    // Find order
    const order = await prisma.rentalOrder.findUnique({
      where: {
        id,
      },
      include: {
        gear: true,
      },
    });

    if (!order) {
      throw new AppError(404, "Order not found");
    }

    // Check provider ownership
    if (order.gear.providerId !== req.user!.id) {
      throw new AppError(
        403,
        "You are not allowed to update this order"
      );
    }

    // Update status
    const updatedOrder = await prisma.rentalOrder.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    sendResponse(res, {
      message: "Order status updated successfully",
      data: {
        order: updatedOrder,
      },
    });
  }
);