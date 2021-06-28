/**
 * @swagger
 * components:
 *  schemas:
 *    Profile Projects:
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
 *         martial_status_id: 1
 *         location_id: 1
 *         CV: CV file base64 string
 *         bio: Hello
 */

/**
 * @swagger
 *  /profile/{id}/projects:
 *  post:
 *    summary: Add user's profile projects.
 *    tags: ['Profile Projects']
 *    description: Add user's profile projects.
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
 *          $ref: '#/components/schemas/Profile Projects'
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
 *  /profile/{id}/projects:
 *  get:
 *    summary: Update user's profile projects.
 *    tags: ['Profile Projects']
 *    description: Update user's profile projects.
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
 *  /profile/{id}/projects:
 *  put:
 *    summary: Delete user's profile projects.
 *    tags: ['Profile Projects']
 *    description: Delete user's profile projects.
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
 *          $ref: '#/components/schemas/Profile Projects'
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
 *  /profile/{id}/projects:
 *  delete:
 *    summary: Add user's profile projects.
 *    tags: ['Profile Projects']
 *    description: Add user's profile projects.
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
 *          $ref: '#/components/schemas/Profile Projects'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *         description: Missing params
 *      '500':
 *         description: Internal Server error ( Contact The developer)
 */
