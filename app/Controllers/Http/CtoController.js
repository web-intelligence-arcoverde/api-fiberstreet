'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const RelCableCto = use('App/Models/RelCableCto');
const SplitterOutput = use('App/Models/SplitterOutput');

/**
 * Resourceful controller for interacting with ctos
 */
class CtoController {
  /**
   * Show a list of all ctos.
   * GET ctos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const ctos = await request.provider.ctos().fetch();

    return ctos;
  }

  /**
   * Create/save a new cto.
   * POST ctos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      'name',
      'coordinates',
      'address',
      'model',
      'obs'
    ]);

    const cto = await request.provider.ctos().create(data);

    return cto;
  }

  /**
   * Display a single cto.
   * GET ctos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request }) {
    const cto = await request.provider
      .ctos()
      .where('id', params.id)
      .first();

    return cto;
  }

  /**
   * Update cto details.
   * PUT or PATCH ctos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only([
      'name',
      'coordinates',
      'address',
      'model',
      'obs',
      'status'
    ]);

    const cto = await request.provider
      .ctos()
      .where('id', params.id)
      .first();

    cto.merge(data);
    await cto.save();

    return cto;
  }

  /**
   * Delete a cto with id.
   * DELETE ctos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const cto = await request.provider
      .ctos()
      .where('id', params.id)
      .first();

    const relCableCtoCount = await RelCableCto.query()
      .where('cto_id', cto.id)
      .getCount();

    if (relCableCtoCount > 0) {
      return response.status(400).json({
        error: {
          message:
            'Não foi possível deletar esta cto pois possui cabos atrelados, delete os cabos primeiro'
        }
      });
    }

    const splitter = await request.provider
      .splitters()
      .where('cto_id', params.id)
      .first();

    const splitterOutputsCount = await SplitterOutput.query()
      .where('splitter_id', splitter.id)
      .getCount();

    console.log(splitterOutputsCount);

    if (splitterOutputsCount > 0) {
      return response.status(400).json({
        error: {
          message:
            'Oh fila da pura! Não foi possível deletar esta cto pois poshhsui clientes atrelados, delete os cabos primeiro'
        }
      });
    }

    await cto.delete();

    return cto;
  }
}

module.exports = CtoController;
