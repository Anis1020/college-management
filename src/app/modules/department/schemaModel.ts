import { model, Schema } from "mongoose";
import { TDepartment } from "./interface";
import AppError from "../../errors/AppError";

const departmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

departmentSchema.pre("save", async function (next) {
  const isDepartmentExist = await DepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new AppError(404, "this department already exist");
  }
  next();
});

departmentSchema.pre("findOne", async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await DepartmentModel.findOneAndUpdate(query);
  if (!isDepartmentExist) {
    throw new Error("this department dose not exist");
  }
  next();
});
export const DepartmentModel = model<TDepartment>(
  "Department",
  departmentSchema
);
