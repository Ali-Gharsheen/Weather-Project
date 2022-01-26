const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
   res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req, res){
  var query = req.body.cityName;
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=804b4f1bdb582cb130a98a16a85dc2b5&units=metric";
  https.get(url,function(response){
    console.log("statusCode:",response.statusCode);
    // console.log("headers:",response.headers);
    response.on("data",(d)=>{
      var weatherData = JSON.parse(d);
      var weatherDescription = weatherData.weather[0].description;
      var temp = weatherData.main.temp;
      var weatherImage = weatherData.weather[0].icon;
      var imgLink = "https://openweathermap.org/img/wn/"+weatherImage+"@2x.png";
      res.write("<h1>The temperature in " + query + " is " +temp+ " degree Celcius.</h1>");
      res.write("<p>weather description: " +weatherDescription+ "</p>");
      res.write("<img src="+imgLink+">");
      res.send();
    });
  });

});


app.listen(3000,function(){
  console.log("Server started at port 3000.");
});
