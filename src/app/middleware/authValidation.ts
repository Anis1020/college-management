import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { TUserRole } from "../modules/user/interface";
import { UserModel } from "../modules/user/schemaModel";

const authValidation = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      throw new AppError(404, "you are not authorize user");
    }

    //check is the token  is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

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
      UserModel.isJWTIssuedBeforePassChange(
        user.passwordChangeAt,
        iat as number
      )
    ) {
      throw new AppError(404, "invalid password");
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(401, "you are not unauthorize user");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default authValidation;
