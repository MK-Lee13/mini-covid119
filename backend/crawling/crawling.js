const request = require('request');
const cheerio = require('cheerio');
const baseUrl = 'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=' 

const options = {
    url: baseUrl,
    headers: {
        'User-Agent': 'request'
    }
};

const crawling_all = () => {
    return new Promise((resolve, reject) => {
        let region_infected = []
        request(options, ((error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(body);
                    let region_src, new_infected_src;
                    for (let index = 2; index <= 19; index++){
                        const region = $(`#content > div > div.data_table.midd.mgt24 > table > tbody > tr:nth-child(${index}) > th`); // 지역
                        const new_infected = $(`#content > div > div.data_table.midd.mgt24 > table > tbody > tr:nth-child(${index}) > td:nth-child(2)`); // 전날 비교 증가한 감염자
                        
                        region.each((index, item) => {
                            region_src = `${$(item).text()}`;
                        });

                        new_infected.each((index, item) => {
                            new_infected_src = `${$(item).text()}`;
                        });
                        
                        region_infected.push({region : region_src, new_infected : new_infected_src});  
                    }
                    resolve(region_infected)
                } else {
                    reject('err')
                }
            })
        )
    })
}

module.exports = crawling_all;


