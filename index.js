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

// Auth middleware
const authMiddleware = require('./src/middlewares/auth.middleware');

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.static(__dirname));
app.use(express.urlencoded({extended: false}));
app.use('/public', express.static('resources'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/otp', otpRoutes);
app.use('/api/v1/users', authMiddleware, userRoutes);
app.use('/api/v1/profile', authMiddleware,profileRoutes);

// Swagger
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

// Start the server
const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log('Codeline server is running on port', port);
});

// Production
// http.listen();