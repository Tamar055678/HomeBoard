// server/swaggerOptions.js
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HomeBoard API',
      version: '1.0.0',
      description: 'API documentation for HomeBoard app',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
    apis: ['./server/api/*.js'],
 // או נתיב לקבצים עם דוקומנטציה
};

module.exports = options;
