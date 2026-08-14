import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import prisma from "../../lib/prisma";
import { sendResponse } from "../../utils/send-response";
import z from "zod";
import { getGearById } from "./gear.service";
import { createGearSchema, getGearsQuerySchema, updateGearSchema } from "./gear.validation";
import { AppError } from "../../utils/app-error";

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


export const updateGear = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = gearIdParamsSchema.parse(req.params);

    const input = updateGearSchema.parse(req.body);

    const gear = await prisma.gearItem.findUnique({
      where: {
        id,
      },
    });

    if (!gear) {
      throw new AppError(404, "Gear not found");
    }

    // Check ownership
    if (gear.providerId !== req.user!.id) {
      throw new AppError(
        403,
        "You are not allowed to update this gear"
      );
    }

    const updatedGear = await prisma.gearItem.update({
      where: {
        id,
      },
      data: input,
    });

    sendResponse(res, {
      message: "Gear updated successfully",
      data: {
        gear: updatedGear,
      },
    });
  }
);