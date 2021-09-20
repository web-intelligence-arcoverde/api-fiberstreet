'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with fiberfusions
 */
class FiberFusionController {
  /**
   * Show a list of all fiberfusions.
   * GET fiberfusions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const fiberfusions = await request.provider
      .fiberfusions()
      .fetch()

    return fiberfusions
  }

  /**
   * Create/save a new fiberfusion.
   * POST fiberfusions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only(['fiber_in_id', 'fiber_out_id', 'name', 'sense', 'obs'])

    const fusion = await request.provider
      .fiberfusions()
      .create(data)

    return fusion
  }

  /**
   * Display a single fiberfusion.
   * GET fiberfusions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request }) {
    const fiberfusion = await request.provider
      .fiberfusions()
      .where('id', params.id)
      .first()

    return fiberfusion
  }

  /**
   * Update fiberfusion details.
   * PUT or PATCH fiberfusions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const data = request.only(['fiber_in_id', 'fiber_out_id', 'name', 'sense', 'obs'])

    const fiberfusion = await request.provider
      .fiberfusions()
      .where('id', params.id)
      .first()

    fiberfusion.merge(data)

    await fiberfusion.save()

    return fiberfusion
  }

  /**
   * Delete a fiberfusion with id.
   * DELETE fiberfusions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const fiberfusion = await request.provider
      .fiberfusions()
      .where('id', params.id)
      .first()

    await fiberfusion.delete()

    return fiberfusion
  }
}

module.exports = FiberFusionController
