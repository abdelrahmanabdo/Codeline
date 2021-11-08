/**
 * @swagger
 * components:
 *  schemas:
 *    Profile Projects:
 *      type: object,
 *      required:
 *        - title
 *        - description
 *        - image
 *      properties:
 *        description:
 *          type: string
 *          description: The user's project description
 *        image:
 *          type: string
 *          description: The user's project image
 *      example:
 *         title: Project title
 *         description: Project description is here......
 *         image: "base64"
 */

/**
 * @swagger
 *  /profile/{id}/projects:
 *  post:
 *    summary: Add user's profile project.
 *    tags: ['Profile Projects']
 *    description: Add user's profile project.
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
 *    summary: Get user's profile projects.
 *    tags: ['Profile Projects']
 *    description: Get user's profile projects.
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
 *  /profile/{id}/projects/:projectId:
 *  put:
 *    summary: Update profile project.
 *    tags: ['Profile Projects']
 *    description: Update user's profile project.
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
 *  /profile/{id}/projects/{projectId}:
 *  get:
 *    summary: Get specific profile project.
 *    tags: ['Profile Projects']
 *    description: Get specific profile project.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: projectId
 *       schema:
 *        type: number
 *       required: true
 *       description: The project's id
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
 *  /profile/{id}/projects/{projectId}:
 *  put:
 *    summary: Update user's project.
 *    tags: ['Profile Projects']
 *    description: Delete user's profile projects.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: projectId
 *       schema:
 *        type: number
 *       required: true
 *       description: The project's id
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
 *  /profile/{id}/projects/{projectId}:
 *  delete:
 *    summary: Delete user's profile project.
 *    tags: ['Profile Projects']
 *    description: Delete user's profile project.
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: number
 *       required: true
 *       description: The user's id
 *     - in: path
 *       name: projectId
 *       schema:
 *        type: number
 *       required: true
 *       description: The project's id
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *         description: Missing params
 *      '500':
 *         description: Internal Server error ( Contact The developer)
 */
