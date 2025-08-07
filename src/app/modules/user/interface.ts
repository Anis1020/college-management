import { Model } from "mongoose";
import { USER_ROLE } from "./constant";
import { boolean } from "zod";

export interface TUser {
  id: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: "student" | "faculty" | "admin";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface UserModelType extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isUserPasswordMatch(
    plainTextPass: string,
    hashPass: string
  ): Promise<boolean>;
  isJWTIssuedBeforePassChange(
    passChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
