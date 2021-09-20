'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RelCableCeoSchema extends Schema {
  up () {
    this.create('rel_cable_ceos', (table) => {
      table.increments()
      table
        .integer('ceo_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ceos')
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
    this.drop('rel_cable_ceos')
  }
}

module.exports = RelCableCeoSchema
