const Joi = require("joi");
const { Schema, model } = require("mongoose");

const posterSchema = Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true,
      min: 50
   },
   price: {
      type: Number,
      required: true
   },
   region: {
      type: String,
      required: true
   },
   category: {
      type: String,
      required: true
   },
   visits: {
      type: Number,
      default: 1
   },
   status: {
      type: Boolean,
      required: true,
      default: true
   },
   image: {
      public_id: String,
      secure_url: String
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
}, {
   timestamps: true
})

const Poster = model("Poster", posterSchema);
// posterSchema.index({ title: "text", description: "text" })


function validatePosters(poster) {
   const schema = Joi.object({
      title: Joi.string().min(5).max(50).required(),
      description: Joi.string().required().min(50),
      price: Joi.number().required().min(4),
      region: Joi.string().required(),
      category: Joi.string().required(),
      status: Joi.boolean()
   }).unknown()
   return schema.validate(poster)
}

module.exports = {
   Poster,
   validatePosters
}