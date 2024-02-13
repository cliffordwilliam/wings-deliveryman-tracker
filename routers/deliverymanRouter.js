// router maker
const express = require("express");
// my controller
const DeliverymanController = require("../controllers/deliverymanController.js");
// guard
const Middleware = require("../middleware.js");
// my router
const deliverymanRouter = express.Router();

// endpoints
deliverymanRouter.post("/", DeliverymanController.post);
deliverymanRouter.get("/", DeliverymanController.get);
deliverymanRouter.put("/arrived/:id", DeliverymanController.putArrived);
deliverymanRouter.put("/:id", DeliverymanController.put);
deliverymanRouter.delete("/:id", DeliverymanController.delete);
deliverymanRouter.get("/:id", DeliverymanController.getId);

// export
module.exports = deliverymanRouter;
