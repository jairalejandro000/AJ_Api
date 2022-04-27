'use strict'
const { validate } = use('Validator')
const Serie = use('App/Models/Serie')
const User = use('App/Models/User')
const jwt_decode = use('jwt-decode')
const Hash = use('Hash')
const Database = use('Database')
const query = Database.table('users')

class SerieController {
    async create({request, response}){
        const auth = request.headers()
        const t = auth.authorization
        const validation = await validate(request.all(), {
            name: 'required',
            description: 'required',
            seasons: 'required',
            score: 'required',
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            const {name, description, seasons, score, token} = request.all()
            if(token){
                const decode = jwt_decode(t);
                const user = await decode.uid
                const U = await User.findBy('id', user)
                if(U != null){
                    if(U.rol == '3'){
                        await Serie.create({name, description, seasons, score})
                        return response.status(201).json({ message: 'Serie created succesful'})
                    }else{
                        const tt = await Hash.make(token)
                        const UC = await User.all()
                        
                        return response.status(201).json({ message: 'Serie created succesful', UC})
                        //await Serie.create({name, description, seasons, score})
                    }
                }else{
                    return response.status(400).json({ message: 'Serie could not be created'})
                    }
                }else{
                    return response.status(400).json({ message: 'You need a token'})
                }
        }
    }
    async showSeries({response}){
        const Series = await Serie.all()
        return response.status(200).json({Series})
    }
}

module.exports = SerieController
