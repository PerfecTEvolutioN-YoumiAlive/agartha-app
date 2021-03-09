function userMiddlewareSocket (socket, next) {
  console.log('User Middleware Socket is working');
  next(new Error('Not Authorized'));
}

module.exports = userMiddlewareSocket;