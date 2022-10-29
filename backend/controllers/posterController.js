const { Poster, validatePosters } = require("../models/posterModels")
const asyncHandler = require("express-async-handler");
const recordsPerPage = require("../config/pagination");
const { User } = require("../models/userModels");
const cloudinary = require("../utils/cloudinary")

// @route   GET /api/posters
// @desc    Get all posters
// @access  Public
const getAllPoster = asyncHandler(async (req, res) => {
   try {
      let query = {};
      let queryCondition = false;
      const { category, region, to, from } = req.query;

      let priceQueryCondition = {};
      if (from || to) {
         queryCondition = true;
         if (from && to) {
            priceQueryCondition = { price: { $gte: from, $lte: to } }
         } else if (from) {
            priceQueryCondition = { price: { $gte: from } }
         } else if (to) [
            priceQueryCondition = { price: { $lte: to } }
         ]
      }

      let regionQueryCondition = {};
      if (region) {
         queryCondition = true;
         regionQueryCondition = { region }
      }

      const searchQuery = req.params.searchQuery || ""
      let searchQueryCondition = {};
      if (searchQuery) {
         queryCondition = true;
         searchQueryCondition = {
            title: {
               $regex: searchQuery,
               $options: 'i'
            }
         };
      }

      let categoryQueryCondition = {};
      const categoryName = req.params.categoryName || ""
      if (categoryName) {
         queryCondition = true
         let a = categoryName.replace(",", "/")
         var regEx = new RegExp("^" + a);
         categoryQueryCondition = { category: regEx }
      }
      if (category) {
         queryCondition = true;
         categoryQueryCondition = { category };
      }



      if (queryCondition) {
         query = {
            $and: [
               searchQueryCondition,
               priceQueryCondition,
               regionQueryCondition,
               categoryQueryCondition
            ]
         }
      }

      // pagination
      const pageNum = Number(req.query.pageNum) || 1;
      const totalPosters = await Poster.countDocuments(query)
      const posters = await Poster
         .find(query)
         .skip(recordsPerPage * (pageNum - 1))
         .limit(recordsPerPage)
         .lean()
      return res.status(200).json({
         posters,
         pageNum,
         paginationLinksNumber: Math.ceil(totalPosters / recordsPerPage)
      })
   } catch (error) {
      throw new Error(error)
   }
})

// @route   GET /api/posters
// @desc    Get home posters
// @access  Public
const getNewPosters = asyncHandler(async (req, res) => {
   try {
      const poster = await Poster
         .find()
         .limit(8)
         .lean()

      if (!poster) {
         res.status(404)
         throw new Error("Poster mavjud emas!")
      }
      res.status(200).json(poster)
   } catch (error) {
      throw new Error(error)
   }
})
// @route   POST /api/posters
// @desc    create new post
// @access  Private
const createPoster = asyncHandler(async (req, res) => {
   try {
      const { title, description, price, region, category } = req.body
      const { error } = validatePosters(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message);
      }

      const user = await User.findById(req.user._id)

      if (!user) {
         res.status(401)
         throw new Error("User not found")
      }
      const result = await cloudinary.uploader.upload(req.file.path)

      const poster = new Poster({
         title,
         description,
         price,
         region,
         category,
         image: {
            public_id: result.public_id,
            secure_url: result.secure_url
         },
         user: user._id
      });

      await User.findByIdAndUpdate(req.user._id,
         { $push: { posters: poster._id } },
         { new: true, upsert: true })

      const posters = await poster.save();
      res.status(201).send(posters)
   } catch (error) {
      console.log(error);
   }
})


// @route   PUT /api/posters/:id
// @desc    edit poster id
// @access  Private
const updatePoster = asyncHandler(async (req, res) => {
   try {
      const { title, description, price, region, category } = req.body
      const { error } = validatePosters(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message);
      }
      let poster = await Poster.findById(req.params.id)

      // Delete image from cloudinary
      await cloudinary.uploader.destroy(poster.image.public_id);
      // Upload image to cloudinary
      let result;
      if (req.file) {
         result = await cloudinary.uploader.upload(req.file.path);
      }
      const data = {
         title: title || poster.title,
         description: description || poster.description,
         region: region || poster.region,
         price: price || poster.price,
         category: category || poster.category,
         image: {
            public_id: result?.public_id || poster.image.public_id,
            secure_url: result?.secure_url || poster.image.secure_url
         }
      }


      poster = await Poster.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json(poster)
   } catch (error) {
      throw new Error(error)
   }
})

// @route   DELETE /api/posters/:id
// @desc    delete posterts id
// @access  Private
const deletePoster = asyncHandler(async (req, res) => {
   try {
      let poster = await Poster.findByIdAndRemove(req.params.id).lean();
      if (!poster) {
         return res.status(404).send("Berilgan IDga teng bo'lmagan toifa")
      }
      await cloudinary.uploader.destroy(poster.image.public_id)

      await User.findByIdAndUpdate(req.user._id,
         { $pull: { posters: poster._id } },
         { new: true, upsert: true })
      res.status(200).json({ success: true })
   } catch (error) {
      throw new Error(error)
   }
})

// @route   GET /api/posters/:id
// @desc    Get one poster
// @access  Public
const getPosterById = asyncHandler(async (req, res) => {
   try {
      const poster = await Poster
         .findByIdAndUpdate(req.params.id, { $inc: { visits: 1 } }, { new: true }).populate("user", "-password")
         .lean()

      if (!poster) {
         res.status(404)
         throw new Error("Berilgan IDga teng bo'lmagan toifa topilmadi")
      }
      res.status(200).json(poster)
   } catch (error) {
      throw new Error(error)
   }
})

module.exports = {
   getAllPoster,
   createPoster,
   deletePoster,
   updatePoster,
   getPosterById,
   getNewPosters
}