/**
 * @swagger
 * components:
 *  schemas:
 *    OTP:
 *      type: object,
 *      required:
 *        - user_id
 *        - password
 *      properties:
 *        user_id:
 *          type: string
 *          description: The user's id
 *        otp:
 *          type: string
 *          description: The user's OTP code
 *      example:
 *         user_id: 1
 *         otp: EASLG3 
 */

/**
 * @swagger
 *  /otp/verify:
 *  post:
 *    summary: Verify the OTP
 *    tags: ['OTP']
 *    description: Verify the OTP
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/OTP'
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
 *  /otp/resend:
 *  post:
 *    summary: resend new otp code.
 *    tags: ['OTP']
 *    description: Resend new OTP to user
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
