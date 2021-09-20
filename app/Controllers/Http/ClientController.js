"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clients
 */
class ClientController {
  /**
   * Show a list of all clients.
   * GET clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const clients = await request.provider.clients().fetch();

    return clients;
  }

  /**
   * Create/save a new client.
   * POST clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      "name",
      "coordinates",
      "cpf",
      "address",
      "speed",
      "pppoe",
      "installation_date",
      "obs",
      "status"
    ]);

    const client = request.provider.clients().create(data);
    return client;
  }

  /**
   * Display a single client.
   * GET clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request }) {
    const client = await request.provider
      .clients()
      .where("id", params.id)
      .first();

    return client;
  }

  /**
   * Update client details.
   * PUT or PATCH clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only([
      "name",
      "coordinates",
      "cpf",
      "address",
      "speed",
      "pppoe",
      "installation_date",
      "obs",
      "status"
    ]);
    const client = await request.provider
      .clients()
      .where("id", params.id)
      .first();

    client.merge(data);
    await client.save();

    return client;
  }

  /**
   * Delete a client with id.
   * DELETE clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request }) {
    const client = await request.provider
      .clients()
      .where("id", params.id)
      .first();

    // Pega o cable e deleta
    const relCableClient = await request.provider
      .relCableClient()
      .where("client_id", client.id)
      .first();

    if (relCableClient) {
      const cable = await request.provider
        .cables()
        .where("id", relCableClient.cable_id)
        .first();

      await cable.delete();
      await client.delete();

      return client;
    }

    await client.delete();

    return client;
  }
}

module.exports = ClientController;
