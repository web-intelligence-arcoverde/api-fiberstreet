'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with adminproviders
 */
class AdminProviderController {
  /**
   * Show a list of all adminproviders.
   * GET adminproviders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  async create({ request, response, view }) {}

  async store({ request, response }) {}

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  /**
   * Update adminprovider details.
   * PUT or PATCH adminproviders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a adminprovider with id.
   * DELETE adminproviders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = AdminProviderController;
