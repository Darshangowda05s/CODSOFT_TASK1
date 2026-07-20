import request from "supertest";
import "./setup.js";
import app from "../src/app.js";

let studentId;
let courseId;
let enrollmentId;

const unique = Date.now();

const studentData = {
  studentID: `STU${unique}`.slice(-8),
  name: "John Doe",
  email: `john${unique}@gmail.com`,
  phone: "9876543210",
  department: "CSE",
  semester: 5,
};

const courseData = {
  courseCode: `CS${unique}`.slice(-7),
  courseName: "Operating Systems",
  description: "OS Course",
  instructor: "Dr. Rao",
  credits: 4,
};


describe("Enrollment API", () => {
  beforeAll(async () => {
    
    const studentResponse = await request(app)
      .post("/api/students")
      .send(studentData);
    
    studentId = studentResponse.body._id;

    
    const courseResponse = await request(app)
      .post("/api/courses")
      .send(courseData);
    
    courseId = courseResponse.body._id;
  });

  test("POST /api/enrollments - Create Enrollment", async () => {
    const response = await request(app)
      .post("/api/enrollments")
      .send({
        student: studentId,
        course: courseId,
      });

    expect(response.status).toBe(201);

    enrollmentId = response.body._id;
  });

  test("POST Duplicate Enrollment", async () => {
    const response = await request(app)
      .post("/api/enrollments")
      .send({
        student: studentId,
        course: courseId,
      });

    expect(response.status).toBe(409);
  });

  test("GET /api/enrollments", async () => {
    const response = await request(app)
      .get("/api/enrollments");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.enrollments)).toBe(true);
  });

  test("GET /api/enrollments/:id", async () => {
    const response = await request(app)
      .get(`/api/enrollments/${enrollmentId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(enrollmentId);
  });

  test("GET Populated Student", async () => {
    const response = await request(app)
      .get(`/api/enrollments/${enrollmentId}`);

    expect(response.body.student.name).toBe(studentData.name);
  });

  test("GET Populated Course", async () => {
    const response = await request(app)
      .get(`/api/enrollments/${enrollmentId}`);

    expect(response.body.course.courseName).toBe(
      courseData.courseName
    );
  });

  test("PUT /api/enrollments/:id", async () => {
    const response = await request(app)
      .put(`/api/enrollments/${enrollmentId}`)
      .send({
        status: "Completed",
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Completed");
  });

  test("GET /api/enrollments?status=Completed", async () => {
    const response = await request(app)
      .get("/api/enrollments?status=Completed");

    expect(response.status).toBe(200);
  });

  test("GET /api/enrollments?page=1&limit=5", async () => {
    const response = await request(app)
      .get("/api/enrollments?page=1&limit=5");

    expect(response.status).toBe(200);
    expect(response.body.currentPage).toBe(1);
  });

  test("DELETE /api/enrollments/:id", async () => {
    const response = await request(app)
      .delete(`/api/enrollments/${enrollmentId}`);

    expect(response.status).toBe(200);
  });

  test("GET Deleted Enrollment", async () => {
    const response = await request(app)
      .get(`/api/enrollments/${enrollmentId}`);

    expect(response.status).toBe(404);
  });
});