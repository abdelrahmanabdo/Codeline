/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object,
 *      required:
 *        - phone
 *        - password
 *      properties:
 *        phone:
 *          type: string
 *          description: The user's phone
 *        password:
 *          type: string
 *          description: The user's password
 *      example:
 *         phone: +201xxxxxxxx
 *         password: 1234567 
 */

/**
 * @swagger
 *  /users:
 *  post:
 *    summary: Create a new user.
 *    tags: ['Users']
 *    description: Add new user
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'
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
 *  /users/{id}:
 *  get:
 *    summary: Get specific user's data.
 *    tags: ['Users']
 *    description: Get the user by id
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
 *  /users/{id}:
 *  put:
 *    summary: Update user.
 *    tags: ['Users']
 *    description: Update user's data
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *    requestBody:
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'
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
 *  /users/{id}:
 *  delete:
 *    summary: Delete  user.
 *    tags: ['Users']
 *    description: Delete user's data
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *    requestBody:
 *     required: false
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'
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
 *  /users/{id}/password:
 *  put:
 *    summary: Update user's password.
 *    tags: ['Users']
 *    description: Update user's password
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *    requestBody:
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'
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
