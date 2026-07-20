import { z } from "zod";

export const createStudentSchema = z.object({
  studentID: z.string().trim().min(2).max(8),
  name: z.string().trim().min(2).max(100),
  email: z.email().trim().toLowerCase(),
  phone: z.string().regex(/^[0-9]{10}$/, {
    message: "Phone number must be 10 digits",
  }),
  department: z.string().trim().min(2).max(100),
  semester: z.number().int().min(1).max(8),
});

export const updateStudentSchema = createStudentSchema.partial();