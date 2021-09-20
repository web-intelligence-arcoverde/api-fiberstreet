'use strict'

const User = use('App/Models/User')
const Kue = use('Kue')
const Job = use('App/Jobs/InvitationEmail')

const InviteHook = exports = module.exports = {}

InviteHook.sendInvitationEmail = async (invite) => {
  const { email } = invite
  const invited = await User.findBy('email', email)

  if (invited) {
    await invited.providers().attach(invite.provider_id)
    // Send an e-mail with the information because the user is now of the new provider
  } else {
    console.log('CRIAR CONTA')
    const user = await invite.user().fetch()
    const provider = await invite.provider().fetch()

    Kue.dispatch(Job.key, { user, provider, email }, { attemps: 3 })
  }
}
