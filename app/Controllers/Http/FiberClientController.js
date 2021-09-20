'use strict'

class FiberClientController {
  async show ({ request, params }) {
    const cableExists = await request.provider
      .cable()
      .where()
  }
}

module.exports = FiberClientController
