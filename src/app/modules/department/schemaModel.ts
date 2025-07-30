import { model, Schema } from "mongoose";
import { TDepartment } from "./interface";

const departmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  }
);

export const DepartmentModel = model<TDepartment>(
  "Department",
  departmentSchema
);
