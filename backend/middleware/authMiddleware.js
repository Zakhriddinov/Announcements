const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
   try {
      const token = req.cookies.access_token

      if (!token) {
         return res.status(403).send("A token is required authentication")
      }
      try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
         req.user = decoded
         next()
      } catch (error) {
         return res.status(401).send("Unauthorized. Invalid Token")
      }
   } catch (error) {
      next(error)
   }
})
module.exports = { protect }