function socketUserController(socket) {
  console.log('socket connexted to user namespace', socket.id);
  console.log(socket.handshake.auth);
  socket.on('message', ({ data }) => console.log('-->', data));
}

module.exports = socketUserController;