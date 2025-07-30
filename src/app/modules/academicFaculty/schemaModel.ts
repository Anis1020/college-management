import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./interface";

const academicFaculty = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicFacultyModel = model<TAcademicFaculty>(
  "AcademicFaculty",
  academicFaculty
);
