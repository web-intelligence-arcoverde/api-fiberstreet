'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FiberFusionSchema extends Schema {
  up () {
    this.create('fiber_fusions', (table) => {
      table.increments()
      table
        .string('name')
        .notNullable()
      table
        .string('sense')
        .notNullable()
      table.string('obs')
      table
        .integer('fiber_in_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('fibers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('fiber_out_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('fibers')
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
    this.drop('fiber_fusions')
  }
}

module.exports = FiberFusionSchema
