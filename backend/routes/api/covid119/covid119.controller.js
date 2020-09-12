var crawling_all = require('../../../crawling/crawling');

exports.get = (req, res) => {
    crawling_all().then(result => {res.send(result)}).catch(err => {res.send(err)})
    // 여기서 알아서 잘 하시면 됩니다.
}

exports.post = (req, res) => {
    res.send('testinggg');
}
 
// then --> resolve값을 가져온다
// catch --> error를 잡는다.