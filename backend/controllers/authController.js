const { User, validateUser } = require("../models/userModels")
const asyncHandler = require("express-async-handler");
const _ = require("lodash")
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { hashPassword, comparePasswords } = require("../utils/hashedPassword");
const generateAuthToken = require("../utils/generateAuthToken");

// @route   POST /api/users
// @desc    create new user
// @access  Public
const createUser = asyncHandler(async (req, res) => {
   try {
      const { name, lastName, email, password, phone } = req.body
      const { error } = validateUser(req.body)
      if (error)
         return res.status(400).send(error.details[0].message);

      const userExists = await User.findOne({ email });
      if (userExists) {
         return res.status(400).send("Bunday foydalanuvchi mavjud")
      } else {
         const hashedPassword = hashPassword(password)
         const user = await User.create({
            name,
            lastName,
            email: email.toLowerCase(),
            phone,
            password: hashedPassword
         })
         res
            .cookie("access_token", generateAuthToken(user._id, user.name, user.lastName, user.email, user.phone), {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'strict'
            })
            .status(201)
            .json({
               _id: user._id,
               name: user.name,
               lastName: user.lastName,
               email: user.email,
               phone: user.phone
            })
      }
   } catch (error) {
      throw new Error(error)
   }
})

// @route   POST /api/users/login
// @desc    create new user
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
   try {
      const { error } = validate(req.body);
      if (error)
         return res.status(400).send(error.details[0].message);
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (user && comparePasswords(password, user.password)) {
         let cookieParams = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
         }
         return res.cookie("access_token", generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.phone
         ))
            .json({
               _id: user._id,
               name: user.name,
               lastName: user.lastName,
               email: user.email,
               phone: user.phone
            })
      } else {
         return res.status(401).send("wrong creadentials")
      }
   } catch (error) {
      throw new Error(error)
   }
})


function validate(req) {
   const schema = Joi.object({
      email: Joi.string().min(5).max(255).required(),
      password: Joi.string().min(6).max(255).required()
   })
   return schema.validate(req)
}

module.exports = {
   createUser,
   loginUser,
}