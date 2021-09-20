'use strict'

// const Cable = use('App/Models/Cable')

class CableController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    // id session, name session, topic, and funcions to emit info to client with events
    this.request = request
    // informations in request
    this.canConnect(auth)
  }

  async canConnect (auth) {
    const [, id] = this.socket.topic.split(':')

    const provider = await auth.user.providers().where('provider_id', id).first()

    if (!provider) {
      this.socket.close()
      console.log('desc2')
    } else {
      if (Number(provider.id) !== Number(id)) {
        this.socket.close()
        console.log('desc2')
      }
      console.log('cnn')
    }
  }
}

module.exports = CableController
