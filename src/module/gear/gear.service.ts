import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app-error";

export async function getGearById(id: string) {
  const gear = await prisma.gearItem.findUnique({
    where: {
      id,
    },
  });

  if(!gear){
    throw new AppError(404,"Gear not found")
  }

  return gear
}
