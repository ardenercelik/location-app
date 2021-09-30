import { Request, Response, NextFunction } from "express";

/**
 * Default 404 handler
 */
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
  });
  console.log(error.stack);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
