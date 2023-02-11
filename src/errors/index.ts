import { HttpError } from "./http-error";

export const UNAUTHORIZED: HttpError = new HttpError("UNAUTHORIZED", 401);
