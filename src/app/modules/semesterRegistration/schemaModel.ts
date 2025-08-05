import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./interface";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: "Semester",
  },
  status: {
    type: String,
    enum: ["UPCOMING", "ONGOING", "ENDED"],
    default: "UPCOMING",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minCredit: {
    type: Number,
    required: true,
  },
  maxCredit: {
    type: Number,
    required: true,
  },
});

export const SemesterRegistration = model<TSemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema
);
