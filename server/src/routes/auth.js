const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/AuthController')


router.post('/login',authController.login)

router.post('/signup',authController.signup)

router.post('/refresh-token',authController.refreshToken)

router.post('/',authController.auth)


module.exports = router