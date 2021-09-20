'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SplitterSchema extends Schema {
  up () {
    this.create('splitters', (table) => {
      table.increments()
      table
        .string('name')
        .notNullable()
      table
        .string('model')
        .notNullable()
      table
        .integer('balancing')
        .notNullable()
      table
        .integer('cto_id')
        .unsigned()
        .references('id')
        .inTable('ctos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('ceo_id')
        .unsigned()
        .references('id')
        .inTable('ceos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('fiber_in_id')
        .unsigned()
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
      table
        .integer('primary_splitter')
        .unsigned()
        .references('id')
        .inTable('splitters')
        .onUpdate('SET NULL')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('splitters')
  }
}

module.exports = SplitterSchema
