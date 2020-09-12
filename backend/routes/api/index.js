const router = require('express').Router()
const covid119 = require('./covid119')
const sign_up = require('./sign_up')
const { render } = require('pug');
//const controller = require('./api.controller')

router.use('/covid119', covid119)
router.use('/sign_up', sign_up)

//router.get('/sign_up', controller.get);
//router.post('/sign_up_create', controller.post);

module.exports = router
// module.exports는 모듈을 global 하게 사용하기 위해 구성된 nodejs의 객체 
