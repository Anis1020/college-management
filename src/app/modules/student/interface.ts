import { Model, Types } from "mongoose";

export type TName = {
  firstName: string;
  lastName: string;
};
export type TGuardian = {
  name: TName;
  relation: string;
  contactNo: string;
};
export type TLocalGuardian = {
  name: TName;
  relation: string;
  contactNo: string;
};
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TName;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian?: TLocalGuardian;
  profileImage?: string;
  academicDepartment: Types.ObjectId;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
};

export interface UserModelType extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
