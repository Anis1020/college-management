import z from "zod";

const createDepartmentValidation = z.object({
  body: z.object({
    name: z.string(),
    academicFaculty: z.string(),
  }),
});
const updateDepartmentValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const DepartmentValidations = {
  createDepartmentValidation,
  updateDepartmentValidation,
};
