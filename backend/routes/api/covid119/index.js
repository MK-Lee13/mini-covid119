const router = require('express').Router()
const controller = require('./covid119.controller')
const crawling = require('../../../crawling/crawling.js');
// 나중에 알아서 라우트 패스 잘 나눠주세요

router.get('/get', function(request, response){
    crawling.crawling_all();
    controller.get();
    
});

module.exports = router