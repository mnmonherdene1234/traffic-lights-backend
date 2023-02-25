export class UserDto {
  id?: string = "";
  username?: string = "";
  password?: string = "";
  phone?: string = "";
  email?: string = "";
  created_at?: Date = new Date();
  updated_at?: Date = new Date();
}
