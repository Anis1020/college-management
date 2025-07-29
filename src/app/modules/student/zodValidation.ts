import z from "zod";

const createStudentValidation = z.object({
  body: z.object({
    id: z.string(),
    user: z.string(),
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    gender: z.enum(["male", "female", "other"]),
    dateOfBirth: z.string(),
    email: z.string(),
    contactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: z.object({
      name: z.object({
        firstName: z.string(),
        lastName: z.string(),
      }),
      relation: z.string(),
      contactNo: z.string(),
    }),
    localGuardian: z.object({
      name: z.object({
        firstName: z.string(),
        lastName: z.string(),
      }),
      relation: z.string(),
      contactNo: z.string(),
    }),
    profileImage: z.string().optional(),
    academicDepartment: z.string(),
    admissionSemester: z.string(),
    isDeleted: z.boolean(),
  }),
});

export const StudentValidations = {
  createStudentValidation,
};
