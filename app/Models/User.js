'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  providerJoins () {
    return this.hasMany('App/Models/UserProvider')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  providers () {
    return this.belongsToMany('App/Models/Provider').pivotModel('App/Models/UserProvider')
  }

  async is (expression) {
    const provider = await this.providerJoins()
      .where('provider_id', this.currentProvider)
      .first()

    return provider.is(expression)
  }

  async can (expression) {
    const provider = await this.providerJoins()
      .where('provider_id', this.currentProvider)
      .first()

    return provider.can(expression)
  }

  async scope (required) {
    const provider = await this.providerJoins()
      .where('provider_id', this.currentProvider)
      .first()

    return provider.scope(required)
  }
}

module.exports = User
