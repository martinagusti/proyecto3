const createJsonError = require("../../errors/createJsonError");
const Joi = require("joi");
const throwJsonError = require("../../errors/throwJsonError");
const { findTripsByUserName } = require("../../repositories.js/tripsRepositories");

const schema = Joi.string().min(3).max(100)

const getTripByUserName = async(req, res) => {
    try {
        const {userName} = req.params;

        schema.validateAsync(userName)

        const trips = await findTripsByUserName(userName) 

        if(trips.length === 0){
            throwJsonError(400, "No se han encontrado viajes para este usuario")
        }

        res.status(200)
        res.send(trips)


    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = getTripByUserName;