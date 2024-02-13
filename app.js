// production? no dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// app maker
const express = require("express");
// home router
const homeRouter = require("./routers/homeRouter.js");
// error
const Middleware = require("./middleware.js");
// allow all access
const cors = require("cors");

// create app
const app = express();
app.use(cors());

// middlewares
app.use(express.urlencoded({ extended: true })); // req.body
app.use(homeRouter); // enter home router
app.use(Middleware.error); // dump all err here

// export
module.exports = { app };
