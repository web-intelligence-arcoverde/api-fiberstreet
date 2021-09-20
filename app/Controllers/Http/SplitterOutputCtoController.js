'use strict'

class SplitterOutputCtoController {
  async show ({ request, params }) {
    const splitterOutputs = await request.provider
      .splitterOutputs()
      .where('splitter_id', params.id)
      .fetch()

    return splitterOutputs
  }
}

module.exports = SplitterOutputCtoController
