/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course Management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - courseCode
 *         - courseName
 *         - instructor
 *         - credits
 *       properties:
 *         _id:
 *           type: string
 *           example: 68653f8e72cbaf1d61e4d44f
 *         courseCode:
 *           type: string
 *           example: CS101
 *         courseName:
 *           type: string
 *           example: Data Structures
 *         instructor:
 *           type: string
 *           example: Dr. Rao
 *         description:
 *           type: string
 *           example: Introduction to Data Structures
 *         credits:
 *           type: integer
 *           example: 4
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     description: Returns a paginated list of courses with optional searching, filtering and sorting.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by course name
 *       - in: query
 *         name: instructor
 *         schema:
 *           type: string
 *         description: Filter by instructor
 *       - in: query
 *         name: credits
 *         schema:
 *           type: integer
 *         description: Filter by credits
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
 *         description: Courses fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *           example:
 *             courseCode: CS101
 *             courseName: Data Structures
 *             instructor: Dr. Rao
 *             description: Introduction to Data Structures
 *             credits: 4
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Duplicate course
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course found
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update course
 *     tags: [Courses]
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
 *             instructor: Dr. Sharma
 *             description: Updated course description
 *             credits: 3
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */