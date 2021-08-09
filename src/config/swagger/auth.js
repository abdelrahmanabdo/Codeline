/**
 * @swagger
 * components:
 *  schemas:
 *    Auth:
 *      type: object,
 *      required:
 *        - phone
 *        - password
 *        - name
 *      properties:
 *        phone:
 *          type: string
 *          description: The user's phone
 *        password:
 *          type: string
 *          description: The user's password
 *        name:
 *          type: string
 *          description: The user's name
 *      example:
 *         phone: +201xxxxxxxxx
 *         password: "12345678" 
 *         name: "New codeline user"
 *         email: "abdo@bodecanada.com"
 *         avatar: "base64"
 * 
 * 
 */

/**
 * @swagger
 *  /auth/create_account:
 *  post:
 *    summary: Create a new user account.
 *    tags: ['Auth']
 *    description: Add new user
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Auth'
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
 *    description: Log user in
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            phone:
 *              type: string
 *            password:
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
