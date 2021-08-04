/**
 * @swagger
 * components:
 *  schemas:
 *    Profile Gallery:
 *      type: object,
 *      required:
 *        - user_id
 *      properties:
 *        image:
 *          type: string
 *          description: The user's gallery image
 *        title:
 *          type: string
 *          description: The user's gallery title
 *      example:
 *         image: "base64"
 *         title: Hello
 */

/**
 * @swagger
 *  /profile/{id}/gallery:
 *  post:
 *    summary: Add user's profile gallery.
 *    tags: ['Profile Gallery']
 *    description: Add user's profile gallery.
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
 *          $ref: '#/components/schemas/Profile Gallery'
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
 *  /profile/{id}/gallery:
 *  get:
 *    summary: Get user's profile gallery.
 *    tags: ['Profile Gallery']
 *    description: Get user's profile gallery.
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
 *  /profile/{id}/gallery/{galleryId}:
 *  put:
 *    summary: Update user's profile gallery.
 *    tags: ['Profile Gallery']
 *    description: Update user's profile gallery.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: gallery's id
 *       schema:
 *        type: number
 *       required: true
 *       description: The gallery's id
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Profile Gallery'
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
 *  /profile/{id}/gallery/{galleryId}:
 *  delete:
 *    summary: Delete user's profile gallery.
 *    tags: ['Profile Gallery']
 *    description: Delete user's profile gallery.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: gallery's id
 *       schema:
 *        type: number
 *       required: true
 *       description: The gallery's id
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Profile Gallery'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *         description: Missing params
 *      '500':
 *         description: Internal Server error ( Contact The developer)
 */
