import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import validate from "../middleware/validate.js";
import {
  createCourseSchema,
  updateCourseSchema,
} from "../validations/course.validation.js";

const router = express.Router();

router.post("/", validate(createCourseSchema), createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", validate(updateCourseSchema), updateCourse);
router.delete("/:id", deleteCourse);

export default router;