import { Types } from "mongoose";

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: string;
  designation: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: string;
  localGuardian: string;
  profileImg?: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
};
