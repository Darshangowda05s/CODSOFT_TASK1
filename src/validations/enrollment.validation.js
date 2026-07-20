import { z } from "zod";

export const createEnrollmentSchema = z.object({
  student: z.string(),
  course: z.string(),
  status: z
    .enum(["Active", "Completed", "Dropped"])
    .optional(),
});

export const updateEnrollmentSchema =
  createEnrollmentSchema.partial();