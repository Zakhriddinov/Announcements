const Joi = require("joi");
const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = Schema({
   name: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   phone: {
      type: Number,
      required: true,
      unique: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   posters: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Poster'
      }
   ]
}, {
   timestamps: true
})

userSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '24h'
   })
   return token;
}

function validateUser(user) {
   const schema = Joi.object({
      name: Joi.string().min(3).required(50).required(),
      lastName: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(5).max(255).required(),
      password: Joi.string().min(6).max(255).required(),
      phone: Joi.number().min(9).required()
   })
   return schema.validate(user)
}

const User = model("User", userSchema);
module.exports = {
   User, validateUser
}