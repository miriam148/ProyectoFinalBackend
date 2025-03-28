const express = require('express')

const { signup, login, refreshToken, changePassword } = require('../controllers/authController')
const { verifyToken } = require('../middlewares/auth')
const { generateToken } = require('../utils/utils')
const router = express.Router()

router.post('/signup', signup)
router.post('/login',  login)
router.post('/refresh-token', refreshToken ) //quito verify token por si es eso lo que me da problema para el refresh
router.post('/change-password', verifyToken, changePassword)
module.exports = router