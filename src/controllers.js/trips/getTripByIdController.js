const createJsonError = require("../../errors/createJsonError")
const Joi = require("joi");
const { findTripById } = require("../../repositories.js/tripsRepositories");
const throwJsonError = require("../../errors/throwJsonError");


const schema = Joi.number().positive().integer()

const getTripById = async(req, res) => {
    try {
        
        const { id } = req.params;
        await schema.validateAsync(id);

        const trip = await findTripById(id);
        if(trip.IdUser > 0){
            res.status(200)
            res.send(trip)
        }else{
            res.send([])
        }


       
    } catch (error) {
        createJsonError(error, res)
    }
}
module.exports = getTripById