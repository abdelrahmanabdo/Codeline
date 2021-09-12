const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const multer = require('multer');

// Imports
const io = require('./socket.js').init(http);
const swaggerOptions = require('./swagger');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const profileRoutes = require('./src/routes/profile.routes');
const otpRoutes = require('./src/routes/otp.routes');
const lookupsRoutes = require('./src/routes/lookups.routes');
const chatRoutes = require('./src/routes/chat.routes');
const contactsRoutes = require('./src/routes/contacts.routes');
const storiesRoutes = require('./src/routes/stories.routes');
const {
  resetPassword
} = require('./src/controllers/user.controller');

// Auth middleware
const authMiddleware = require('./src/middlewares/auth.middleware');
const validationMiddleware = require('./src/middlewares/validation.middleware');

dotenv.config();
app.use(express.json({
  limit: '50mb'
}));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));
// app.use(express.static(__dirname + '/public', {
//   maxAge: 31557600
// }));

// Routes
app.use('/api/v1', lookupsRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/otp', otpRoutes);
app.post('/api/v1/password/reset', resetPassword);
app.use('/api/v1/users', authMiddleware, userRoutes);
app.use('/api/v1/profile', [authMiddleware], profileRoutes);
app.use('/api/v1/chats', [authMiddleware], chatRoutes);
app.use('/api/v1/contacts', [authMiddleware], contactsRoutes);
app.use('/api/v1/stories', [authMiddleware], storiesRoutes);

// Swagger
app.use(
  '/api/doc',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerOptions))
);

// Socket
io.on('connection', (socket) => {
  console.log(`Connection : SocketId = ${socket.id}`)
  // Start a new chat channel 
  socket.on('start_chatting', (chatId) => socket.join(`chat:${chatId}`));

  // socket.on('is_typing', (chat_id, user_id) => {
  //   socket.to(`chat:${chat_id}`).emit('typing', {
  //     username: socket.username
  //   });
  // });
  // socket.on('typing_stopped', () => {
  //   socket.broadcast.emit('typing_stop', {
  //     username: socket.username
  //   });
  // });
});

// Start the server
const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log('Codeline server is running on port', port);
});