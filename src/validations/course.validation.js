import { z } from "zod";

export const createCourseSchema = z.object({
  courseCode: z.string().trim().min(5).max(10),
  courseName: z.string().trim().min(2).max(100),
  description: z.string().trim().max(500).optional(),
  instructor: z.string().trim().min(2).max(100),
  credits: z.number().int().min(0).max(5),
});

export const updateCourseSchema = createCourseSchema.partial();