import request from "supertest";
import app from "../src/app.js";
import "./setup.js";

let studentId;

const unique = Date.now();

const studentData = {
  studentID: `STU${unique}`.slice(-8),
  name: "Darshan",
  email: `darshan${unique}@gmail.com`,
  phone: "9876543210",
  department: "CSE",
  semester: 5,
};

describe("Student API", () => {
  test("POST /api/students - Create Student", async () => {
    const response = await request(app)
      .post("/api/students")
      .send(studentData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(studentData.name);

    studentId = response.body._id;
  });

  test("GET /api/students - Get All Students", async () => {
    const response = await request(app).get("/api/students");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.students)).toBe(true);
  });

  test("GET /api/students/:id - Get Student By ID", async () => {
    const response = await request(app).get(`/api/students/${studentId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(studentId);
  });

  test("PUT /api/students/:id - Update Student", async () => {
    const response = await request(app)
      .put(`/api/students/${studentId}`)
      .send({
        name: "Updated Student",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Student");
  });

  test("GET /api/students?search=Updated", async () => {
    const response = await request(app).get(
      "/api/students?search=Updated"
    );

    expect(response.status).toBe(200);
  });

  test("GET /api/students?department=CSE", async () => {
    const response = await request(app).get(
      "/api/students?department=CSE"
    );

    expect(response.status).toBe(200);
  });

  test("GET /api/students?semester=5", async () => {
    const response = await request(app).get(
      "/api/students?semester=5"
    );

    expect(response.status).toBe(200);
  });

  test("GET /api/students?page=1&limit=5", async () => {
    const response = await request(app).get(
      "/api/students?page=1&limit=5"
    );

    expect(response.status).toBe(200);
    expect(response.body.currentPage).toBe(1);
  });

  test("GET /api/students?sort=name&order=asc", async () => {
    const response = await request(app).get(
      "/api/students?sort=name&order=asc"
    );

    expect(response.status).toBe(200);
  });

  test("DELETE /api/students/:id - Delete Student", async () => {
    const response = await request(app).delete(
      `/api/students/${studentId}`
    );

    expect(response.status).toBe(200);
  });

  test("GET Deleted Student", async () => {
    const response = await request(app).get(
      `/api/students/${studentId}`
    );

    expect(response.status).toBe(404);
  });
});