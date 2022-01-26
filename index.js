const http = require("http");
const fs=require("fs");
const requests = require("requests");
// const url=require("url");
const homeFile = fs.readFileSync("home.html", "utf-8");
// var bodyParser = require('body-parser');
// var express = require('express');
// var app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.post('/myform', function(req, res) {
//     var item = req.query.search;
//     // console.log(item);
// });
const replaceVal =(tempval, orgval)=>{
    let temprature = tempval.replace("{%tempval%}", (orgval.main.temp -273.15).toFixed(2));
     temprature = temprature.replace("{%tempmin%}", (orgval.main.temp_max -273.15).toFixed(2));
     temprature = temprature.replace("{%tempmax%}", (orgval.main.temp_min -273.15).toFixed(2));
     temprature = temprature.replace("{%location%}", orgval.name);
     temprature = temprature.replace("{%country%}", orgval.sys.country);
     temprature = temprature.replace("{%tempstatus%}", orgval.weather[0].main);
    return temprature;
}

const server = http.createServer((req, res)=>{
    if(req.url=="/")
    {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=bba6a12f917d73df7094b3a4e05bbf2f')
        .on('data', (chunk)=> {
            const objdata = JSON.parse(chunk)
            const arrdata= [objdata];
        // console.log(arrdata[0].main.temp)
        const realtimedata = arrdata.map((val)=>replaceVal(homeFile, val)).join("");
            res.write(realtimedata)
    })
        .on('end',  (err)=> {
         if (err) return console.log('connection closed due to errors', err);
 
        res.end();
        });
    }
    // else{
    //     // const current_url= new URL(res.url);
    //     // const search_params= current_url.searchParams;
    //     // const tag=search_params.get();
    //     let city=url.parse(req.url, true).query.search;
    //     console.log(url.parse(req.url, true).query.search); 
    //     requests(`https://api.openweathermap.org/data/2.5/weather?q=${city} &appid=bba6a12f917d73df7094b3a4e05bbf2f`)
    //     .on('data', (chunk)=> {
    //         const objdata = JSON.parse(chunk)
    //         const arrdata= [objdata];
    //     // console.log(arrdata[0].main.temp)
    //     const realtimedata = arrdata.map((val)=>replaceVal(homeFile, val)).join("");
    //         res.write(realtimedata)
    // })
    //     .on('end',  (err)=> {
    //      if (err) return console.log('connection closed due to errors', err);
 
    //     res.end();
    //     });
    // }
});
server.listen(8000, "127.0.0.1");
