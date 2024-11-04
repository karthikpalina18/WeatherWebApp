document.getElementById('fetchWeatherBtn').addEventListener('click', fetchWeather);
document.getElementById('currentLocationBtn').addEventListener('click', fetchWeatherByLocation);

async function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (!location) {
        document.getElementById('weatherInfo').innerHTML = '<p>Please enter a location.</p>';
        return;
    }

    const apiKey = 'dde51638bc7c5c93dbe98122389116d0';  // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherInfo').innerHTML = `<p>${error.message}</p>`;
    }
}

async function fetchWeatherByLocation() {
    if (!navigator.geolocation) {
        document.getElementById('weatherInfo').innerHTML = '<p>Geolocation is not supported by your browser.</p>';
        return;
    }

    navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        const apiKey = 'dde51638bc7c5c93dbe98122389116d0';  // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Unable to fetch weather data');
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            document.getElementById('weatherInfo').innerHTML = `<p>${error.message}</p>`;
        }
    }, error => {
        document.getElementById('weatherInfo').innerHTML = '<p>Unable to retrieve your location.</p>';
    });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Conditions: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
