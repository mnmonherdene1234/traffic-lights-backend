import Joi, { ObjectSchema } from "joi";
import { ValidationDto } from "./validation.dto";

export class LoginDto extends ValidationDto {
  protected schema: ObjectSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  username?: string;
  password?: string;
}
