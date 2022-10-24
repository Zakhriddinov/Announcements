const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, name, lastName, email, phone) => {
   return jwt.sign(
      { _id, name, lastName, email, phone },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
   )
}
module.exports = generateAuthToken