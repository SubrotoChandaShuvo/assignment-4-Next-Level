import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import prisma from "../../lib/prisma";
import { sendResponse } from "../../utils/send-response";
import z from "zod";
import { getGearById } from "./gear.service";
import { createGearSchema, getGearsQuerySchema } from "./gear.validation";

// export const getGears = catchAsync(async(req: Request, res: Response)=>{})
// export const getGears = catchAsync(async(req: Request, res: Response)=>{
//     const gears = await prisma.gearItem.findMany({
//         where:{
//             availability : true
//         },
//         orderBy:{
//             createdAt: "desc"
//         }
//     })


//     sendResponse(res,{message: "GearItems retrieved successfully", data:{gears}})
// })

export const getGears = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId, brand, minPrice, maxPrice } =
      getGearsQuerySchema.parse(req.query);

    const gears = await prisma.gearItem.findMany({
      where: {
        availability: true,

        ...(categoryId && {
          categoryId,
        }),

        ...(brand && {
          brand: {
            contains: brand,
            mode: "insensitive",
          },
        }),

        ...(minPrice !== undefined || maxPrice !== undefined
          ? {
              pricePerDay: {
                ...(minPrice !== undefined && {
                  gte: minPrice,
                }),

                ...(maxPrice !== undefined && {
                  lte: maxPrice,
                }),
              },
            }
          : {}),
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    sendResponse(res, {
      message: "GearItems retrieved successfully",
      data: { gears },
    });
  }
);


const gearIdParamsSchema = z.object({
    id: z.uuid()
})

export const getGear = catchAsync(async(req: Request, res: Response)=>{
     const {id} = gearIdParamsSchema.parse(req.params)
    //  console.log(id);
     const gear = await getGearById(id)
     sendResponse(res, {message:"Gear retrieved successfully", data:{gear}})
     return
})




export const addGear = catchAsync(async (req:Request, res:Response)=>{
    const input = createGearSchema.parse(req.body)


    const gear = await prisma.gearItem.create({
        data:{
            ...input,
            providerId: req.user!.id
        }
    })

    sendResponse(res,{message: "Gear Created Successfully", data:{gear}})
    return
})
