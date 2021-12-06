/**
 * @swagger
 * components:
 *  schemas:
 *    Profile Occasions:
 *      type: object,
 *      required:
 *        - user_id
 *      properties:
 *        occasion_id:
 *          type: string
 *          description: The user's profile nickname
 *        date:
 *          type: string
 *          description: The user's profile birth date
 *      example:
 *         occasion_id: 1
 *         date: 15/7/1995 
 */

/**
 * @swagger
 *  /profile/{id}/occasions:
 *  post:
 *    summary: Add user's profile occasion.
 *    tags: ['Profile Occasions']
 *    description: Add user's profile occasion.
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
 *          $ref: '#/components/schemas/Profile Occasions'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *         description: Missing params
 *      '500':
 *         description: Internal Server error ( Contact The developer)
 */

/**
 * @swagger
 *  /profile/{id}/occasions:
 *  get:
 *    summary: Get user's profile occasions.
 *    tags: ['Profile Occasions']
 *    description: Get user's profile occasions.
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
 *  /profile/{id}/occasions/{occasionId}:
 *  put:
 *    summary: update profile occasion.
 *    tags: ['Profile Occasions']
 *    description: update user's profile occasion.
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
 *          $ref: '#/components/schemas/Profile Occasions'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *         description: Missing params
 *      '500':
 *         description: Internal Server error ( Contact The developer)
 */

/**
 * @swagger
 *  /profile/{id}/occasions/{occasionId}:
 *  get:
 *    summary: Get specific profile occasion.
 *    tags: ['Profile Occasions']
 *    description: Get specific profile occasion.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
*     - in: path
 *       name: occasionId
 *       schema:
 *        type: number
 *       required: true
 *       description: The occasion's id
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
 *  /profile/{id}/occasions/{occasionId}:
 *  put:
 *    summary: Update user's profile occasion.
 *    tags: ['Profile Occasions']
 *    description: Update user's profile occasion.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: occasionId
 *       schema:
 *        type: number
 *       required: true
 *       description: The occasion's id
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Profile Occasions'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *         description: Missing params
 *      '500':
 *         description: Internal Server error ( Contact The developer)
 */


/**
 * @swagger
 *  /profile/{id}/occasions/{occasionId}:
 *  delete:
 *    summary: Delete user's profile occasion1.
 *    tags: ['Profile Occasions']
 *    description: Delete user's profile occasion1.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: occasionId
 *       schema:
 *        type: number
 *       required: true
 *       description: The occasion's id
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Profile Occasions'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *         description: Missing params
 *      '500':
 *         description: Internal Server error ( Contact The developer)
 */
