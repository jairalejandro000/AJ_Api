'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTokenSchema extends Schema {
  up () {
    this.create('user_tokens', (table) => {
      table.increments()
      table.string('token', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('user_tokens')
  }
}

module.exports = UserTokenSchema
