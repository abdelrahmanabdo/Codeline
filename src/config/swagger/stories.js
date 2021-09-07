/**
 * @swagger
 * components:
 *  schemas:
 *    Stories:
 *      type: object,
 */

/**
 * @swagger
 *  /stories/{id}:
 *  post:
 *    summary: Add new stories.
 *    tags: ['Stories']
 *    description: Add new stories.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *    requestBody:
 *     required: true
 *     description: contacts array of objects
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *           type:
 *            type: string
 *           content:
 *            type:  string
 *           caption:
 *            type:  string
 *          example: {
 *           "type": "Image || Video",
 *           "content": "base64 string",
 *           "caption": "this is the story caption if exists",
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
 *  /stories/{id}:
 *  get:
 *    summary: Get user's contacts' stories
 *    tags: ['Stories']
 *    description: Get contact stories.
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
 *  /stories/{id}/contact/{contactId}:
 *  get:
 *    summary: Get single contact stories
 *    tags: ['Stories']
 *    description: Get list of stories of current user contacts.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: contactId
 *       schema:
 *        type: number
 *       required: true
 *       description: The contact's id
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
 *  /stories/{id}/delete/{storyId}:
 *  delete:
 *    summary: Delete user story
 *    tags: ['Stories']
 *    description: Delete user story
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: storyId
 *       schema:
 *        type: number
 *       required: true
 *       description: The story's id
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

