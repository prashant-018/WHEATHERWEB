const apiKey = "2448f0da2fd05e898f02adc51698ff3d";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.src = iconUrl;
    weatherIcon.style.display = "block";
  } catch (error) {
    console.error("Error:", error.message);
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  if (city) {
    checkWeather(city);
  }
});

// Initial weather for Bangalore
checkWeather("Bangalore");
