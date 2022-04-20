'use strict'
const Database = use('Database')
const Hash = use('Hash')

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    const User = await Database.table('users')
    await User.create([
      {
        name: 'Jair Alejandro',
        lastname: 'Martinez Carrillo',
        email: 'jairalejandro32@outlook.com',
        password: await Hash.make('1234')
      }
    ])
  }
}

module.exports = UserSeeder
