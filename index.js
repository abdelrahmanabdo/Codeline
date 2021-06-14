const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const dotenv = require('dotenv');
const io = require('socket.io')(http);

const userRoutes = require('./src/routes/user.routes');

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));
app.use(express.urlencoded({extended: false}));
app.use('/public', express.static('resources'));

// Routes
app.use('/api/v1/users', userRoutes);

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log('Codeline server is running on port', port);
});