'use strict'

const RelCableCeo = use('App/Models/RelCableCeo')

class CableCeoController {
  async show ({ request, params }) {
    const cables = await RelCableCeo
      .query()
      .where('provider_id', request.provider.id)
      .where('ceo_id', params.id)
      .with('cable')
      .fetch()

    return cables
  }
}

module.exports = CableCeoController
