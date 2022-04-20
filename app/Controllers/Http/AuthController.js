'use strict'
const { validate } = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')
const randomstring = use("randomstring")


class AuthController {
    async auth2({request, response, auth}){
        const validation = await validate(request.all(), {
            email: 'required|email',
            password: 'required',
            code: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {email, password, code} = request.all()
            const U = await User.findBy('email', email)
            if(U == null){
                return response.status(400).json({message: 'Wrong credentials'})
            }else{
                const isCodeSame = await Hash.verify(code, U.code)
                if (isCodeSame) {
                    const t = await auth.attempt(email, password)
                    const isPasswordSame = await Hash.verify(password, U.password)
                    if (isPasswordSame){
                        const token = t.token
                        const rol = U.rol_id
                        return response.ok({message: 'Successful login', token, token, rol})
                    }else{
                        return response.status(400).json({message: 'Wrong credentials'})
                    }
                }else{
                    return response.status(400).json({message: 'Wrong credentials'})
                }
            }
        }
    }
    async auth1({request, response, auth}){
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
                    if(U.rol != "1"){
                        const c = randomstring.generate({
                            length: 4})
                        U.code = await Hash.make(c)
                        const code = c
                        const rol = U.rol
                        U.save();
                        return response.ok({message: 'Successful login', code})
                    }else{
                        const t = await auth.attempt(email, password)
                        const token = t.token
                        const rol = U.rol
                        return response.ok({message: 'Successful login', token, token})
                    }
                }else{
                    return response.status(400).json({message: 'Wrong credentials'})
                }
            }
        }
    }
    async loginApp({request, response, auth}){
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
                    if(U.rol == "3"){
                        const t = await auth.attempt(email, password)
                        const token = t.token
                        return response.ok({message: 'Successful login', token, token})
                    }else{
                        return response.status(400).json({message: 'failed to login'})
                    }
                }else{
                    return response.status(400).json({message: 'Failed to login'})
                }
            }
        }
    } 
}

module.exports = AuthController
