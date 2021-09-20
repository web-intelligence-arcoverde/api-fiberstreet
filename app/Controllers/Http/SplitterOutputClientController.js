'use strict'

const SplitterOutput = use('App/Models/SplitterOutput')

class SplitterOutputClientController {
  /**
   * Obtém todos os clientes que
   * estão conectados no splitter
   * @param {*} param0
   */
  async index ({ request, params }) {
    const outClients = await SplitterOutput
      .query()
      .where('provider_id', request.provider.id)
      .where('splitter_id', params.id)
      .with('client')
      .fetch()

    return outClients
  }

  /**
   * Obtém uma única saída de splitter
   * pertencente à um provedor
   * com o id do cliente igual ao parametro recebido
   * @param {*} param0 :id - Clients
   */
  async show ({ request, params }) {
    const splitterOutput = await request.provider
      .splitterOutputs()
      .where('client_id', params.id)
      .first()

    return splitterOutput
  }
}

module.exports = SplitterOutputClientController
