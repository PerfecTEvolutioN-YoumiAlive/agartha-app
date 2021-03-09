function mainMiddlewareSocket(socket, next) {
  console.log('Main Middleware Socket is working');
  next();
}

module.exports = mainMiddlewareSocket;