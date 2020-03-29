function printMessage(city, temp, pressure, temp_max) {
    console.log(
      "---------------------------------------------------------"
    );
    console.log(
      `Il fait ${temp}°C à ${city} avec une  pression de ${pressure} hPA`
    );
    console.log(
      "---------------------------------------------------------"
    );
  }
  
  function printError(messageError) {
    console.log(messageError);
  }

  module.exports.printMessage = printMessage;
  module.exports.printError = printError;