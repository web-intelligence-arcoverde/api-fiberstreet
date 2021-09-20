"use strict";

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const User = use("App/Models/User");

const Role = use("Adonis/Acl/Role");
const Permission = use("Adonis/Acl/Permission");

class DatabaseSeeder {
  async run() {
    const user = await User.create({
      username: "Kevin Cavalcanti",
      email: "k.w9cavalcanti@gmail.com",
      password: "91507091"
    });

    // Permissions
    const createInvite = await Permission.create({
      slug: "invites_create",
      name: "Convidar membros"
    });

    const createCable = await Permission.create({
      slug: "cable_create",
      name: "Criar cabos"
    });

    const mapModifications = await Permission.create({
      slug: "map-modify",
      name: "MapModify"
    });

    const mapCeoCtoMod = await Permission.create({
      slug: "ceo_cto_mod",
      name: "Ceo and Cto Modification"
    });

    // Roles
    // SuperUserAdmin
    const superUserAdmin = await Role.create({
      slug: "super-user-admin",
      name: "Super User Admin",
      description: "Permissão de desenvolvedor"
    });

    const admin = await Role.create({
      slug: "administrator",
      name: "Administrador"
    });

    const moderator = await Role.create({
      slug: "moderator",
      name: "Moderador"
    });

    const technician = await Role.create({
      slug: "technician",
      name: "Technician"
    });

    // Role without any permission
    await Role.create({
      slug: "visitor",
      name: "Visitante"
    });

    // Adding permissions to roles
    await superUserAdmin
      .permissions()
      .attach([createInvite.id, createCable.id, mapModifications.id]);
    await admin
      .permissions()
      .attach([
        createInvite.id,
        createCable.id,
        mapModifications.id,
        mapCeoCtoMod.id
      ]);
    await moderator.permissions().attach([createCable.id, mapModifications.id]);
    await technician.permissions().attach([technician.id, mapCeoCtoMod.id]);

    const provider = await user.providers().create({
      name: "GZ Net Provider",
      cnpj: "00000000000010003",
      address: "ISP Arcoverde",
      user_id: user.id
    });

    const providerJoin = await user
      .providerJoins()
      .where("provider_id", provider.id)
      .first();

    await providerJoin.roles().attach([admin.id]);
  }
}

module.exports = DatabaseSeeder;
