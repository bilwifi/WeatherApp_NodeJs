const weather = require('./weather');
const cities = process.argv.slice(2);
if(cities.length){
    for (const city of cities) {
        weather.get(city);
    }
}else{
    console.log("Veiller ajouter au moins une ville\n Exemple => node app.js Kinshasa\n \t => node app.js Kinshasa Paris Berlin ")
}


