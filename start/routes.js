'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('/create', 'UserController.create') //Only return the user's code
  Route.get('/show', 'UserController.show') //Return the user's data
  Route.get('/showusers', 'UserController.showUsers') //Return all users data
  Route.put('/update', 'UserController.update') //Update the data
  Route.delete('/destroy', 'UserController.destroy') //Delete the user
}).prefix('/User').middleware(['auth:jwt'])


Route.group(() => {
  Route.post('/auth1', 'AuthController.auth1') //Return token or the code to the secudn auth
  Route.post('/auth2', 'AuthController.auth2') //Return the token
}).prefix('/Auth')
