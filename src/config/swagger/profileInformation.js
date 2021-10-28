/**
 * @swagger
 * components:
 *  schemas:
 *    Profile Information:
 *      type: object,
 *      required:
 *        - user_id
 *      properties:
 *        name:
 *          type: string
 *          description: The user name
 *        email:
 *          type: string
 *          description: The user email
 *        avatar:
 *          type: string
 *          description: The user avatar
 *        nickname:
 *          type: string
 *          description: The user's profile nickname
 *        birth_date:
 *          type: string
 *          description: The user's profile birth date
 *        marital_status_id:
 *          type: number
 *          description: The user's profile marital status id in marital statuses table 
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
 *         name: Abdelrahman salman
 *         email: abdo@codeline.social
 *         avatar: base64
 *         nickname: Abdo
 *         birth_date: 15/7/1995 
 *         marital_status_id: 1
 *         location_id: 1
 *         CV: CV file base64 string
 *         bio: Hello
 */

/**
 * @swagger
 *  /profile/{id}/information:
 *  post:
 *    summary: Add user's profile information.
 *    tags: ['Profile Information']
 *    description: Add user's profile information.
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
 *          $ref: '#/components/schemas/Profile Information'
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
 *  /profile/{id}/information:
 *  get:
 *    summary: Get user's profile information.
 *    tags: ['Profile Information']
 *    description: Get user's profile information.
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
 *  /profile/{id}/information:
 *  put:
 *    summary: Update user's profile information.
 *    tags: ['Profile Information']
 *    description: Update user's profile information.
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
 *          $ref: '#/components/schemas/Profile Information'
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
 *  /profile/{id}/information:
 *  delete:
 *    summary: Delete user's profile information.
 *    tags: ['Profile Information']
 *    description: Delete user's profile information.
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
 *          $ref: '#/components/schemas/Profile Information'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *         description: Missing params
 *      '500':
 *         description: Internal Server error ( Contact The developer)
 */
