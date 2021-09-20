'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CableSchema extends Schema {
  up () {
    this.create('cables', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('type', 80).notNullable()
      table.string('lot')
      table.string('manufacturer')
      table.string('sense')
      table.text('coordinates').notNullable()
      table.text('obs')
      table.integer('fiberAmount').notNullable()
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
    this.drop('cables')
  }
}

module.exports = CableSchema
