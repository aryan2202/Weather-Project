require('dotenv').config()
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/",function(req,res){
   res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    const city = (req.body.cityname);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+process.env.id_key+"&units=metric"
    https.get(url,function(response){
        console.log(response);
        response.on("data",function(data){
            const weatherdata = JSON.parse(data);
            const weatherdescription = weatherdata.weather[0].description;
            const temp = weatherdata.main.temp;
            const icon = weatherdata.weather[0].icon;
            const imageurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"


            res.write("<h1>" + temp + " &degC" + "</h1>");
            res.write("<p>"+weatherdescription + " in " +city+ "</p>" );
            res.write("<img src="+imageurl+" >");
            res.send();

        })
    });
})



app.listen(3000,function()
{
    console.log("server is running at 3000 port");
})