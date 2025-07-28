import { model, Schema } from "mongoose";
import { TStudent } from "./interface";

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
      relation: { type: String, required: true },
      contactNo: { type: String, required: true },
    },
    localGuardian: {
      name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
      relation: { type: String, required: true },
      contactNo: { type: String, required: true },
      address: { type: String, required: true },
    },
    profileImage: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const StudentModel = model<TStudent>("Student", studentSchema);
