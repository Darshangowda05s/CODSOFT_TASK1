/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Enrollment Management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       required:
 *         - student
 *         - course
 *       properties:
 *         _id:
 *           type: string
 *           example: 686540bbba83b2c17dcbe92a
 *         student:
 *           type: string
 *           description: Student ObjectId
 *           example: 68653e2e27c5b6e6f5d0d1f2
 *         course:
 *           type: string
 *           description: Course ObjectId
 *           example: 68653f8e72cbaf1d61e4d44f
 *         enrolledAt:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum:
 *             - Active
 *             - Completed
 *             - Dropped
 *           example: Active
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollments]
 *     description: Returns all enrollments with populated student and course information. Supports filtering, sorting and pagination.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - Active
 *             - Completed
 *             - Dropped
 *         description: Filter enrollments by status
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
 *           enum:
 *             - asc
 *             - desc
 *           default: desc
 *     responses:
 *       200:
 *         description: Enrollments fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Enroll a student in a course
 *     tags: [Enrollments]
 *     description: Creates a new enrollment. A student cannot enroll in the same course twice.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *           example:
 *             student: 68653e2e27c5b6e6f5d0d1f2
 *             course: 68653f8e72cbaf1d61e4d44f
 *             status: Active
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Student or Course not found
 *       409:
 *         description: Student already enrolled in this course
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/enrollments/{id}:
 *   get:
 *     summary: Get enrollment by ID
 *     tags: [Enrollments]
 *     description: Returns a single enrollment with populated student and course details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Enrollment ObjectId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment found
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/enrollments/{id}:
 *   put:
 *     summary: Update enrollment
 *     tags: [Enrollments]
 *     description: Update an enrollment's student, course or status.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Enrollment ObjectId
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: Completed
 *     responses:
 *       200:
 *         description: Enrollment updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/enrollments/{id}:
 *   delete:
 *     summary: Delete enrollment
 *     tags: [Enrollments]
 *     description: Deletes an enrollment record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Enrollment ObjectId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Internal server error
 */