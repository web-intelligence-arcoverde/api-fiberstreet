'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Invite extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'InviteHook.sendInvitationEmail')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  provider () {
    return this.belongsTo('App/Models/Provider')
  }
}

module.exports = Invite
