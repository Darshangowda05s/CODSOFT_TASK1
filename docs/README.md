# Student Management API

A production-style RESTful API for managing students, courses, and course enrollments. This backend application provides complete CRUD operations, validation, filtering, searching, sorting, pagination, API documentation, and automated testing.

Built using Node.js, Express.js, MongoDB, and Mongoose.

---

# Features

## Student Management

- Create students
- Retrieve all students
- Retrieve student by ID
- Update student details
- Delete students
- Search students by name
- Filter students by:
  - Department
  - Semester
- Pagination support
- Sorting support

---

## Course Management

- Create courses
- Retrieve all courses
- Retrieve course by ID
- Update course details
- Delete courses
- Search courses by name
- Filter courses by:
  - Instructor
  - Credits
- Pagination support
- Sorting support

---

## Enrollment Management

- Enroll students into courses
- Prevent duplicate enrollments
- Retrieve all enrollments
- Retrieve enrollment by ID
- Update enrollment status
- Delete enrollments
- Filter enrollments by status
- Populate student and course information

Supported enrollment statuses:

- Active
- Completed
- Dropped

---

# Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose ODM

## Validation

- Zod

## API Documentation

- Swagger UI
- swagger-jsdoc

## Testing

- Jest
- Supertest
- mongodb-memory-server

## Development Tools

- Nodemon
- Morgan
- CORS
- dotenv

---

# Project Structure

```
CODSOFT_TASK1
│
├── src
│   │
│   ├── config
│   │   ├── db.js
│   │   └── swagger.js
│   │
│   ├── controllers
│   │   ├── student.controller.js
│   │   ├── course.controller.js
│   │   └── enrollment.controller.js
│   │
│   ├── docs
│   │   ├── student.swagger.js
│   │   ├── course.swagger.js
│   │   └── enrollment.swagger.js
│   │
│   ├── middleware
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   │
│   ├── models
│   │   ├── student.model.js
│   │   ├── course.model.js
│   │   └── enrollment.model.js
│   │
│   ├── routes
│   │   ├── student.routes.js
│   │   ├── course.routes.js
│   │   └── enrollment.routes.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests
│   ├── student.test.js
│   ├── course.test.js
│   ├── enrollment.test.js
│   └── setup.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd CODSOFT_TASK1
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

---

# Running the Application

## Development Mode

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## Production Mode

```bash
npm start
```

---

# API Documentation

Swagger UI is available at:

```
http://localhost:5000/api-docs
```

Swagger provides:

- API endpoint documentation
- Request body examples
- Query parameters
- Response descriptions
- Interactive API testing

---

# API Endpoints

## Students

Base URL:

```
/api/students
```

---

### Create Student

```
POST /api/students
```

Request:

```json
{
  "studentID": "STU1001",
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "department": "CSE",
  "semester": 5
}
```

---

### Get All Students

```
GET /api/students
```

Query Parameters:

```
?page=1
&limit=10
&search=Rahul
&department=CSE
&semester=5
&sort=name
&order=asc
```

---

### Get Student By ID

```
GET /api/students/:id
```

---

### Update Student

```
PUT /api/students/:id
```

---

### Delete Student

```
DELETE /api/students/:id
```

---

# Courses

Base URL:

```
/api/courses
```

---

### Create Course

```
POST /api/courses
```

Example:

```json
{
  "courseCode": "CS101",
  "courseName": "Data Structures",
  "instructor": "Dr. Rao",
  "description": "Introduction to Data Structures",
  "credits": 4
}
```

---

### Get All Courses

```
GET /api/courses
```

Query Parameters:

```
?page=1
&limit=10
&search=Data
&instructor=Rao
&credits=4
&sort=courseName
&order=asc
```

---

### Get Course By ID

```
GET /api/courses/:id
```

---

### Update Course

```
PUT /api/courses/:id
```

---

### Delete Course

```
DELETE /api/courses/:id
```

---

# Enrollments

Base URL:

```
/api/enrollments
```

---

### Create Enrollment

```
POST /api/enrollments
```

Example:

```json
{
  "student": "student_object_id",
  "course": "course_object_id",
  "status": "Active"
}
```

---

### Get All Enrollments

```
GET /api/enrollments
```

Query Parameters:

```
?page=1
&limit=10
&status=Completed
&sort=createdAt
&order=desc
```

---

### Get Enrollment By ID

```
GET /api/enrollments/:id
```

---

### Update Enrollment

```
PUT /api/enrollments/:id
```

Example:

```json
{
  "status": "Completed"
}
```

---

### Delete Enrollment

```
DELETE /api/enrollments/:id
```

---

# Database Design

## Student Collection

Stores student information.

Fields:

- studentID
- name
- email
- phone
- department
- semester
- createdAt
- updatedAt

---

## Course Collection

Stores course information.

Fields:

- courseCode
- courseName
- instructor
- description
- credits
- createdAt
- updatedAt

---

## Enrollment Collection

Stores student-course relationships.

Fields:

- student (Reference)
- course (Reference)
- enrolledAt
- status
- createdAt
- updatedAt

A unique compound index prevents duplicate enrollment:

```
student + course
```

---

# Validation

The API validates incoming requests using Zod and Mongoose validation.

Validation includes:

- Required fields
- String length checks
- Email formatting
- Phone number format
- Semester range
- Credits range
- Enrollment status values

---

# Error Handling

The API includes centralized error handling middleware.

Supported errors:

- Validation errors
- Resource not found
- Duplicate records
- Invalid requests
- Database errors

---

# Automated Testing

The project includes automated API testing using Jest and Supertest.

Tests cover:

- Student APIs
- Course APIs
- Enrollment APIs

Run tests:

```bash
npm test
```

Test coverage includes:

- CRUD operations
- Validation
- Filtering
- Searching
- Sorting
- Pagination
- Duplicate prevention
- Relationship population

Current test results:

```
Test Suites: 3 passed
Tests: 33 passed
```

---

# Security Considerations

Implemented:

- Environment variable management
- Request validation
- Error handling middleware
- MongoDB schema validation
- Duplicate prevention using database indexes

---

# Future Improvements

Possible enhancements:

- JWT authentication
- Role-based authorization
- Admin dashboard
- File uploads
- Rate limiting
- API versioning
- Advanced analytics
- Docker deployment
- CI/CD pipeline

---

# Author

Darshan B N

Computer Science Engineering Student

---

# Internship

This project was developed as part of the CodSoft Backend Development Internship (Task 1 - Student Record Management Backend)

---
