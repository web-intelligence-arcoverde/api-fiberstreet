'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CtoSchema extends Schema {
  up () {
    this.create('ctos', (table) => {
      table.increments()
      table.string('name').unique().notNullable()
      table.text('coordinates').notNullable()
      table.string('address', 100)
      table.string('model')
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
    this.drop('ctos')
  }
}

module.exports = CtoSchema
