import { model, Schema } from "mongoose";
import { TUser, UserModelType } from "./interface";
import bcrypt from "bcryptjs";
import { UserStatus } from "./constant";

const userSchema = new Schema<TUser, UserModelType>(
  {
    id: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, select: 0 },
    needPasswordChange: { type: Boolean, default: true },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["super-admin", "student", "faculty", "admin"],
      required: true,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

//something change before store in database-> password bcrypt
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 12);
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await UserModel.findOne({ id }).select("+password");
};
userSchema.statics.isUserPasswordMatch = async function (
  plainTextPass,
  hashPass
) {
  return await bcrypt.compare(plainTextPass, hashPass);
};
userSchema.statics.isJWTIssuedBeforePassChange = async function (
  passChangedTimestamp,
  jwtIssuedTimestamp
) {
  const passChangedTime = new Date(passChangedTimestamp).getTime() / 1000;
  return passChangedTime > jwtIssuedTimestamp;
};
export const UserModel = model<TUser, UserModelType>("User", userSchema);
