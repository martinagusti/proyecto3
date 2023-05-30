const express = require("express");
const createTrip = require("../controllers.js/trips/createTripController");
const tripsRoutes = express.Router();
const validateAuth = require("../middlewares/validateAuth");
const updateTripImage = require("../controllers.js/trips/updateTripImageController");
const { deleteTripController } = require("../controllers.js/trips/deleteTripController");
const getTrips = require("../controllers.js/trips/tripsController");
const getTripById = require("../controllers.js/trips/getTripByIdController");
const getTripByUserName = require("../controllers.js/trips/getTripsByUserNameController");



//endpoints publicos
tripsRoutes.get('/', getTrips);
tripsRoutes.get('/:id', getTripById);
tripsRoutes.get('/userName/:userName', getTripByUserName);



//endpoints privados
tripsRoutes.route("/").all(validateAuth).post(createTrip);
tripsRoutes.route("/upload/:id").all(validateAuth).patch(updateTripImage);
tripsRoutes.route("/:id").all(validateAuth).delete(deleteTripController);


module.exports = {
    tripsRoutes
}