const express = require("express");
const { addUser, deleteUser, updateUser, getById, getAllUsers} = require("../controllers/userController.js");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.js");

router.post("/users",   addUser)
router.get("/users", verifyToken, getAllUsers)
router.delete("/users/:idUser", verifyToken, deleteUser)
router.patch("/users/:idUser",verifyToken, updateUser)
router.get("/user/myProfile", verifyToken , getById)

module.exports = router