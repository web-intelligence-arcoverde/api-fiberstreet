"use strict";

const Database = use("Database");
const User = use("App/Models/User");
const SecretKey = use("App/Models/SecretKey");

class ProviderUserController {
  async store({ request, response, auth }) {
    const userData = request.only(["username", "email", "password"]);
    const providerData = request.only(["name", "address", "cnpj"]);
    const secret = request.input("secret");

    const existsUser = await User.findBy("email", userData.email);

    if (existsUser) {
      return response
        .status(400)
        .json({ error: { message: "Already exists this email" } });
    }

    const canCreateProvider = await SecretKey.findBy("email", userData.email);

    if (!canCreateProvider) {
      return response.status(400).json({
        error: {
          message: "This user cannot create any provider because isnt invited"
        }
      });
    }
    // Verifica a secret
    if (!(canCreateProvider.secret === secret)) {
      return response
        .status(400)
        .json({ error: { message: "The secret key is not valid" } });
    }
    // Aqui fora verificado se já pode criar o provedor
    // Se for possível o obj canCreateProvider virá com informações do SecretKey

    const trx = await Database.beginTransaction();
    const user = await User.create({
      username: userData.username,
      email: userData.email,
      password: userData.password
    }); //, trx)

    const provider = await user.providers().create({
      name: providerData.name,
      cnpj: providerData.cnpj,
      address: providerData.address,
      user_id: user.id
      // user_id: user.id
    }); //, trx)
    trx.commit();
    // return { userData, providerData, canCreateProvider, user, provider }
    // Testando com os dados abaixo
    const providerJoin = await user
      .providerJoins()
      .where("provider_id", provider.id)
      .first();
    await providerJoin.roles().attach([1, 2]);

    const token = await auth.attempt(userData.email, userData.password);

    return token;
    // const providerJoin = await user.providerJoins().where('provider_id', provider.id).first()
    // await providerJoin.roles().attach(2)

    // const token = await auth.attempt(userData.email, userData.password)
  }
}

module.exports = ProviderUserController;
