/**
 * @swagger
 * components:
 *  schemas:
 *    Profile Occasions:
 *      type: object,
 *      required:
 *        - user_id
 *      properties:
 *        nickname:
 *          type: string
 *          description: The user's profile nickname
 *        birth_date:
 *          type: string
 *          description: The user's profile birth date
 *        martial_status_id:
 *          type: number
 *          description: The user's profile martial status id in martial statuses table 
 *        location_id:
 *          type: number
 *          description: The user's profile location id in locations table 
 *        CV:
 *          type: string
 *          description: The user's profile CV base64
 *        bio:
 *          type: string
 *          description: The user's profile bio
 *      example:
 *         nickname: Abdo
 *         birth_date: 15/7/1995 
 *         martial_status_id: 2
 *         location_id: 1
 *         CV: CV's file base64 string
 *         bio: Hello I'm Abdelrahman, work as software engineer
 */

/**
 * @swagger
 *  /profile/{id}/occasions:
 *  post:
 *    summary: Add user's profile occasions.
 *    tags: ['Profile Occasions']
 *    description: Add user's profile occasions.
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
 *  /profile/{id}/occasions:
 *  put:
 *    summary: Update user's profile occasions.
 *    tags: ['Profile Occasions']
 *    description: Update user's profile occasions.
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
 *  delete:
 *    summary: Delete user's profile occasions.
 *    tags: ['Profile Occasions']
 *    description: Delete user's profile occasions.
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
