module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Codeline API',
      description: 'Codeline app APIs documentation.'
    },
    servers: [
      { url: 'https://app.codeline.social/api/v1/' },
      // { url: 'http://localhost:3000/api/v1/' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          name: "Authorization",
          in: "header",
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    schemas: [
      "https",
      "http"
    ],
  },
  apis: ["./src/config/swagger/*.js"]
};