const express = require('express')

const { signup, login, refreshToken } = require('../controllers/authController')
const { verifyToken } = require('../middlewares/auth')
const { generateToken } = require('../utils/utils')
const router = express.Router()

router.post('/signup', signup)
router.post('/login',  login)
router.post('/refresh-token', verifyToken, refreshToken )

module.exports = router