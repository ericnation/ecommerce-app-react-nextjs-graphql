// let's go!
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');



const server = createServer();

// Send cookies with req
server.express.use(cookieParser());
// decode the JWT so we can get the user ID on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  console.log(token)
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put userId onto the request for future requests to access
    req.userId = userId;
  }
  next();
});

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
},
deets => {
  console.log(`Server is now running on port http://localhost:${deets.port}`)
})
