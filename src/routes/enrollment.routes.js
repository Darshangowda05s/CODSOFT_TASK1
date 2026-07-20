import express from "express";
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
} from "../controllers/enrollment.controller.js";
import validate from "../middleware/validate.js";
import {
  createEnrollmentSchema,
  updateEnrollmentSchema,
} from "../validations/enrollment.validation.js";

const router = express.Router();

router.post("/", validate(createEnrollmentSchema), createEnrollment);
router.get("/", getAllEnrollments);
router.get("/:id", getEnrollmentById);
router.put("/:id", validate(updateEnrollmentSchema), updateEnrollment);
router.delete("/:id", deleteEnrollment);

export default router;