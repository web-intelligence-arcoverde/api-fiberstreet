'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const SplitterOutput = use('App/Models/SplitterOutput')

/**
 * Resourceful controller for interacting with splitters
 */
class SplitterController {
  /**
   * Show a list of all splitters.
   * GET splitters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const splitters = await request.provider()
      .splitters()
      .fetch()

    return splitters
  }

  /**
   * Create/save a new splitter.
   * POST splitters
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'model', 'balancing', 'cto_id', 'ceo_id'])

    const existsSplitter = await request.provider
      .splitters()
      .where('cto_id', data.cto_id)
      .first()

    if (!existsSplitter) {
      await request.provider
        .splitters()
        .create(data)

      return data
    }

    // const [
    //   existsSplitterInCto,
    //   existsSplitterInCeo
    // ] = await Promise.all([
    //   request.provider.splitters().where('cto_id', data.cto_id).first(),
    //   request.provider.splitters().where('ceo_id', data.ceo_id).first()
    // ])
    // return existsSplitterInCto

    // if (!existsSplitterInCto && !existsSplitterInCeo) {
    //   const splitter = await request.provider.splitters().create(data)
    //   return splitter
    // }
  }

  /**
   * Display a single splitter.
   * GET splitters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

  }

  /**
   * Update splitter details.
   * PUT or PATCH splitters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const splitter = await request.provider
      .splitters()
      .where('id', params.id)
      .first()

    const data = request.only(['name', 'model', 'balancing'])

    const outputCountNumber = await SplitterOutput
      .query()
      .where('splitter_id', params.id)
      .getCount()

    if (data.balancing < outputCountNumber) {
      return response.json({ error: { message: 'A quantidade de saídas informada é menor do que a quantidade de clientes existentes' } })
    }

    splitter.merge(data)
    await splitter.save()

    return splitter
  }

  /**
   * Delete a splitter with id.
   * DELETE splitters/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const splitter = await request.provider
      .splitters()
      .where('id', params.id)
      .first()

    const outputCountNumber = await SplitterOutput
      .query()
      .where('splitter_id', params.id)
      .getCount()

    if (outputCountNumber > 0) {
      return response.status(400).json({error: {message: 'Não é possível deletar um splitter com clientes ativos'}})
    }

    await splitter.delete()
  }
}

module.exports = SplitterController
