'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with fibers
 */
class FiberController {
  /**
   * Show a list of all fibers.
   * GET fibers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const fibers = await request.provider
      .fibers()
      .fetch()

    return fibers
  }

  /**
   * Create/save a new fiber.
   * POST fibers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const cableId = request.input(['cable_id'])
    const fiber = await request.provider
      .fibers().create({ name: '', cable_id: cableId })

    return fiber
  }

  /**
   * Display a single fiber.
   * GET fibers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const fiber = await request.provider
      .fibers()
      .where('id', params.id)
      .first()

    return fiber
  }

  /**
   * Update fiber details.
   * PUT or PATCH fibers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const cableId = request.only(['cable_id'])
    const fiber = request.provider
      .fibers()
      .where('id', params.id)

    fiber.merge({ cable_id: cableId })
    await fiber.save()
    return fiber
  }

  /**
   * Delete a fiber with id.
   * DELETE fibers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const fiber = await request.provider
      .fibers()
      .where('id', params.id)
      .first()

    await fiber.delete()
    return fiber
  }
}

module.exports = FiberController
