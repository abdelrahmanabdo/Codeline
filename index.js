const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const dotenv = require('dotenv');
const io = require('socket.io')(http);
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger');

const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const profileRoutes = require('./src/routes/profile.routes');
const otpRoutes = require('./src/routes/otp.routes');
const lookupsRoutes = require('./src/routes/lookups.routes');
const { resetPassword } = require('./src/controllers/user.controller');

// Auth middleware
const authMiddleware = require('./src/middlewares/auth.middleware');

dotenv.config();
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({extended: false, limit: '50mb'}));
// app.use(express.static(__dirname + '/public', { maxAge: 31557600 }));

// Routes
app.use('/api/v1', lookupsRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/otp', otpRoutes);
app.use('/api/v1/users', authMiddleware, userRoutes);
app.use('/api/v1/users/password/reset', resetPassword); // Update user's password
app.use('/api/v1/profile', authMiddleware,profileRoutes);

// Swagger
app.use(
  '/api/doc', 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerJsDoc(swaggerOptions))
);

// Start the server
const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log('Codeline server is running on port', port);
});

// Production
// http.listen();