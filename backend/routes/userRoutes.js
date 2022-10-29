const { Router } = require("express");
const { loginUser, createUser } = require("../controllers/authController");
const { getMe, updateUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);

router.use(protect)
router.get("/me/:id", getMe);
router.put("/profile", updateUser);


module.exports = router