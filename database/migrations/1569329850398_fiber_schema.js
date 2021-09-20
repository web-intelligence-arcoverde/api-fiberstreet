'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FiberSchema extends Schema {
  up () {
    this.create('fibers', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.text('obs')
      table.integer('number')
      table
        .integer('cable_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cables')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
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
    this.drop('fibers')
  }
}

module.exports = FiberSchema
