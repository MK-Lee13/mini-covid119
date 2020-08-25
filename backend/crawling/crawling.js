const request = require('request');
const cheerio = require('cheerio');
fs = require('fs');


function crawling_all(){
    let region_infected = [];
    const options = {
        url: 'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=',
        headers: {
            'User-Agent': 'request'
        }
    };

    const callback = ((error, response, body) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            var region_src, new_infected_src;
            for(var index=2; index<=19; index++){
                const region = $(`#content > div > div.data_table.midd.mgt24 > table > tbody > tr:nth-child(${index}) > th`); // 지역
                region.each((index, item) => {
                    console.log(`${$(item).text()}`);
                    region_src = `${$(item).text()}`;
                });

                const new_infected = $(`#content > div > div.data_table.midd.mgt24 > table > tbody > tr:nth-child(${index}) > td:nth-child(2)`); // 전날 비교 증가한 감염자
                new_infected.each((index, item) => {
                    console.log(`${$(item).text()}`);
                    new_infected_src = `${$(item).text()}`;
                });
                
                region_infected.push({region : region_src, new_infected : new_infected_src});
                
            }
            console.log(region_infected);
            fs.writeFile('./data', JSON.stringify(region_infected), function(err, data){
                if(err){
                    return console.log(err);
                }
                console.log(data);
            });
        }
    });

}

module.exports = crawling_all();
//request(options, callback);


