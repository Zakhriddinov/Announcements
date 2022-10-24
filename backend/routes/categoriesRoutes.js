const { Router } = require("express");
const { getCategories, createCategories } = require("../controllers/categoriesController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/fileUpload");
const router = Router();

router.get("/", getCategories)
router.post("/", protect, upload.single('image'), createCategories)
module.exports = router