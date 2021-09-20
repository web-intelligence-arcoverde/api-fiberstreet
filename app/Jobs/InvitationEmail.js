"use strict";

const Mail = use("Mail");

class InvitationEmail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return "InvitationEmail-job";
  }

  async handle({ user, provider, email }) {
    await Mail.send(
      ["emails.invitation"],
      {
        provider: provider.name,
        user: user.username,
        link: "https://fiber-street.web.app/signup",
        secret: ""
      },
      message => {
        message
          .to(email)
          .from("sistemas.gznet@gmail.com", "Kevin | GZ Net")
          .subject(`Convite para o provedor ${provider.name}`);
      }
    );
  }
}

module.exports = InvitationEmail;
