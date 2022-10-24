const { Router } = require("express");
const { getAllPoster, createPoster, deletePoster, updatePoster, getPosterById, getNewPosters } = require("../controllers/posterController");
const { protect } = require("../middleware/authMiddleware");
const router = Router();
const upload = require("../utils/fileUpload");

router.get("/category/:categoryName", getAllPoster);
router.get("/search/:searchQuery", getAllPoster);
router.get("/category/:categoryName/search/:searchQuery", getAllPoster);
router.get("/", getAllPoster);
router.get("/new", getNewPosters);
router.get("/:id", getPosterById)

router.post("/", protect, upload.single('image'), createPoster);
router.put("/:id", protect, upload.single('image'), updatePoster)
router.delete("/:id", protect, deletePoster)

module.exports = router