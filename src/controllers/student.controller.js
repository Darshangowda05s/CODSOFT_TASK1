import Student from "../models/student.model.js";

export const createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};


export const getAllStudents = async (req, res, next) => {
  try {
    const {
      search,
      department,
      semester,
      sort = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

   
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    
    if (department) {
      filter.department = department;
    }

  
    if (semester) {
      filter.semester = Number(semester);
    }

    const students = await Student.find(filter)
      .sort({
        [sort]: order === "asc" ? 1 : -1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalStudents = await Student.countDocuments(filter);

    res.status(200).json({
      totalStudents,
      currentPage: Number(page),
      totalPages: Math.ceil(totalStudents / limit),
      students,
    });
  } catch (error) {
    next(error);
  }
};


export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};


export const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};