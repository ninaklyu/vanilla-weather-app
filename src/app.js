function formatDate (timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;

}
function formatDay(timestamp) {
    let date = new Date (timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];


}
function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement=document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML = forecastHTML + `  
    <div class="col-2">
        <div class="weather-forecast-day">${formatDay(forecastDay.dt)}
        </div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" id="icon-forecast" width="45"/>
        <div class="weather-forecast-temperatures">
        <span class="temperature-max">${Math.round(forecastDay.temp.max)}° </span><span class="temperature-min"> ${Math.round(forecastDay.temp.min)}°</span>
        </div>      
    </div>
    `;
      }
    });
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
console.log (coordinates);
let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let cityElement=document.querySelector("#city");
    let temperatureElement=document.querySelector("#temperature");
    let descriptionElement=document.querySelector ("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute ("alt", response.data.weather[0].description);
    getForecast(response.data.coord);
}
function search(city) {
    let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}
function executeSubmit(event) {
event.preventDefault();
let cityInputElement=document.querySelector("#city-name");
search(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form=document.querySelector("#search-city-form");
form.addEventListener("submit",executeSubmit);

let fahrenheitLink = document.querySelector ("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusemperature);

search("Kyiv");
