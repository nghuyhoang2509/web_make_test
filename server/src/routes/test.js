const express = require('express')
const router = express.Router()
const testController = require('../app/controllers/TestController')


router.post('/category',testController.category)

router.post('/create',testController.create)

router.patch('/update',testController.update)

router.post('/response',testController.response)

router.patch('/answer',testController.answer)

router.post('/delete',testController.delete)

router.post('/stoppolling',testController.stopPolling)

router.post('/get',testController.test)



module.exports = router