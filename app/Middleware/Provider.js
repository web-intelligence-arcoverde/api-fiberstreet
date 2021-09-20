'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Provider {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    const slug = request.header('PROVIDER')

    let provider = null

    if (slug) {
      provider = await auth.user
        .providers()
        .where('slug', slug)
        .first()
    }

    if (!provider) {
      return response.status(401).send()
    }

    auth.user.currentProvider = provider.id
    request.provider = provider

    await next()
  }
}

module.exports = Provider
