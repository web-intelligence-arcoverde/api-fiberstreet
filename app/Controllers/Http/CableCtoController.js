'use strict'

const RelCableCto = use('App/Models/RelCableCto')

class CableCtoController {
  async show ({ request, params }) {
    const cables = await RelCableCto
      .query()
      .where('provider_id', request.provider.id)
      .where('cto_id', params.id)
      .with('cable')
      .fetch()

    return cables
  }
}

module.exports = CableCtoController
