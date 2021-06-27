/**
 * @swagger
 * components:
 *  schemas:
 *    Profile:
 *      type: object,
 */

/**
 * @swagger
 *  /profile/{id}:
 *  get:
 *    summary: Get all user's profile data.
 *    tags: ['Profile']
 *    description: Get all user's profile data.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *         description: Missing params
 *      '404':
 *         description: The user is not found
 *      '500':
 *         description: Internal Server error ( Contact The developer)
 */