'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
      table.string('lastname', 50).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('code', 254)
      table.string('password', 60).notNullable()
      table.string('rol', 1)
      table.string('token', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
