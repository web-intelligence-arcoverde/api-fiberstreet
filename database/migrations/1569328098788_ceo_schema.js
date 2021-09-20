'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CeoSchema extends Schema {
  up () {
    this.create('ceos', (table) => {
      table.increments()
      table.string('name').unique().notNullable()
      table.text('coordinates').notNullable()
      table.string('address')
      table.string('model')
      table.string('type')
      table.text('obs')
      table.string('status')
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
    this.drop('ceos')
  }
}

module.exports = CeoSchema
