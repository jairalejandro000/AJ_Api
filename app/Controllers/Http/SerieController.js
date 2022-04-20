'use strict'
const { validate } = use('Validator')
const Serie = use('App/Models/Serie')

class SerieController {
    async create({request, response}){
        const validation = await validate(request.all(), {
            name: 'required',
            description: 'required',
            seasons: 'required',
            score: 'required'
        })
        if (validation.fails()){
            return response.status(400).json({ message: 'Validation error'})
        }else {
            try{
                const {name, description, seasons, score} = request.all()
                const S = await Serie.create({name, description, seasons, score})
                return response.status(201).json({ message: 'Serie created succesful'})
            }catch(e){
                return response.status(400).json({ message: 'Check your credentials'})
            }
        }
    }
    async showSeries({response}){
        const Series = await Serie.all()
        return response.status(200).json({Series})
    }
}

module.exports = SerieController
