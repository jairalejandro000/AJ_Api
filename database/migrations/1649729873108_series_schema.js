'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeriesSchema extends Schema {
  up () {
    this.create('series', (table) => {
      table.increments()
      table.string('name', 20).notNullable()
      table.string('description', 60).notNullable()
      table.integer('seasons', 2).notNullable()
      table.integer('score', 2).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('series')
  }
}

module.exports = SeriesSchema
