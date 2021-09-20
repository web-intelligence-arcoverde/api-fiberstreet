'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Role = use('Adonis/Acl/Role')
/**
 * Resourceful controller for interacting with providers
 */
class ProviderController {
  /**
   * Show a list of all providers.
   * GET providers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    const providers = await auth.user.providers().fetch()

    return providers
  }

  /**
   * Create/save a new provider.
   * POST providers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(['name', 'cnpj', 'address'])

    const provider = await auth.user.providers().create({
      ...data,
      user_id: auth.user.id
    })

    const teamsJoins = await auth.user.providerJoins().where('provider_id', provider.id).first()

    const admin = await Role.findBy('slug', 'administrator')

    await teamsJoins.roles().attach([admin.id])

    return provider
  }

  /**
   * Display a single provider.
   * GET providers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, auth }) {
    const provider = await auth.user
      .providers()
      .where('providers.id', params.id)
      .first()

    return provider
  }

  /**
   * Update provider details.
   * PUT or PATCH providers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth }) {
    const data = request.only(['name', 'address', 'cnpj'])

    const provider = await auth.user
      .providers()
      .where('providers.id', params.id)
      .first()

    provider.merge(data)

    await provider.save()

    return provider
  }

  /**
   * Delete a provider with id.
   * DELETE providers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth }) {
    const provider = await auth.user
      .providers()
      .where('providers.id', params.id)
      .first()

    await provider.delete()

    return provider
  }
}

module.exports = ProviderController
