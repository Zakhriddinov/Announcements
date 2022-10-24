const { Category, validateCategory } = require("../models/categoryModel")
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary")

const getCategories = asyncHandler(async (req, res) => {
   try {
      const categories = await Category.find({}).sort({ name: "asc" }).lean()
      if (!categories) {
         res.status(404)
         throw new Error("Berilgan IDga teng bo'lmagan toifa topilmadi")
      }
      return res.status(200).json(categories)
   } catch (error) {
      throw new Error(error)
   }
})
const createCategories = asyncHandler(async (req, res) => {
   try {
      const { error } = validateCategory(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message);
      }
      const { name, description } = req.body

      const category = new Category({
         name, description
      })

      const result = await cloudinary.uploader.upload(req.file.path)
      category.image = {
         public_id: result.public_id,
         secure_url: result.secure_url
      }

      const categories = await category.save();
      res.status(201).send(categories)
   } catch (error) {
      throw new Error(error)
   }
})

module.exports = {
   getCategories,
   createCategories
}