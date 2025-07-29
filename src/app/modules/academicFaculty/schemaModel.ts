import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./interface";

const academicFaculty = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const academicFacultyModel = model<TAcademicFaculty>(
  "AcademicFaculty",
  academicFaculty
);
