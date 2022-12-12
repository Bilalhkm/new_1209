const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var request = require("request");
const API_key = "bdf70cd25ad88f7c5c0bf6bebca14774";
const mongoose = require("mongoose");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/weather")
  .then(() => console.log("Connected!"));

const weather = require("./model/weather");
const data = require("./model/data");

fs = require("fs");

app
  .post("/city", async (req, res) => {
    await weather.create(req.body);
    res.send("city is added");
  })
  .get("/weather", async (req, res) => {
    const city_name = (await weather.findOne().sort("-_id")).city;
    request(
      `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`,
      async (error, response, body) => {
        res.json(body);
        await data.create({ allData: body });
        await fs.writeFile("weather.txt", body, function (err) {
          if (err) return console.log(err);
        });
      }
    );
    await weather.remove({});
  })
  .get("/weather/file", async (req, res) => {
    await res.download("./weather.txt");
  });
app.listen(3000, () => {
  console.log(`Server is running using express ... http://localhost:3000`);
});
