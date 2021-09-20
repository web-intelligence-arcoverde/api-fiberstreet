'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cables
 */
class CableController {
  /**
   * Show a list of all cables.
   * GET cables
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const cables = request.provider.cables().fetch()

    return cables
  }

  /**
   * Create/save a new cable.
   * POST cables
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([
      'name',
      'type',
      'coordinates',
      'obs',
      'fiberAmount',
      'lot',
      'sense'
    ])
    // const dada = request.all()
    // console.log(dada)

    const cable = await request.provider.cables().create(data)
    return cable
  }

  /**
   * Display a single cable.
   * GET cables/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const cable = await request.provider
      .cables()
      .where('id', params.id)
      .first()

    return cable
  }

  /**
   * Update cable details.
   * PUT or PATCH cables/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only([
      'name',
      'type',
      'coordinates',
      'obs',
      'fiberAmount',
      'lot',
      'sense'
    ])

    const cable = await request.provider
      .cables()
      .where('id', params.id)
      .first()

    cable.merge(data)

    await cable.save()

    return cable
  }

  /**
   * Delete a cable with id.
   * DELETE cables/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request }) {
    const cable = await request.provider
      .cables()
      .where('id', params.id)
      .first()

    await cable.delete()
  }
}

module.exports = CableController
