// router maker
const express = require("express");
// guard
const Middleware = require("../middleware.js");
// bypass branch controller
const SupervisiController = require("../controllers/supervisiController.js");
const DeliverymanController = require("../controllers/deliverymanController.js");
// my router
const homeRouter = express.Router();
// child
const supervisiRouter = require("./supervisiRouter.js");
const deliverymanRouter = require("./deliverymanRouter.js");

// free
homeRouter.post("/supervisi", SupervisiController.post);
homeRouter.post("/supervisi/login", SupervisiController.login);
homeRouter.post("/deliveryman/login", DeliverymanController.login);
// token
homeRouter.use(Middleware.tokenGuard);
homeRouter.use("/supervisi", supervisiRouter);
homeRouter.use("/deliveryman", deliverymanRouter);

// export
module.exports = homeRouter;
