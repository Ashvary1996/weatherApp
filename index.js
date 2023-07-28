async function submit() {
  const typedvalue = document.getElementById("ipu").value;

  // let url = `http://api.weatherapi.com/v1/forecast.json?key=b553e88fb6da41fabf0193816230206&q=jabalpur&aqi=yes&days=7`;
  let url = `https://api.weatherapi.com/v1/forecast.json?key=b553e88fb6da41fabf0193816230206&q=${typedvalue}&aqi=yes&days=7`;

  let fetchedUrl = await fetch(url);
  let data = await fetchedUrl.json();
  appendData(data);
  append7DaysForecast(data.forecast);
}

function appendData(data) {
  // console.log(data);

  document.querySelector("#forecast").style.display = "flex";

  document.querySelector("#degree").innerHTML = data.current.temp_c + " c";
  document.querySelector(".cname").innerHTML = data.location.name;
  document.querySelector("#lastUpdatetime").innerHTML =
    data.current.last_updated;
  let icon = document.querySelector(".icon");
  icon.src = data.current.condition.icon;
  document.querySelector("#weathercondition").innerHTML =
    data.current.condition.text;

  //////////////////////////////////

  document.querySelector(".country").innerHTML =
    "Country: " + data.location.country;
  document.querySelector(".dcname").innerHTML = "City: " + data.location.name;
  document.querySelector(".cregion").innerHTML =
    "Region :" + data.location.region;
  document.querySelector(".direction").innerHTML =
    "lat / lon: " + data.location.lat + "/" + data.location.lon;
  document.querySelector(".ctimeZone").innerHTML =
    "TimeZone: " + data.location.tz_id;

  //////////////////////////////////////////////

  document.querySelector(".ddegreeC").innerHTML =
    "Degree :" + data.current.temp_c + " c";
  document.querySelector(".ddaytype").innerHTML =
    "DayType :" + data.current.condition.text;
  document.querySelector(".dwindSpeed").innerHTML =
    "WindSpeed :" + data.current.wind_kph + " kph";
  document.querySelector(".dhumidity").innerHTML =
    "Humidity :" + data.current.humidity;
  document.querySelector(".dfeelsLike").innerHTML =
    "Feelslike :" + data.current.feelslike_c + " c";
  document.querySelector(".duv").innerHTML = "UV :" + data.current.uv;
  document.querySelector(".dvis").innerHTML =
    "Vision :" + data.current.vis_km + " km";
  document.querySelector(".dco2").innerHTML =
    "Co2 :" + data.current.air_quality.co.toFixed(2);

  document.querySelector(".do3").innerHTML =
    "O3 :" + data.current.air_quality.o3.toFixed(2);
}

function append7DaysForecast(data) {
  document.getElementById("days").innerHTML = null;
  data.forecastday.map((element) => {
    let singleDay = document.createElement("div");
    singleDay.setAttribute("class", "sDay");

    let day = document.createElement("h5");
    let sDType = document.createElement("p");
    let sunrise = document.createElement("p");
    let sunset = document.createElement("p");
    let sMaxTemp = document.createElement("p");
    let sMinTemp = document.createElement("p");
    let sDTypeImg = document.createElement("img");
    let sMaxWindkph = document.createElement("p");
    let sAHumidity = document.createElement("p");
    let sAvis = document.createElement("p");
    let sAirQ = document.createElement("p");

    day.innerHTML = element.date;
    sunrise.innerHTML = element.astro.sunrise;
    sunset.innerHTML = element.astro.sunset;
    sMaxTemp.innerHTML = element.day.maxtemp_c;
    sMinTemp.innerHTML = element.day.mintemp_c;
    sDType.innerHTML = element.day.condition.text;
    sMaxWindkph.innerHTML = element.day.maxwind_kph;
    sAHumidity.innerHTML = element.day.avghumidity;
    sAvis.innerHTML = element.day.avgvis_km + "km";

    sDTypeImg.src = element.day.condition.icon;
    sDTypeImg.setAttribute("class", "sDayIconImg");

    singleDay.append(
      sDTypeImg,
      day,
      sDType,
      sunrise,
      sunset,
      sMaxTemp,
      sMinTemp,
      sMaxWindkph,
      sAHumidity,
      sAvis,
      sAirQ
    );
    document.getElementById("days").append(singleDay);

    console.log("Day");
  });
  // console.log(data, data.forecastday.length);
}

var input = document.getElementById("ipu");
input.addEventListener("keypress", enter);

function enter(event, data) {
  if (event.key === "Enter") {
    submit();
  }
}
