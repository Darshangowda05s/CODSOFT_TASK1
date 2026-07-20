import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";
import validate from "../middleware/validate.js";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../validations/student.validation.js";

const router = express.Router();

router.post("/", validate(createStudentSchema), createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", validate(updateStudentSchema), updateStudent);
router.delete("/:id", deleteStudent);

export default router;