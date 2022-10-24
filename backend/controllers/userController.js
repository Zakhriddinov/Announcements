const { User } = require("../models/userModels")
const asyncHandler = require("express-async-handler");
const _ = require("lodash")
const Joi = require("joi");
const { hashPassword } = require("../utils/hashedPassword");

// @route   GET /api/users/me
// @desc    get user profile
// @access  Private
const getMe = async (req, res) => {
   try {
      const user = await User.findById(req.params.id).select('-password').populate("posters").orFail();
      return res.send(user)
   } catch (error) {
      throw new Error(error)
   }
}

// @route   PUT /api/users
// @desc    update user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
   try {
      const { error } = validateUpdateUser(req.body)
      if (error) {
         return res.status(400).send(error.details[0].message)
      }
      const user = await User.findById(req.user._id);
      user.name = req.body.name || user.name
      user.lastName = req.body.lastName || user.lastName
      user.email = req.body.email  || user.email
      user.phone = req.body.phone || user.phone
      if (req.body.password !== user.password) {
         user.password = hashPassword(req.body.password)
      }
      await user.save();

      res.json({
         _id: user._id,
         name: user.name,
         lastName: user.lastName,
         email: user.email,
         phone: user.phone
      })
   } catch (error) {
      throw new Error(error)
   }
})

function validateUpdateUser(req) {
   const schema = Joi.object({
      name: Joi.string().min(3).required(50).required(),
      lastName: Joi.string().min(3).max(50).required(),
      password: Joi.string().min(6).max(255).required(),
      phone: Joi.number().min(9).required()
   })
   return schema.validate(req)
}

module.exports = {
   getMe,
   updateUser,
}