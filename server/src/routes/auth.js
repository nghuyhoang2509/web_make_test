const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/AuthController')


router.post('/login',authController.login)

router.get('/logout',authController.logout)

router.post('/signup',authController.signup)

router.get('/',authController.auth)


module.exports = router