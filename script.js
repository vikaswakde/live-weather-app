
const API_KEY = 'f16879ba664aa23936a57b5d962ca921';

const form = document.getElementById('search-form');
const weatherInput = document.getElementById("location-input");
const weatherContainer = document.getElementById("weather-container");

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const location = weatherInput.value.trim();

  if (location !== "") {
    getWeather(location);
  }
});

function getWeather(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.log('An error occurred:', error);
      weatherContainer.textContent = "Failed to fetch weather data";
    });
}

function displayWeather(data) {
  const { name, sys, main, weather } = data;
  const weatherHTML = `
    <h2>${name}, ${sys.country}</h2>
    <div class="weather-icon">${getWeatherIcon(weather[0].main)}</div>
    <div>
      <strong>Temperature:</strong> ${main.temp}°C
    </div>
    <div>
      <strong>Condition:</strong> ${weather[0].main}
    </div>
  `;

  weatherContainer.innerHTML = weatherHTML;
}

function getWeatherIcon(condition) {
  switch (condition) {
    case 'Clear':
      return '<i class="fas fa-sun"></i>';
    case 'Clouds':
      return '<i class="fas fa-cloud"></i>';
    case 'Rain':
      return '<i class="fas fa-cloud-rain"></i>';
    // Add more cases for other weather conditions and their corresponding icons
    default:
      return '';
  }
}
