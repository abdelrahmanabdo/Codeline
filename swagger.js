module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Codeline API',
      description: 'Codeline app APIs documentation.'
    },
    servers: [
      { url: 'http://localhost:3000/api/v1/' },
      { url: 'https://app.codeline.co/api/v1/' }
    ],
    schemas: [
      "https"
    ],
  },
  apis: ["./src/config/swagger/*.js"]
};