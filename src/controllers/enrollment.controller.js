import Enrollment from "../models/enrollment.model.js";
import Student from "../models/student.model.js";
import Course from "../models/course.model.js";

export const createEnrollment = async (req, res, next) => {
  try {
    const { student, course } = req.body;

    const studentExists = await Student.findById(student);

    if (!studentExists) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const courseExists = await Course.findById(course);

    if (!courseExists) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      student,
      course,
    });

    if (existingEnrollment) {
      return res.status(409).json({
        message: "Student is already enrolled in this course",
      });
    }

    const enrollment = await Enrollment.create(req.body);

    res.status(201).json(enrollment);
  } catch (error) {
    next(error);
  }
};

export const getAllEnrollments = async (req, res, next) => {
  try {
    const {
      status,
      sort = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const enrollments = await Enrollment.find(filter)
      .populate("student")
      .populate("course")
      .sort({
        [sort]: order === "asc" ? 1 : -1,
      })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const totalEnrollments = await Enrollment.countDocuments(filter);

    res.status(200).json({
      totalEnrollments,
      currentPage: Number(page),
      totalPages: Math.ceil(totalEnrollments / Number(limit)),
      enrollments,
    });
  } catch (error) {
    next(error);
  }
};

export const getEnrollmentById = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate("student")
      .populate("course");

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    next(error);
  }
};

export const updateEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    )
      .populate("student")
      .populate("course");

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    next(error);
  }
};

export const deleteEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    res.status(200).json({
      message: "Enrollment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};