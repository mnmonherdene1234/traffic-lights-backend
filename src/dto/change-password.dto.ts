import Joi, { ObjectSchema } from "joi";
import { ValidationDto } from "./validation.dto";

export class ChangePasswordDto extends ValidationDto {
  protected schema: ObjectSchema<any> = Joi.object({
    current_password: Joi.string().required(),
    new_password: Joi.string().min(8).required(),
  });

  current_password!: string;
  new_password!: string;
}
