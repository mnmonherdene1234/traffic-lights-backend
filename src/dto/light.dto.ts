import Joi, { ObjectSchema } from "joi";
import { LightType } from "../models/light.model";
import { RoadDto } from "./road.dto";
import { ValidationDto } from "./validation.dto";

export class LightDto extends ValidationDto {
  protected schema: ObjectSchema<any> = Joi.object({
    name: Joi.string().min(1).required(),
    road: Joi.string().required(),
    type: Joi.valid(...Object.values(LightType)),
    x: Joi.number().min(0).required(),
    y: Joi.number().min(0).required(),
  });

  id: string = "";
  name: string = "";
  road: string | RoadDto = "";
  type: LightType = LightType.Three;
  x: number = 0;
  y: number = 0;
  created_at: Date = new Date();
  updated_at: Date = new Date();
}
