'use strict'

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(data){
    this.socket.broadcast('message', data);
    console.log(data);
  }
}

module.exports = ChatController
