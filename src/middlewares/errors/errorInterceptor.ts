import { NextFunction, Request, Response } from 'express';

import { AppError } from './AppError';

export function errorInterceptor(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  const errorMessage =
    process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : JSON.stringify(err, null, 2);
  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: errorMessage,
  });
}

