import mongoose from "mongoose";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Invalid task ID",
    });
  }

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
};