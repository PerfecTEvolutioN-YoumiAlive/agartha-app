const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const secure = require('ssl-express-www');
const socket = require('socket.io');

// App Configuration

const app = express();

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
});
const PORT = process.env.PORT || 5000;

// Middlewares

app.use(secure);
app.use(helmet({
   contentSecurityPolicy: false,
 }));
app.use(cors());
app.use(express.static(__dirname + '/index.html'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: true }));
app.use(express.static(__dirname + '/Views'));

const Connection = require('./database/Connection')();

const User = require('./database/Models/User/User')
const Profile = require('./database/Models/User/Profile')
const UserPreference = require('./database/Models/UserActivity/UserPreference');

const nana = async () => {
  const users = await User.find({});
  // const profile = await Profile.find({});
  // console.log(users)
}

nana();

// API Routes

const routes = require('./api/routes/routes');

app.use('/api', routes);

// const mainMiddlewareSocket = require('./middlewares/socket/main');
// const userMiddlewareSocket = require('./middlewares/socket/user');
// const socketController = require('./socket/index');
// const socketUserController = require('./socket/user');

// io.use(mainMiddlewareSocket);
// io.on('connection', socketController);

// const user_Namespace = io.of((name, auth, next) => { 
//   if (name === '/users') {
//     next(null, true);
//   }
// });
// user_Namespace.use(UserMiddlewareSocket);
// user_Namespace.on('connection', socketUserController);

// Listener

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));