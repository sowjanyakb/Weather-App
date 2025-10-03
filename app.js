document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "693adc20fe426309e603128c4aea9781"; 
  const weatherResult = document.getElementById("weatherResult");
  const errorMessage = document.getElementById("errorMessage");

  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    weatherResult.classList.add("hidden");
    return;
  }

  try {
    errorMessage.textContent = "";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("City not found.");

    const data = await response.json();
    // Set values
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("weatherIcon").alt = data.weather[0].description;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("windSpeed").textContent = data.wind.speed;

    weatherResult.classList.remove("hidden");
  } catch (err) {
    errorMessage.textContent = err.message;
    weatherResult.classList.add("hidden");
  }
}

