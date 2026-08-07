import type { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";


export const getUsers = catchAsync(async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return res.status(200).json({ users });
});