
// CampusConnect JavaScript
// Display a welcome message
console.log("Welcome to CampusConnect!");
// Find the weather button and information area
const weatherButton = document.getElementById("weather-button");
const weatherInfo = document.getElementById("weather-info");
// Convert weather codes into descriptions
function getWeatherDescription(code) {
    if (code === 0) return "Clear Sky";
    if (code === 1) return "Mainly Clear";
    if (code === 2) return "Partly Cloudy";
    if (code === 3) return "Overcast";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain Showers";
    if (code >= 85 && code <= 86) return "Snow Showers";
    if (code >= 95 && code <= 99) return "Thunderstorms";
    return "Conditions Unavailable";
}
// Get current weather data from Open-Meteo
async function getWeather() {
    // Belmont, North Carolina coordinates
    const latitude = 35.2501;
    const longitude = -81.0373;
    // Open-Meteo API URL
    const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code&temperature_unit=fahrenheit`;
    // Show loading message
    weatherButton.disabled = true;
    weatherButton.textContent = "Loading...";
    weatherInfo.innerHTML = "<p>Retrieving current weather...</p>";
    try {
        // Request weather information
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error("Weather request failed.");
        }
        // Convert response into JSON
        const data = await response.json();
        // Store current weather information
        const current = data.current;
        const description = getWeatherDescription(current.weather_code);
        // Display weather information
        weatherInfo.innerHTML = `
            <h3>${current.temperature_2m}°F</h3>
            <h4>${description}</h4>
            <p>Feels like: ${current.apparent_temperature}°F</p>
            <p>Humidity: ${current.relative_humidity_2m}%</p>
            <p class="text-muted">Belmont, North Carolina</p>
        `;
    } catch (error) {
        // Display an error if the request fails
        weatherInfo.innerHTML = "<p>Unable to retrieve weather information. Please try again.</p>";
        console.error("Weather error:", error);
    } finally {
        // Restore the button after the request
        weatherButton.disabled = false;
        weatherButton.textContent = "Check Weather";
    }
}
// Run the weather function when the button is clicked
if (weatherButton) {
    weatherButton.addEventListener("click", getWeather);
}
