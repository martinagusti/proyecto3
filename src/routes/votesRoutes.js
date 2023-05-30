const express = require("express");
const votesRoutes = express.Router();
const validateAuth = require("../middlewares/validateAuth");
const { controllerVotes, NewVote, newVote } = require("../controllers.js/votes/votesController");

//endpoints publicos
votesRoutes.get('/:id', controllerVotes);

//endpoints privados
votesRoutes.route("/:id").all(validateAuth).post(newVote);

module.exports = {votesRoutes}