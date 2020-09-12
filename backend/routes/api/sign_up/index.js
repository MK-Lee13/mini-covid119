const router = require('express').Router();
const { render } = require('pug');
const controller = require('./sign_up.controller');

//router.use('/covid119', covid119)
//router.use('/sign_up', sign_up)

router.get('/get', controller.get);
router.post('/create', controller.post);

module.exports = router
// module.exports는 모듈을 global 하게 사용하기 위해 구성된 nodejs의 객체 
