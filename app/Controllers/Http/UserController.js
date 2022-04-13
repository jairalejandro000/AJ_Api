'use strict'
const { validate } = use('Validator')
const User = use('App/Models/User')

class UserController {

    async create({request, response}) {
        const validation = await validate(request.all(), {
            name: 'required',
            lastname: 'required',
            email: 'required|email',
            password: 'required',
            rol_id: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            try{
                const {name, lastname, email, password, rol_id} = request.all()
                const U = await User.create({name, lastname, email, password, rol_id})
                return response.status(201).json({ message: 'User created succesful'})
            }catch(e){
                return response.status(400).json({ message: 'Check your credentials'})
            }
        }
    }
    async update({ request, response }) {   
        const validation = await validate(request.all(), {
            username: 'required',
            email: 'required|email',
            password: 'required',
            rol: 'required', 
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {username, email, password, rol, code} = request.all()
            const U = await User.findBy('code', code)
            if (U == null){
                return response.status(200).json({message: 'User was not found'})
            }else{
                U.username = username
                U.email = email
                U.password = password
                U.rol = rol
                await U.save()
                return response.json({message: 'User was update', U})
            }
        }
    }
    async destroy({ request, response }){
        const validation = await validate(request.all(), {
            email: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {email} = request.all()
            const U = await User.findBy('email', email)
            await U.delete()
            return response.status(200).json({message: 'User was deleted', U})
        }
    }
    async show({ request, response }) {
        const validation = await validate(request.all(), {
            code: 'required',
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {code} = request.all()
            const U = await User.findBy('code', code)
            return response.status(200).json({ message: 'User was found', U })
        }
    }
    async showUsers({response}){
        const U = await User.all()
        return response.status(200).json({U})
    }
}

module.exports = UserController
