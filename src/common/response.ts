import { Response } from "express";

export const SuccessResponse = (res: Response, data: any, message: string) => {
  return res.status(200).json({
    statusCode: 200,
    message,
    data,
  });
};

export const CreatedResponse = (res: Response, data: any, message: string) => {
  return res.status(201).json({
    statusCode: 201,
    message,
    data,
  });
};

export const NoContentResponse = (res: Response) => {
  return res.status(204).end();
};

export const ErrorResponse = (res: Response, error: any) => {
  return res.status(500).json({
    statusCode: 500,
    error: "Something went wrong",
    details: error,
  });
};

export const BadRequestResponse = (res: Response, error: any) => {
  return res.status(400).json({
    statusCode: 400,
    error: "Bad Request",
    details: error,
  });
};

export const UnauthorizedResponse = (res: Response, error: any) => {
  return res.status(401).json({
    statusCode: 401,
    error: "Unauthorized",
    details: error,
  });
};

export const ForbiddenResponse = (res: Response, error: any) => {
  return res.status(403).json({
    statusCode: 403,
    error: "Forbidden",
    details: error,
  });
};

export const NotFoundResponse = (res: Response, error: any) => {
  return res.status(404).json({
    statusCode: 404,
    error: "Not Found",
    details: error,
  });
};

export const ConflictResponse = (res: Response, error: any) => {
  return res.status(409).json({
    statusCode: 409,
    error: "Conflict",
    details: error,
  });
};

export const NotAcceptableResponse = (res: Response, error: any) => {
  return res.status(406).json({
    statusCode: 406,
    error: "Not Acceptable",
    details: error,
  });
};