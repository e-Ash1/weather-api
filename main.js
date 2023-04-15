import axios from "axios";

const headerForm = document.querySelector('.header--form');

headerForm.addEventListener('submit', async function(event){
  event.preventDefault();
  const cityForm = document.querySelector('input[name="text--city"]');
  const cityValue = cityForm.value;
  console.log(cityValue); 

  async function updateWeather(city) {
    const weatherInfo = {
      apiKey: 'ENTER API KEY HERE',
      apiUrl: 'ENTER API URL HERE',
    };
    let weatherData;
  
    try {
      const response = await axios.get(`${weatherInfo.apiUrl}?key=${weatherInfo.apiKey}&q=${city}&aqi=yes`);
      if(response.status < 200 || response.status >= 300){
        throw new Error(`Failed to fetch data with status code ${response.status}`);
      }
      const data = response.data;
      weatherData = {
        name: data.location.name,
        high: data.forecast.forecastday[0].day.maxtemp_f,
        low: data.forecast.forecastday[0].day.mintemp_f,
        wind: data.current.wind_mph,
        precip: data.current.precip_in,
      };
      console.log(data);
    } catch (error) {
      console.log(error);
      // const errorMessage = document.getElementById('error-message');
      // errorMessage.textContent = 'Error fetching weather data. Please try again later.';
    }

    const highSpan = document.querySelector('[data-current-high]');
    highSpan.textContent = `${weatherData.high}°F`;

    const lowSpan = document.querySelector('[data-current-low]');
    lowSpan.textContent = `${weatherData.low}°F`;

    const windSpan = document.querySelector('[data-current-wind]');
    windSpan.textContent = `${weatherData.wind} mph`;

    const precipSpan = document.querySelector('[data-current-precip]');
    precipSpan.textContent = `${weatherData.precip} in`;

  }
  
  updateWeather(cityValue);

});
