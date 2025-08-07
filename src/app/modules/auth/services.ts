import { config } from "../../config";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/schemaModel";
import { TLoginUser } from "./interface";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createToken } from "./utils";
import jwt from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
  //check if the user is exist

  const user = await UserModel.isUserExistsByCustomId(payload.id);

  //   console.log(user);
  if (!user) {
    throw new AppError(400, "this user is not exist");
  }
  //is user already deleted or not
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(404, "this user already deleted");
  }
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "this user is blocked");
  }

  if (
    !(await UserModel.isUserPasswordMatch(payload?.password, user?.password))
  ) {
    throw new AppError(400, "password in incorrect");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  //create access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  );
  //create refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user?.needPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await UserModel.isUserExistsByCustomId(userData.userId);

  //   console.log(user);
  if (!user) {
    throw new AppError(400, "this user is not exist");
  }
  //is user already deleted or not
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(404, "this user already deleted");
  }
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "this user is blocked");
  }

  if (
    !(await UserModel.isUserPasswordMatch(payload?.oldPassword, user?.password))
  ) {
    throw new AppError(400, "password in incorrect");
  }

  const newHshPass = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt)
  );

  await UserModel.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHshPass,
      needPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  );
  return null;
};
const refreshToken = async (token: string) => {
  //check is the token  is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { userId, iat } = decoded;

  const user = await UserModel.isUserExistsByCustomId(userId);

  //   console.log(user);
  if (!user) {
    throw new AppError(400, "this user is not exist");
  }
  //is user already deleted or not
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(404, "this user already deleted");
  }
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "this user is blocked");
  }

  if (
    user.passwordChangeAt &&
    UserModel.isJWTIssuedBeforePassChange(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(404, "invalid password");
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  //create access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  );
  return { accessToken };
};
export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
