"use strict";

const Database = use("Database");

class DropController {
  /**
   * Return cable if exists
   * Are used to verify if can add new drops
   * @param {*} param0
   */
  async show({ request, params }) {
    const existsCable = await request.provider
      .splitterOutputs()
      .where("client_id", params.id)
      .first();

    return existsCable;
  }

  async store({ request }) {
    //const data = request.only(["cable", "fiber", "output"]);

    const data = request.only(["output"]);

    const existsCable = await request.provider
      .splitterOutputs()
      .where("client_id", data.output.client_id)
      .first();

    if (existsCable) {
      return;
    }

    // new version
    const trx = await Database.beginTransaction();
    const outputSplitter = await request.provider
      .splitterOutputs()
      .create({ ...data.output }, trx);

    const { cto_id: ctoId } = await outputSplitter.splitter().first();

    // const relationshipCableCto = await request.provider
    //   .relCableCto()
    //   .create({ cto_id: ctoId }, trx);
    // const relationshipCableClient = await request.provider
    //   .relCableClient()
    //   .create({ client_id: data.output.client_id }, trx);
    trx.commit();

    const allRequest = {
      outputSplitter
    };

    // Old version with creation of cable of client
    // const trx = await Database.beginTransaction()
    // const cable = await request.provider.cables().create(data.cable, trx)
    // const fiber = await cable.fibers().create({ ...data.fiber, provider_id: request.provider.id }, trx)
    // const outputSplitter = await request.provider.splitterOutputs().create({ cable_id: cable.id, ...data.output }, trx)

    // const { cto_id: ctoId } = await outputSplitter.splitter().first()

    // const relationshipCableCto = await request.provider.relCableCto().create({ cto_id: ctoId, cable_id: cable.id }, trx)
    // const relationshipCableClient = await request.provider.relCableClient().create({ cable_id: cable.id, client_id: data.output.client_id }, trx)
    // trx.commit()

    // const allRequest = { cable, fiber, outputSplitter, relationshipCableCto, relationshipCableClient }

    return allRequest;
  }
}

module.exports = DropController;
