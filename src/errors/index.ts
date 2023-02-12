import { HttpError } from "./http-error";

export const UNAUTHORIZED: HttpError = new HttpError("UNAUTHORIZED", 401);
export const ROAD_NOT_FOUND: HttpError = new HttpError("ROAD_NOT_FOUND", 400);
