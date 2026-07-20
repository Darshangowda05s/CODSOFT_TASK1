import Course from "../models/course.model.js";


export const createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};


export const getAllCourses = async (req, res, next) => {
  try {
    const {
      search,
      instructor,
      credits,
      sort = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    
    if (search) {
      filter.courseName = {
        $regex: search,
        $options: "i",
      };
    }

    
    if (instructor) {
      filter.instructor = {
        $regex: instructor,
        $options: "i",
      };
    }

 
    if (credits) {
      filter.credits = Number(credits);
    }

    const courses = await Course.find(filter)
      .sort({
        [sort]: order === "asc" ? 1 : -1,
      })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const totalCourses = await Course.countDocuments(filter);

    res.status(200).json({
      totalCourses,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCourses / Number(limit)),
      courses,
    });
  } catch (error) {
    next(error);
  }
};


export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};


export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};


export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};