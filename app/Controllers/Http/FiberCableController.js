'use strict'

const Cable = use('App/Models/Cable')

class FiberCableController {
  async show ({ request, params }) {
    const fibers = await Cable
      .query()
      .where('provider_id', request.provider.id)
      .where('id', params.id)
      .with('fibers')
      .fetch()

    return fibers
  }
}

module.exports = FiberCableController
