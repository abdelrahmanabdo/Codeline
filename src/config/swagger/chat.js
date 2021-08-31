/**
 * @swagger
 * components:
 *  schemas:
 *    Chat:
 *      type: object,
 *      example:
 *       to: 2
 *       message: "Hi here" 
 *       message_type: "Text"
 */

/**
 * @swagger
 *  /chats/{id}:
 *  get:
 *    summary: Get all user's chats.
 *    tags: ['Chat']
 *    description: Get all user's chats.
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
 *  /chats/{id}/search:
 *  post: 
 *    summary: Search in user's chats.
 *    tags: ['Chat']
 *    description: Search in user's chats.
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
 *          type: object
 *          properties:
 *            query:
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


/**
 * @swagger
 *  /chats/{id}/messages/{chat_id}:
 *  get:
 *    summary: Get chat messages.
 *    tags: ['Chat']
 *    description: Get chat messages.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: chatId
 *       schema:
 *        type: number
 *       required: true
 *       description: The chat's id
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
 *  /chats/{id}/messages/send:
 *  post:
 *    summary: Send new chat message.
 *    tags: ['Chat']
 *    description: Send new chat message.
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
 *          type: object
 *          properties:
 *            message*:
 *              type: string
 *            to:
 *              type: string
 *            message_type:
 *              type: string
 *            chat_id:
 *              type: number
 *            chat_name:
 *              type: string
 *            reply_to:
 *              type: number
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
 *  /chats/{id}/remove/{chatId}:
 *  delete:
 *    summary: Delete chat 
 *    tags: ['Chat']
 *    description: When user delete chat from his list.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: chatId
 *       schema:
 *        type: number
 *       required: true
 *       description: The chat's id
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
 *  /chats/{id}/messages/{chatId}/remove/{messageId}:
 *  delete:
 *    summary: Delete chat message
 *    tags: ['Chat']
 *    description: When user delete chat message.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: chatId
 *       schema:
 *        type: number
 *       required: true
 *       description: The chat's id
 *     - in: path
 *       name: messageId
 *       schema:
 *        type: number
 *       required: true
 *       description: The chat message's id
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
 *  /chats/{chatId}/members:
 *  get:
 *    summary: Get chat members.
 *    tags: ['Chat']
 *    description: Get chat members.
 *    parameters:
 *     - in: path
 *       name: chatId
 *       schema:
 *        type: number
 *       required: true
 *       description: The chat's id
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
 *  /chats/{chatId}/members/add:
 *  post:
 *    summary: Add chat new member.
 *    tags: ['Chat']
 *    description: Get chat members.
 *    parameters:
 *     - in: path
 *       name: chatId
 *       schema:
 *        type: number
 *       required: true
 *       description: The chat's id
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            user_id:
 *              type: number
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
 *  /chats/{chatId}/members/remove:
 *  delete:
 *    summary: Add chat new member.
 *    tags: ['Chat']
 *    description: Get chat members.
 *    parameters:
 *     - in: path
 *       name: chatId
 *       schema:
 *        type: number
 *       required: true
 *       description: The chat's id
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            user_id:
 *              type: number
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