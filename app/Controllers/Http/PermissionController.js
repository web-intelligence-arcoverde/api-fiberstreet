'use strict'

const UserProvider = use('App/Models/UserProvider')

class PermissionController {
  async show ({ request, auth }) {
    const providerJoin = await UserProvider.query()
      .where('provider_id', request.provider.id)
      .where('user_id', auth.user.id)
      .first()

    return {
      roles: await providerJoin.getRoles(),
      permissions: await providerJoin.getPermissions()
    }
  }
}

module.exports = PermissionController
