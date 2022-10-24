const { errorHandler } = require("../middleware/errorMiddleware");
const express = require("express");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");

module.exports = function (app) {
   //body parser
   app.use(express.json());
   app.use(cookieParser())
  

   app.get("/api/logout", (req, res) => {
      return res.clearCookie("access_token").send("access token cleared")
   })

   app.use("/api/posters", require("../routes/posterRoutes"))
   app.use("/api/categories", require("../routes/categoriesRoutes"))
   app.use("/api/users", require("../routes/userRoutes"))
   
   app.use(errorHandler)
}