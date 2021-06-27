/**
 * @swagger
 * components:
 *  schemas:
 *    OTP:
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
 *  /otp/verify:
 *  post:
 *    summary: Verify the OTP
 *    tags: ['OTP']
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
 *  /auth/login:
 *  post:
 *    summary: Get specific user's data.
 *    tags: ['Auth']
 *    description: Get the user by id
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
 *      '404':
 *         description: The user is not found
 *      '500':
 *         description: Internal Server error ( Contact The developer)
 */
