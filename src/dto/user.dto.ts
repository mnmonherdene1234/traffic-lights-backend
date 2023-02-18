import Joi, { ObjectSchema } from "joi";
import { ValidationDto } from "./validation.dto";

export class UserDto extends ValidationDto {
  protected schema: ObjectSchema<any> = Joi.object({
    id: Joi.string().optional(),
    username: Joi.string().alphanum().optional(),
    password: Joi.string().optional(),
    phone: Joi.string().alphanum().optional(),
    email: Joi.string().email().optional(),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
  });

  id?: string;
  username?: string;
  password?: string;
  phone?: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}
