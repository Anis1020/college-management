import { model, Schema } from "mongoose";
import { TStudent, UserModelType } from "./interface";

export const Guardian = {
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  relation: { type: String, required: true },
  contactNo: { type: String, required: true },
};
export const LocalGuardian = {
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  relation: { type: String, required: true },
  contactNo: { type: String, required: true },
};
const studentSchema = new Schema<TStudent, UserModelType>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
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
    guardian: Guardian,
    localGuardian: LocalGuardian,
    profileImage: { type: String, optional: true },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
//virtual
studentSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.lastName}`;
});

//skip which is update by isDeleted property
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: "$ne:true" } });
  next();
});
export const StudentModel = model<TStudent, UserModelType>(
  "Student",
  studentSchema
);
