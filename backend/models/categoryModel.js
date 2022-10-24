const Joi = require("joi");
const { model, Schema } = require("mongoose");

const categorySchema = Schema({
   name: { type: String, required: true, unique: true },
   description: { type: String, required: true, unique: true },
   image: {
      public_id: String,
      secure_url: String
   }
});
categorySchema.index({ description: 1 });

const Category = model("Category", categorySchema);
function validateCategory(category) {
   const schema = Joi.object({
      name: Joi.string().required().min(3),
      description: Joi.string().min(5).max(255).required()
   }).unknown()
   return schema.validate(category)
}

module.exports = {
   Category,
   validateCategory
}