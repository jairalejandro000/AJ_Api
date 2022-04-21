'use strict'
const { validate } = use('Validator')
const User = use('App/Models/User')
const jwt_decode = use('jwt-decode')
const Hash = use('Hash')
const randomstring = use("randomstring")

class UserController {

    async create({request, response}) {
        const validation = await validate(request.all(), {
            name: 'required',
            lastname: 'required',
            email: 'required|email',
            password: 'required',
            rol: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            try{
                const {name, lastname, email, password, rol} = request.all()
                const U = await User.create({name, lastname, email, password, rol})
                return response.status(201).json({ message: 'User created succesful'})
            }catch(e){
                return response.status(400).json({ message: 'Check your credentials'})
            }
        }
    }
    async verifyToken({request, response}) {
        const auth = request.headers()
        const token = auth.authorization
        if(token){
            const decode = jwt_decode(token);
            const user = await decode.uid
            const U = await User.findBy('id', user)
            if(U == null){
                return response.status(400).json({message: 'Validation error'})
            }else{
                return response.ok({message: 'Validation succesful'})
            }
        }
    }
    async generateToken({request, response}){
        const headers = request.headers()
        const token = headers.authorization
        if(token){
            const decode = jwt_decode(token);
            const user = await decode.uid
            const U = await User.findBy('id', user)
            if(U == null){
                return response.status(400).json({message: 'Validation error'})
            }else{
                if(U.rol == '3'){
                    const t = await randomstring.generate({
                        length: 6})
                    U.token = await Hash.make(t)
                    await U.save()
                    return response.ok({message: 'Validation succesful', token: t})
                }else{
                    return response.status(400).json({message: 'Your rol can not make this'})
                }
            }
        }
    }

  

    /*async update({ request, response }) {   
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
    }*/
    async show({ request, response }) {
        const auth = request.headers()
        const token = auth.authorization
        const decode = jwt_decode(token);
        const user = await decode.uid
        const U = await User.findBy('id', user)
        const fu = await {'fullName': U.name + U.lastname, 'email': U.email, 'rol': U.rol}
        if(U == null){
            return response.status(400).json({message: 'Validation error'})
        }else{
            return response.ok({message: 'User was found', user: fu})
        }
    }
    async showUsers({response}){
        const Users = await User.all()
        return response.status(200).json({Users})
    }
}

module.exports = UserController
