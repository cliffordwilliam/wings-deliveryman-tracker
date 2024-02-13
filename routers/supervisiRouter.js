// router maker
const express = require("express");
// my controller
const SupervisiController = require("../controllers/supervisiController.js");
// guard
const Middleware = require("../middleware.js");
// my router
const supervisiRouter = express.Router();

// endpoints
supervisiRouter.get("/", SupervisiController.get);
supervisiRouter.put("/", SupervisiController.put);
supervisiRouter.delete("/", SupervisiController.delete);
supervisiRouter.get("/:id", SupervisiController.getId);

// export
module.exports = supervisiRouter;
