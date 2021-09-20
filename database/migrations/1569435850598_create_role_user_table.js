'use strict'

const Schema = use('Schema')

class RoleUserTableSchema extends Schema {
  up () {
    this.create('role_user_provider', table => {
      table.increments()
      table.integer('role_id').unsigned().index()
      table.foreign('role_id').references('id').on('roles').onDelete('cascade')
      table.integer('user_provider_id').unsigned().index()
      table.foreign('user_provider_id').references('id').on('user_providers').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('role_user_provider')
  }
}

module.exports = RoleUserTableSchema
