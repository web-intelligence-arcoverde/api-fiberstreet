"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const RelCableCeo = use("App/Models/RelCableCeo");

/**
 * Resourceful controller for interacting with ceos
 */
class CeoController {
  /**
   * Show a list of all ceos.
   * GET ceos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const ceos = await request.provider.ceos().fetch();

    return ceos;
  }

  /**
   * Create/save a new ceo.
   * POST ceos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only([
      "coordinates",
      "address",
      "model",
      "type",
      "name",
      "obs"
    ]);

    const ceo = await request.provider.ceos().create(data);

    return ceo;
  }

  /**
   * Display a single ceo.
   * GET ceos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request }) {
    const ceo = await request.provider
      .ceos()
      .where("id", params.id)
      .first();

    return ceo;
  }

  /**
   * Update ceo details.
   * PUT or PATCH ceos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const data = request.only([
      "coordinates",
      "address",
      "model",
      "type",
      "obs",
      "name"
    ]);

    const ceo = await request.provider
      .ceos()
      .where("id", params.id)
      .first();
    ceo.merge(data);

    await ceo.save();

    return ceo;
  }

  /**
   * Delete a ceo with id.
   * DELETE ceos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const ceo = await request.provider
      .ceos()
      .where("id", params.id)
      .first();

    /*const relCableCeo = await request.provider
      .relCableCeo()
      .where("ceo_id", ceo.id)
      .fetch();
    if (relCableCeo) {
      return response
        .status(400)
        .json({
          error: {
            message:
              "Não foi possível deletar esta cto pois possui cabos atrelados, delete os cabos primeiro"
          }
        });
    }
    */
    const relCableCeoCount = await RelCableCeo.query()
      .where("ceo_id", ceo.id)
      .getCount();

    if (relCableCeoCount > 0) {
      return response
        .status(400)
        .json({
          error: {
            message:
              "Não foi possível deletar esta ceo pois possui cabos atrelados, delete os cabos primeiro"
          }
        });
    }

    await ceo.delete();

    return ceo;
  }
}

module.exports = CeoController;
