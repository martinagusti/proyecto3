const Joi = require("joi");

const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const { findTrips, findTripsOrderByVotes } = require("../../repositories.js/tripsRepositories");


const schema = Joi.string().min(2).max(50);

const getTrips = async (req, res) => {
  try {
        const {query} = req
        const {category, city, orderby} = query

        const data = {category, city}
        await schema.validateAsync(category, city, orderby)

      
        if(!orderby){
          const [trips, sql] = await findTrips(query);
          

          if (trips.length === 0) {
            throwJsonError(400, `No se han encontrado viajes por en la base de datos`)
          }
          
          res.status(200)
          res.send(trips)
        

        }else{
         
          const tripsOrdered = await findTripsOrderByVotes(query);
          console.log(tripsOrdered)
          if (tripsOrdered.length === 0) {
            throwJsonError(400, `No se han encontrado viajes por en la base de datos`)
          }

          res.status(200)
          res.send(tripsOrdered)
        }

       
  } catch (error) {
    
    createJsonError(error, res)
    
  }
}
module.exports = getTrips;

