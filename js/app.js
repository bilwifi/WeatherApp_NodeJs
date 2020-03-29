$("#form").on("submit", function(e) {
  e.preventDefault();
  getDataWeather($("#city")[0].value);
});

$("#cancelModal").click(function() {
  $(".ui.basic.modal").modal("hide");
});

function viewForecast(data) {
  let content = createComponerforecastMain(data[Object.keys(data)[0]][0]);
  for (const attribut in data) {
    if (data.hasOwnProperty(attribut)) {
      if (data[Object.keys(data)[0]][0] !== data[attribut][0])
        content += createComponerforecast(data[attribut][0]);
    }
  }
  $("#forecast-container")[0].innerHTML = content;
}

function getDataWeather(city) {
  const urlApi =
    "https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=fr";
  const keyApi = "b3f40e536c82a8fb43c8511386c4d9a3";
  const url = `${urlApi}&q=${city}&appid=${keyApi}`;
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    beforeSend: function() {
      $("#overlay").fadeIn(300);
    },
    complete: function() {
      $("#overlay").fadeOut(300);
    },
    success: function(data) {
      viewForecast(formatDataWeather(data.list, data.city.name));
      $("#city")[0].value = "";
    },
    error: function(e) {
      if (e.status === 404) {
        $("#messageModal").html(`${city}  n'est pas une ville correcte !!`);
        $(".ui.basic.modal").modal("show");
        $("#city")[0].value = "";
      } else {
        $("#messageModal").html("Connexion Impossible !!!");
        $(".ui.basic.modal").modal("show");
      }
    }
  });
}

function formatDataWeather(dataWeather, city) {
  data = [];
  for (const element of dataWeather) {
    data.push({
      city: city,
      temperature: element.main.temp,
      pression: element.main.pressure,
      humidite: element.main.humidity,
      description: element.weather[0].description,
      icon: element.weather[0].icon,
      vitesse_du_vent: element.wind.speed,
      direction_du_vent: element.wind.deg,
      dt_format: formatDate(element.dt_txt),
      heure_format: formatHour(element.dt_txt)
    });
  }
  return groupDataWeatherByDay(data);
}
function formatDate(date) {
  date = new Date(date);
  let options = {
    weekday: "short",
    // year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}
function formatHour(date) {
  date = new Date(date);
  return `${date.getHours()}h : ${date.getMinutes()}'`;
}

function groupDataWeatherByDay(dataWeahterFormated) {
  return reGroup(dataWeahterFormated, "dt_format");
}

function reGroup(list, key) {
  const newGroup = {};
  list.forEach(item => {
    const newItem = Object.assign({}, item);
    // delete newItem[key];
    newGroup[item[key]] = newGroup[item[key]] || [];
    newGroup[item[key]].push(newItem);
  });
  return newGroup;
}

function createComponerforecast(data) {
  return `
    <div class="forecast">
        <div class="forecast-header">
            <div class="day">${data.dt_format}</div>
        </div> <!-- .forecast-header -->
        <div class="forecast-content">
            <div class="forecast-icon">
                <img src="http://openweathermap.org/img/w/${data.icon}.png" alt="" width=48>
            </div>
            <div class="degree">${data.temperature}<sup>o</sup>C</div>
            <small>${data.description}</small>
        </div>
    </div>
    `;
}

function createComponerforecastMain(data) {
  return `
    <div class="today forecast">
        <div class="forecast-header">
            <div class="day">${data.dt_format}</div>
        </div> <!-- .forecast-header -->
        <div class="forecast-content">
            <div class="location">${data.city}</div>
            <div class="degree">
                <div class="num">${data.temperature}<sup>o</sup>C</div>
                <div class="forecast-icon">
                    <img src="http://openweathermap.org/img/w/${data.icon}.png" alt="" >
                </div>	
            </div>
            <span><img src="images/icon-umberella.png" alt="">${data.humidite}</span>
            <span><img src="images/icon-wind.png" alt="">${data.vitesse_du_vent}km/h</span>
            <span><img src="images/icon-compass.png" alt="">${data.description}</span>
        </div>
    </div>
      `;
}
