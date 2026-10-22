
const weatherApi = "https://api.weather.gov/alerts/active?area=";

const stateInput = document.querySelector("#state-input");
const fetchButton = document.querySelector("#fetch-alerts");
const alertsDisplay = document.querySelector("#alerts-display");
const errorMessage = document.querySelector("#error-message");

async function fetchWeatherData(state) {
  try {
    const response = await fetch(`${weatherApi}${state}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    displayError(error.message);
  }
}

function displayWeather(data) {
    errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
  const alerts = data.features || [];

  const heading = document.createElement("h3");
  heading.textContent = `Weather Alerts: ${alerts.length}`;
  alertsDisplay.appendChild(heading);

  alerts.forEach((alert) => {
    const item = document.createElement("p");
    item.textContent =
      alert.properties?.headline || "Weather alert details unavailable";
    alertsDisplay.appendChild(item);
  });

  alertsDisplay.classList.remove("hidden");
}

function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

fetchButton.addEventListener("click", async () => {
  const state = stateInput.value.trim().toUpperCase();

  if (!state) {
    displayError("Please enter a state abbreviation.");
    stateInput.value = "";
    return;
  }

  errorMessage.classList.add("hidden");

  await fetchWeatherData(state);

  stateInput.value = "";
});
