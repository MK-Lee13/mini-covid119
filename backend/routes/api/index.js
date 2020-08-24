const router = require('express').Router()
const covid119 = require('./covid119')

router.use('/covid119', covid119)

module.exports = router