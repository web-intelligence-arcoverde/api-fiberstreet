'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SecretKeySchema extends Schema {
  up () {
    this.create('secret_keys', (table) => {
      table.increments()
      table.string('email')
      table.string('secret')
      table.timestamps()
    })
  }

  down () {
    this.drop('secret_keys')
  }
}

module.exports = SecretKeySchema
