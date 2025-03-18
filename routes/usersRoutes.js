const express = require("express");
const { addUser, deleteUser, updateUser, getById, getAllUsers} = require("../controllers/userController.js");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.js");

router.post("/users",   addUser)
router.get("/users", verifyToken, getAllUsers)
router.delete("/:idUser", verifyToken, deleteUser)
router.patch("/:idUser",verifyToken, updateUser)
router.get("/myProfile", verifyToken, getById )

module.exports = router