import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import studentRoutes from "./routes/student.routes.js";
import courseRoutes from "./routes/course.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";

const app=express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get("/", (req, res) => {
  res.json({
    message: "Student-API is running",
  });
});

app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

export default app;