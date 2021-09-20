"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SplitterOutputSchema extends Schema {
  up() {
    this.create("splitter_outputs", table => {
      table.increments();
      table.integer("number").notNullable();
      table
        .integer("splitter_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("splitters")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("client_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("clients")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("cable_id")
        .unsigned()
        // .notNullable()
        .references("id")
        .inTable("cables")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("provider_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("providers")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("splitter_outputs");
  }
}

module.exports = SplitterOutputSchema;
