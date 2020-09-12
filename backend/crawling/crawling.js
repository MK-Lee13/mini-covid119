const request = require('request');
const cheerio = require('cheerio');
const baseUrl = 'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=' 


/* DB connect
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'kimecr5p9253!!',
  database : 'project_covid119'
});

connection.connect();
*/

const options = {
    url: baseUrl,
    headers: {
        'User-Agent': 'request'
    }
};
var count=0;
const crawling_all = () => {  // const crawling_all = function(){ return new promise ~ } 
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
                        count++;
                    }
                    resolve(region_infected)
                    
                    //db에 data 저장
                    /*
                    for(var i=0;i<count;i++){
                        var sql='insert into infect_korea (region,infect_num) values (?,?)';
                        connection.query(sql,[region_infected[i].region,region_infected[i].new_infected],function(err,result) {
                            if(err) console.log(err);
                        });
                    }
                    */
                    
                } else {
                    reject('err')
                }
            })
        )
    })
}

module.exports = crawling_all;


