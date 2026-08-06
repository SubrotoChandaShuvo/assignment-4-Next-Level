import type { Response, Request, NextFunction } from "express";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `Not Found`,
    errorDetails: {
      path: req.originalUrl,
      method: req.method,
      statusCode: 404,
      timestamp: new Date().toISOString(),
    },
  });
};
