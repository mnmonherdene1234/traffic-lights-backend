import { User } from "../models/user.model";

interface ILogin {
  username: string;
  password: string;
}

async function login(ilogin: ILogin) {
  const user = User.findOne({
    username: ilogin.username,
    password: ilogin.password,
  });

  return user;
}

export default {
  login,
};
