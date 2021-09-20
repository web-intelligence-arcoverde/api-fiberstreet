'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.string('name').unique().notNullable()
      table.text('coordinates').notNullable()
      table.string('cpf', 20).unsigned().unique()
      table.string('speed')
      table.string('pppoe')
      table.string('address')
      table.string('status')
      table.text('obs')
      table.timestamp('installation_date')
      table
        .integer('provider_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('providers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
