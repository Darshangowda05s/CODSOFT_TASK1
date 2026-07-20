import request from "supertest";
import app from "../src/app.js";
import "./setup.js";

let courseId;

const unique = Date.now();

const courseData = {
  courseCode: `CS${unique}`.slice(-7),
  courseName: "Data Structures",
  description: "Core CS course",
  instructor: "Dr. Rao",
  credits: 4,
};

describe("Course API", () => {
  test("POST /api/courses - Create Course", async () => {
    const response = await request(app)
      .post("/api/courses")
      .send(courseData);

    expect(response.status).toBe(201);
    expect(response.body.courseName).toBe(courseData.courseName);

    courseId = response.body._id;
  });

  test("GET /api/courses - Get All Courses", async () => {
    const response = await request(app).get("/api/courses");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.courses)).toBe(true);
  });

  test("GET /api/courses/:id - Get Course By ID", async () => {
    const response = await request(app).get(`/api/courses/${courseId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(courseId);
  });

  test("PUT /api/courses/:id - Update Course", async () => {
    const response = await request(app)
      .put(`/api/courses/${courseId}`)
      .send({
        instructor: "Dr. Sharma",
      });

    expect(response.status).toBe(200);
    expect(response.body.instructor).toBe("Dr. Sharma");
  });

  test("GET /api/courses?search=Data", async () => {
    const response = await request(app).get(
      "/api/courses?search=Data"
    );

    expect(response.status).toBe(200);
  });

  test("GET /api/courses?instructor=Sharma", async () => {
    const response = await request(app).get(
      "/api/courses?instructor=Sharma"
    );

    expect(response.status).toBe(200);
  });

  test("GET /api/courses?credits=4", async () => {
    const response = await request(app).get(
      "/api/courses?credits=4"
    );

    expect(response.status).toBe(200);
  });

  test("GET /api/courses?page=1&limit=5", async () => {
    const response = await request(app).get(
      "/api/courses?page=1&limit=5"
    );

    expect(response.status).toBe(200);
    expect(response.body.currentPage).toBe(1);
  });

  test("GET /api/courses?sort=courseName&order=asc", async () => {
    const response = await request(app).get(
      "/api/courses?sort=courseName&order=asc"
    );

    expect(response.status).toBe(200);
  });

  test("DELETE /api/courses/:id - Delete Course", async () => {
    const response = await request(app).delete(
      `/api/courses/${courseId}`
    );

    expect(response.status).toBe(200);
  });

  test("GET Deleted Course", async () => {
    const response = await request(app).get(
      `/api/courses/${courseId}`
    );

    expect(response.status).toBe(404);
  });
});