const http = require("http");
const printer = require('./printer');
const urlApi = "http://api.openweathermap.org/data/2.5/weather?units=metric";
const keyApi = "b3f40e536c82a8fb43c8511386c4d9a3";

function getDataWeather(city="Kinshasa") {
    const url = `${urlApi}&q=${city}&appid=${keyApi}`;
    const data = http.get(url, function(res) {
      if (res.statusCode === 200) {
        let data = "";
        res.on("data", chuck => (data += chuck));
        res.on("end", function() {
          data = JSON.parse(data);
          printer.printMessage(
            data.name,
            data.main["temp"],
            data.main["pressure"],
          );
        });
      } else if (res.statusCode === 404) {
        printer.printError(`${city} n'est pas une  ville valide !!`);
      } else {
        printer.printError("Impossible d'établir une connexion");
      }
    });
  }

  module.exports.get = getDataWeather;