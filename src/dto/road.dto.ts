import Joi, { ObjectSchema } from "joi";
import { ValidationDto } from "./validation.dto";

export class RoadDto extends ValidationDto {
  protected schema: ObjectSchema<any> = Joi.object({
    name: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  });
}
