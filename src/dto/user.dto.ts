import { UserRole } from "../models/user.model";

export class UserDto {
  id?: string = "";
  username?: string = "";
  password?: string = "";
  role?: UserRole;
  phone?: string = "";
  email?: string = "";
  created_at?: Date = new Date();
  updated_at?: Date = new Date();
}
