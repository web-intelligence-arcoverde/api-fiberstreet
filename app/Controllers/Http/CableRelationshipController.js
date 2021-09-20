'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')

class CableRelationshipController {
  /**
   * Este método salva uma relação de um cabo saindo de uma cto para outra cto
   * Ou de Cto para ceo e assim por diante
   * @param {*} param0
   */
  async store ({ request, response, auth }) {
    const data = request.only([
      'typeOne',
      'typeTwo',
      'relationOne',
      'relationTwo',
      'cable'
    ])

    const newCableData = request.only(['objectId', 'objectType'])

    if (newCableData.objectId) {
      const trx = await Database.beginTransaction()
      const cable = await request.provider
        .cables()
        .create(data.cable, trx)
      if (newCableData.objectType === 'CTO') {
        const relCableCto = await request.provider
          .relCableCto()
          .create({ cto_id: newCableData.objectId, cable_id: cable.id }, trx)
        await trx.commit()
        return relCableCto
      } else if (newCableData.objectType === 'CEO') {
        const relCableCeo = await request.provider
          .relCableCeo()
          .create({ ceo_id: newCableData.objectId, cable_id: cable.id }, trx)
        await trx.commit()
        return relCableCeo
      }
    }

    // return data
    const trx = await Database.beginTransaction()

    if (data.typeOne === 'cto') {
      // CTO P CTO
      if (data.typeTwo === 'cto') {
        const { relationOne, relationTwo } = data
        const cable = await request.provider.cables().create(data.cable, trx)

        const relOne = await request.provider
          .relCableCto()
          .create({ ...relationOne, cable_id: cable.id }, trx)

        const relTwo = await request.provider
          .relCableCto()
          .create({ ...relationTwo, cable_id: cable.id }, trx)

        await trx.commit()
        return response.status(201).json({
          success: true,
          content: {
            relCableCto: relOne,
            relCableCto2: relTwo,
            cable
          }
        })
      } else {
        const { relationOne, relationTwo } = data

        const cable = await request.provider.cables().create(data.cable, trx)

        const relOne = await request.provider
          .relCableCto()
          .create({ ...relationOne, cable_id: cable.id }, trx)

        const relTwo = await request.provider
          .relCableCeo()
          .create({ ...relationTwo, cable_id: cable.id }, trx)

        await trx.commit()
        return response.status(201).json({
          success: true,
          content: {
            relCableCto: relOne,
            relCableCeo: relTwo,
            cable
          }
        })
      }
    } else {
      // CEO p CEO
      if (data.typeTwo === 'ceo') {
        const { relationOne, relationTwo } = data

        const cable = await request.provider.cables().create(data.cable, trx)

        const relOne = await request.provider
          .relCableCeo()
          .create({ ...relationOne, cable_id: cable.id }, trx)

        const relTwo = await request.provider
          .relCableCeo()
          .create({ ...relationTwo, cable_id: cable.id }, trx)
        await trx.commit()
        return response.status(201).json({
          success: true,
          content: {
            relCableCeo: relOne,
            relCableCeo2: relTwo,
            cable
          }
        })
      } else {
        const { relationOne, relationTwo } = data

        const cable = await request.provider.cables().create(data.cable, trx)

        const relCableCeo = await request.provider
          .relCableCeo()
          .create({ ...relationOne, cable_id: cable.id }, trx)
        const relCableCto = await request.provider
          .relCableCto()
          .create({ ...relationTwo, cable_id: cable.id }, trx)

        await trx.commit()
        return response.status(201).json({
          success: true,
          content: {
            relCableCeo,
            relCableCto,
            cable
          }
        })
        // CEO p CTO
      }
    }
  }

  /**
   * Update a relationship of a cable
   * @param {*} param0
   */
  async update ({ request, params, response }) {
    // Veriify to relationship with any layer
    const cableId = params.id
    const data = request.only(['objectId', 'objectType'])
    const coordinates = request.input('coordinates')

    const trx = await Database.beginTransaction()

    const cable = await request.provider
      .cables()
      .where('id', cableId)
      .first()

    if (data.objectType === 'CTO') {
      // CREATE Relationship of cable with Cto
      const existsRelCableCto = await request.provider
        .relCableCto()
        .where('cto_id', data.objectId)
        .where('cable_id', cableId)
        .first()

      if (existsRelCableCto) {
        return response.status(400).send({ error: 'Já existe uma relação ' })
      }

      const relCableCto = await request.provider
        .relCableCto()
        .create({ cto_id: data.objectId, cable_id: cableId }, trx)
      if (coordinates) {
        cable.merge({ coordinates }, trx)
        await cable.save()
      }
      await trx.commit()

      return { relation: relCableCto, type: 'cto', cable }
    } else if (data.objectType === 'CEO') {
      const existsRelCableCeo = await request.provider
        .relCableCeo()
        .where('ceo_id', data.objectId)
        .where('cable_id', cableId)
        .first()

      if (existsRelCableCeo) {
        return response.status(400).send({ error: 'Já existe uma relação ' })
      }

      const relCableCeo = await request.provider
        .relCableCeo()
        .create({ ceo_id: data.objectId, cable_id: cableId }, trx)

      if (coordinates) {
        cable.merge({ coordinates }, trx)
        await cable.save()
      }
      await trx.commit()

      return { relation: relCableCeo, type: 'ceo', cable }
    }
  }

  async destroy ({ request, params }) {
    const objectType = params.objectType

    if (objectType === 'CTO') {
      const relationship = await request.provider
        .relCableCto()
        .where('id', params.id)
        .first()

      await relationship.delete()
      return relationship
    } else if (objectType === 'CEO') {
      const relationship = await request.provider
        .relCableCeo()
        .where('id', params.id)
        .first()

      await relationship.delete()
      return relationship
    }
  }
}

module.exports = CableRelationshipController
