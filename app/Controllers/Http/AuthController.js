'use strict'
const { validate } = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {
    async Login({response, request}){
        
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
                    const user = await auth.attempt(email, password)
                    const token = user.token
                    return response.ok({message: 'Successful login', token})
                }else{
                    return response.status(400).json({message: 'Wrong credentials'})
                }
            }
        }
    }
}

module.exports = AuthController
