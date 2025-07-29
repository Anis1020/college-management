import { model, Schema } from "mongoose";
import { TSemester } from "./interface";
import { SemesterCodes, SemesterMonths, SemesterNames } from "./constant";

const semesterSchema = new Schema<TSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: SemesterNames,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: SemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: SemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: SemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

semesterSchema.pre("save", async function (next) {
  const isSemesterExist = await SemesterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExist) {
    throw new Error("Semester is already exist");
  }
  next();
});

export const SemesterModel = model<TSemester>("Semester", semesterSchema);
