import prisma from "../../lib/prisma";
import { catchAsync } from "../../utils/catch-async";
import type { Request, Response } from "express";
import { sendResponse } from "../../utils/send-response";

// export const getCars =catchAsync(async(req: Request, res : Response)=>{});
export const getCars =catchAsync(async(req: Request, res : Response)=>{
    const cars = await prisma.car.findMany({
        where: {
            isAvailable: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    sendResponse(res, {
        message: "Cars retrieved successfully",
        data: {cars}
    })
});