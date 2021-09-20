'use strict'

const UserProvider = use('App/Models/UserProvider')

class MemberController {
  async index ({ request }) {
    const members = await UserProvider.query()
      .where('provider_id', request.provider.id)
      .with('user')
      .with('roles')
      .fetch()

    return members
  }

  async update ({ request, params, auth }) {
    const roles = request.input('roles')

    const teamJoin = await UserProvider.find(params.id)

    const count = await teamJoin.roles().count()

    await teamJoin.roles().sync(roles)
  }
}

module.exports = MemberController
