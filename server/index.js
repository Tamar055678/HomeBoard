const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swaggerOptions');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// טעינת הסכמות (מריצות הגדרת טבלאות)
require('./models/Tenant.model');
require('./models/landlord.model');
require('./models/paymentMethod.model');


//require('./models/Apartment');
// ...

// טעינת ראוטרים
app.use('/api/tenants.api', require('./api/tenant.api'));
app.use('/api/landlords', require('./api/landlord.api'));
app.use('/api/payment-methods', require('./api/paymentMethod.api'));


//app.use('/api/apartments', require('./api/apartments'));
// ...

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Swagger available at http://localhost:${PORT}/api-docs`);
});
