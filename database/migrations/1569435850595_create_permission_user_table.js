'use strict'

const Schema = use('Schema')

class PermissionUserTableSchema extends Schema {
  up () {
    this.create('permission_user_provider', table => {
      table.increments()
      table.integer('permission_id').unsigned().index()
      table.foreign('permission_id').references('id').on('permissions').onDelete('cascade')
      table.integer('user_provider_id').unsigned().index()
      table.foreign('user_provider_id').references('id').on('user_providers').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('permission_user_provider')
  }
}

module.exports = PermissionUserTableSchema
