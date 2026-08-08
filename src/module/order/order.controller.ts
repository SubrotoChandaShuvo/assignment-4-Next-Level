import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import prisma from "../../lib/prisma";
import { sendResponse } from "../../utils/send-response";
import { createOrderSchema } from "./order.validation";
import { createOrder } from "./order.service";


// export const getGears = catchAsync(async(req: Request, res: Response)=>{})

export const addOrder = catchAsync(async (req:Request, res:Response)=>{
    const input = createOrderSchema.parse(req.body)
    
    const order = await createOrder(req.user!.id, input);

    sendResponse(res,{message: "Order Successful", data:{order}},201)
    // return
})
