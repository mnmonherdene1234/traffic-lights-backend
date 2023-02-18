import { HttpError } from "./http-error";

export const UNAUTHORIZED: HttpError = new HttpError("UNAUTHORIZED", 401);
export const ROAD_NOT_FOUND: HttpError = new HttpError("ROAD_NOT_FOUND", 400);
export const USER_NOT_FOUND: HttpError = new HttpError("USER_NOT_FOUND", 404);
export const PASSWORD_NOT_MATCH: HttpError = new HttpError(
  "PASSWORD_NOT_MATCH",
  400
);
