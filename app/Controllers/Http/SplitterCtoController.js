'use strict'

class SplitterCtoController {
  async store ({ request, params }) {
    const data = request.only(['name', 'model', 'balancing'])
    const { id } = request.all()

    // const splitter = await request.provider().splitters().create(data),
    const [splitter, cto] = await Promise.all([
      request.provider.splitters().create(data),
      request.provider.ctos().where('id', id).first()
    ])

    await splitter.cto().attach([cto.id])

    // const ctoJoins = await cto.splitters().query().where('cto_id', cto.id).first()
    // await ctoJoins.attatch([cto.id])

    return splitter
  }

  async show ({ request, params }) {
    const splitters = await request.provider
      .splitters()
      .where('cto_id', params.id)
      .fetch()

    return splitters
  }
}

module.exports = SplitterCtoController
