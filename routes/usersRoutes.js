const express = require("express");
const { addUser, deleteUser, updateUser, getById, getAllUsers, updateProfilePic} = require("../controllers/userController.js");
const router = express.Router();
const multer = require('../middlewares/multerConfig.js')
const { verifyToken } = require("../middlewares/auth.js");

router.post("/users",   addUser)
router.get("/users", verifyToken, getAllUsers)
router.delete("/:idUser", verifyToken, deleteUser)
router.patch("/:idUser",verifyToken, updateUser)
router.get("/myProfile", verifyToken, getById )
router.put('/profile-pic', verifyToken, multer.single('profilePic'), updateProfilePic);

module.exports = router