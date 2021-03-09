function socketController(socket) {
  console.log('socket connexted', socket.id);
  console.log(socket.handshake.auth);
  socket.on('message', ({ data }) => console.log('-->', data));
}

module.exports = socketController;