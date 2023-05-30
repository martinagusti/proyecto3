const createJsonError = require("../../errors/createJsonError")
const throwJsonError = require("../../errors/throwJsonError")
const { findFavouritesTrips } = require("../../repositories.js/favouritesRepository")



const getFavourites = async (req, res) => {
    try {
        const {id} = req.auth
       


        const trips = await findFavouritesTrips(id)
        
        if(trips.length === 0){
            throwJsonError(400, "Aun no tienes viajes favoritos guardados")
        }

        const ubicacion = {
            lat: req.body.lat,
            lng: req.body.long
        }
        
        const getDistance = (lat1, lon1, lat2, lon2) => {
        
            let r = 6371;
            let dLat = deg2rad(lat2-lat1);
            let dLon = deg2rad(lon2-lon1);
        
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
        
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
            var d = r * c;
            return d;
        
        }
        
        function deg2rad(n){
          return n * (Math.PI/180);
        }
        
        
        
        const nuevoArray =  trips.map((element)=>{
          const distancia = getDistance(element.latitude, element.longitude, ubicacion.lat, ubicacion.lng )
          element.distance = Math.round(distancia)
          
          return element
          
        })
        
    

        res.status(200)
        res.send(nuevoArray)
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = getFavourites;