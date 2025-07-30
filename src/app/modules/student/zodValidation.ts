import z from "zod";

const createStudentValidation = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
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
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateStudentValidation = z.object({
  body: z.object({
    student: z.object({
      id: z.string().optional(),
      user: z.string().optional(),
      name: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      }),
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: z.object({
        name: z.object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
        }),
        relation: z.string().optional(),
        contactNo: z.string().optional(),
      }),
      localGuardian: z.object({
        name: z.object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
        }),
        relation: z.string().optional(),
        contactNo: z.string().optional(),
      }),
      profileImage: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidation,
  updateStudentValidation,
};
