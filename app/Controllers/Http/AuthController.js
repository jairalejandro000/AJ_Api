'use strict'
const { validate } = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')
const randomstring = use("randomstring")


class AuthController {
    async Login({response, request}){
        const validation = await validate(request.all(), {
            email: 'required|email',
            password: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {email, password} = request.all()
            const U = await User.findBy('email', email)
            if(U == null){
                return response.status(400).json({message: 'Wrong credentials'})
            }else{
                const isSame = await Hash.verify(password, U.password)
                if (isSame) {
                    const t = await auth.attempt(email, password)
                    const token = t.token
                    const rol = U.rol_id
                    return response.ok({message: 'Successful login', token, rol})
                }else{
                    return response.status(400).json({message: 'Wrong credentials'})
                }
            }
        }
    } 

    async code({request, response, auth}){
        const validation = await validate(request.all(), {
            email: 'required|email',
            password: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {email, password} = request.all()
            const U = await User.findBy('email', email)
            if(U == null){
                return response.status(400).json({message: 'Wrong credentials'})
            }else{
                const isSame = await Hash.verify(password, U.password)
                if (isSame) {
                    const c = randomstring.generate({
                        length: 10})
                    U.code = await Hash.make(c)
                    const code = c
                    U.save();
                    return response.ok({message: 'Successful login', code})
                }else{
                    return response.status(400).json({message: 'Wrong credentials'})
                }
            }
        }
    } 
}

module.exports = AuthController
