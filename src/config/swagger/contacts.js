/**
 * @swagger
 * components:
 *  schemas:
 *    Contacts:
 *      type: object,
 */

/**
 * @swagger
 *  /contacts/{id}:
 *  get:
 *    summary: Get all user's contacts
 *    tags: ['Contacts']
 *    description: Get all user's contacts.
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
 *  /contacts/{id}:
 *  post:
 *    summary: Add new contacts.
 *    tags: ['Contacts']
 *    description: Add new contacts.
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
 *            contacts:
 *              type: array
 *              items: 
 *               type: object
 *              example: [
 *                  {
 *                      "name": "Abdelrahman salman",
 *                      "phone": "+201096742196",
 *                  },
 *              ]
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
 *  /contacts/{id}/search:
 *  post:
 *    summary: Search in user's contacts.
 *    tags: ['Contacts']
 *    description: Search in user's contacts.
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
