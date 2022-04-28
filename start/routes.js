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

Route.get('/', () => {
  return 'Hello world'
})

Route.group(() => {
  Route.get('/show', 'UserController.show')
  Route.get('/showusers', 'UserController.showUsers')
  //Route.put('/update', 'UserController.update')
  //Route.delete('/destroy', 'UserController.destroy')
  Route.get('/verifyToken', 'UserController.verifyToken')
  Route.get('/generateToken', 'UserController.generateToken')
}).prefix('/User').middleware(['auth:jwt'])


Route.group(() => {
  Route.post('/auth1', 'AuthController.auth1')
  Route.post('/auth2', 'AuthController.auth2')
  Route.post('/loginApp', 'AuthController.loginApp')
  Route.post('/loginVPN', 'AuthController.loginVPN')
}).prefix('/Auth')

Route.group(() => {
  Route.get('/showSeries', 'SerieController.showSeries')
  Route.post('/create', 'SerieController.create')
  Route.put('/update/:id', 'SerieController.update')
}).prefix('/Serie').middleware(['auth:jwt'])

Route.get('/get', 'SerieController.getall')

Route.post('User/create', 'UserController.create')