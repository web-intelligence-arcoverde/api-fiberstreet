'use strict'

class CtoController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request

    this.canConnect(auth)
  }

  async canConnect (auth) {
    const [, id] = this.socket.topic.split(':')

    const provider = await auth.user.providers().where('provider_id', id).first()

    if (!provider) {
      this.socket.close()
    } else {
      if (Number(provider.id) !== Number(id)) {
        this.socket.close()
      }
    }
  }
}

module.exports = CtoController
