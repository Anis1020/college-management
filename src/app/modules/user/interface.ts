import { Model } from "mongoose";

export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: "student" | "faculty" | "admin";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
};
