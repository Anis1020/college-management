import { model, Schema } from "mongoose";
import { TOfferedCourse } from "./interface";
export const Days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const offeredCourseSchema = new Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SemesterRegistration",
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Semester",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Department",
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
    maxCapacity: {
      type: Number,
      required: true,
      default: 10,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: Days,
      },
    ],
    startTime: {
      type: String,
      required: [true, "Start time is required."],
      validate: {
        validator: (v) => {
          // Regular expression to validate HH:mm time format
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid time format (HH:mm)!`,
      },
    },
    endTime: {
      type: String,
      required: [true, "End time is required."],
      validate: {
        validator: (v) => {
          // Regular expression to validate HH:mm time format
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid time format (HH:mm)!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Use a pre-middleware hook to validate that the start time is before the end time
offeredCourseSchema.pre("validate", function (next) {
  // Convert string times to Date objects for comparison
  const [startHour, startMinute] = this.startTime.split(":").map(Number);
  const [endHour, endMinute] = this.endTime.split(":").map(Number);

  const startDate = new Date();
  startDate.setHours(startHour, startMinute, 0, 0);

  const endDate = new Date();
  endDate.setHours(endHour, endMinute, 0, 0);

  // Check if the start time is not after or equal to the end time
  if (startDate >= endDate) {
    this.invalidate("startTime", "Start time must be before end time.");
  }

  next();
});

export const OfferedCourseModel = model<TOfferedCourse>(
  "OfferedCourse",
  offeredCourseSchema
);
