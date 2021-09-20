'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RelCableCtoSchema extends Schema {
  up () {
    this.create('rel_cable_ctos', (table) => {
      table.increments()
      table
        .integer('cto_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ctos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('cable_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cables')
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
    this.drop('rel_cable_ctos')
  }
}

module.exports = RelCableCtoSchema
