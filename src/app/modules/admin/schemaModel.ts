import { model, Schema } from "mongoose";
import { TAdmin } from "./interface";
const NameSchema = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
};

const Guardians = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
};
const adminSchema = new Schema<TAdmin>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: NameSchema,
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: Guardians,
    localGuardian: Guardians,
    profileImg: {
      type: String,
    },
    managementDepartment: {
      type: String,
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const AdminModel = model<TAdmin>("Admin", adminSchema);
