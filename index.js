const express = require("express")
const app = express();
const bodyparser = require("body-parser")
const https = require("https")

app.use(bodyparser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/page.html")
})

app.post("/", function (req, res) {
    const cityName = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=504312935d1a17108545cd7ac14fe6d1&units=metric"
    https.get(url, function (response) {
        response.on("data", function (data) {
            const jsondata = JSON.parse(data)
            const temp = jsondata.main.temp
            const des = jsondata.weather[0].description
            const icon = jsondata.weather[0].icon
            const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1> The temperature in " + cityName + " is: " + temp + " degree celsius</h1>");
            res.write("<p> The weather description is: " + des + "</p>");
            res.write("<img src=" + imageurl + ">");
            res.send();


        })
    })
})

app.listen(3000)