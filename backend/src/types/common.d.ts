import type { Request, Express } from "express";

export type SuccessResponse<T> = {
  result: T;
  success: true;
};

export type ErrorResponse = {
  message: string;
  success: false;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export type RequestWithQuery<Q = {}> = Request<{}, any, any, Q>;
export type RequestWithParams<P = {}> = Request<P, any, any, {}>;
export type RequestWithBody<B = {}> = Request<{}, any, B, {}>;
export type RequestWithParamsAndBody<P = {}, B = {}> = Request<P, any, B, {}>;
export type RequestWithBodyAndFile<B = {}> = Request<{}, any, B, {}> & {
  file?: Express.Multer.File;
};
export type RequestWithParamsBodyAndFile<P = {}, B = {} > = Request<
  P,
  any,
  B,
  {}
> & {
  file?: Express.Multer.File;
};