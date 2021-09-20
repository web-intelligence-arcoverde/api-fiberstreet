'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RelCableClientSchema extends Schema {
  up () {
    this.create('rel_cable_clients', (table) => {
      table.increments()
      table
        .integer('cable_id')
        .unsigned()
        .notNull()
        .references('id')
        .inTable('cables')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('client_id')
        .unsigned()
        .notNull()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('obs')
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
    this.drop('rel_cable_clients')
  }
}

module.exports = RelCableClientSchema
