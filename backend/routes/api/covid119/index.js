const router = require('express').Router()
const controller = require('./covid119.controller')

// 나중에 알아서 라우트 패스 잘 나눠주세요
router.post('/get', controller.get)

module.exports = router