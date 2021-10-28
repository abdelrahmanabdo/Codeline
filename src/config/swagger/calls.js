/**
 * @swagger
 * components:
 *  schemas:
 *    Calls:
 *      type: object,
 */

/**
 * @swagger
 *  /calls/{id}:
 *  post:
 *    summary: Save new user call.
 *    tags: ['Calls']
 *    description: Save new call.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
  *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              type:
 *                type: string
 *              status:
 *                type: string
 *              created_at:
 *                type: string
 *              ended_at:
 *                type: string
 *              duration:
 *                type: number
 *              userIds:
 *                type: string
 *          example: {
 *            type: "Audio || Video",
 *            status: "Incoming || Missed || Ongoing",
 *            created_at: 2021-08-17 21:58:33,
 *            ended_at: 2021-08-17 22:10:14,
 *            userIds: [1,2,3],
 *            duration: 43
 *          }
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

/**
 * @swagger
 *  /calls/{id}:
 *  get:
 *    summary: Get all user's calls.
 *    tags: ['Calls']
 *    description: Get all user's calls.
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
/**
 * @swagger
 *  /calls/{id}/participants/{callId}:
 *  get:
 *    summary: Get call recipients.
 *    tags: ['Calls']
 *    description: Get call recipients.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: callId
 *       schema:
 *        type: number
 *       required: true
 *       description: The call id
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

/**
 * @swagger
 *  /calls/{id}/search:
 *  post: 
 *    summary: Search in user's calls.
 *    tags: ['Calls']
 *    description: Search in user's calls.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            query:
 *              type: string
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

/**
 * @swagger
 *  /calls/{id}/remove/{callId}:
 *  delete:
 *    summary: Delete call 
 *    tags: ['Calls']
 *    description: When user delete call from his list.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: callId
 *       schema:
 *        type: number
 *       required: true
 *       description: The call id
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