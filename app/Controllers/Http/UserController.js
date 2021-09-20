'use strict'

const User = use('App/Models/User')
const Invite = use('App/Models/Invite')

class UserController {
  async store ({ request, response, auth }) {
    const data = request.only(['username', 'email', 'password'])

    const providersQuery = Invite.query()
      .where('email', data.email)
    const providers = await providersQuery.pluck('provider_id')

    if (providers.length === 0) {
      return response.status(401).send({ error: { message: "You're not invited" } })
    }

    const user = await User.create(data)

    await user.providers().attach(providers)

    await providersQuery.delete()

    const token = await auth.attempt(data.email, data.password)

    return token
  }

  async index ({ params, request, response, auth }) {
    try {
      // const users = User.all()
      return response.send(auth.user.id)
      // return user
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Fail' } })
    }
  }
}

module.exports = UserController
