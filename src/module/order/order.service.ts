import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import { getGearById } from "../gear/gear.service";
import type { createOrderInput } from "./order.validation";

export const createOrder = async (
  customerId: string,
  input: createOrderInput,
) => {
  const gear = await getGearById(input.gearId);
  if (!gear.availability) {
    throw new AppError(400, "Gear is not available");
  }

  if (gear.stock < input.quantity) {
    throw new AppError(400, "Not enough stock available");
  }

  if (gear.providerId === customerId) {
    throw new AppError(400, "You can't order your own gear");
  }

  //   const overlapping = await prisma.rentalOrder.findFirst({
  //     where: {
  //       gearId: gear.id,
  //       status: {
  //         not: "CANCELLED",
  //       },
  //       startDate: {
  //         lt: input.startDate,
  //       },
  //       endDate: {
  //         lt: input.endDate,
  //       },
  //     },
  //   });

  const overlapping = await prisma.rentalOrder.findFirst({
    where: {
      gearId: gear.id,
      status: {
        notIn: ["CANCELLED", "RETURNED"],
      },
      startDate: {
        lt: input.endDate,
      },
      endDate: {
        gt: input.startDate,
      },
    },
  });

  if (overlapping) {
    throw new AppError(400, "Gear is already booked");
  }

  return prisma.rentalOrder.create({
    data: {
      gearId: gear.id,
      customerId: customerId,
      quantity: input.quantity,
      startDate: input.startDate,
      endDate: input.endDate,
      totalPrice:
        Math.ceil(
          (input.endDate.getTime() - input.startDate.getTime()) /
            (24 * 60 * 60 * 1000),
        ) * gear.pricePerDay * input.quantity
    },
  });
};
