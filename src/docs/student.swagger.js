/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student Management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - studentID
 *         - name
 *         - email
 *         - phone
 *         - department
 *         - semester
 *       properties:
 *         _id:
 *           type: string
 *           example: 68653e2e27c5b6e6f5d0d1f2
 *         studentID:
 *           type: string
 *           example: STU1001
 *         name:
 *           type: string
 *           example: Darshan Gowda
 *         email:
 *           type: string
 *           example: darshan@gmail.com
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         department:
 *           type: string
 *           example: CSE
 *         semester:
 *           type: integer
 *           example: 5
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     description: Returns a paginated list of students with optional searching, filtering and sorting.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search student by name
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter by department
 *       - in: query
 *         name: semester
 *         schema:
 *           type: integer
 *         description: Filter by semester
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: createdAt
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Students fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *           example:
 *             studentID: STU1001
 *             name: Darshan Gowda
 *             email: darshan@gmail.com
 *             phone: "9876543210"
 *             department: CSE
 *             semester: 5
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Duplicate student
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Updated Student
 *             semester: 6
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */