const inputval = document.querySelector('#cityinput');
const btn = document.querySelector('#add');
const city = document.querySelector('#cityoutput');
const description = document.querySelector('#description'); 
const temp = document.querySelector('#temp');
const wind = document.querySelector('#wind');
const weatherIcon = document.querySelector('#weatherIcon');
const loadingSpinner = document.querySelector('#loadingSpinner');
const errorMessage = document.querySelector('#errorMessage');
const currentDateTime = document.querySelector('#currentDateTime');

const apik = "3045dd712ffe6e702e3245525ac7fa38";

function convertion(val) {
    return (val - 273.15).toFixed(2);
}

function updateDateTime() {
    const now = new Date();
    currentDateTime.innerHTML = now.toLocaleString();
}

function displayWeather(data) {
    const nameval = data['name'];
    const descripVal = data['weather'][0]['description'];
    const temperature = data['main']['temp']; 
    const wndspd = data['wind']['speed'];
    const iconCode = data['weather'][0]['icon'];

    city.innerHTML = `City: ${nameval}`;
    temp.innerHTML = `Temperature: ${convertion(temperature)} °C`;
    description.innerHTML = `Conditions: ${descripVal}`;
    wind.innerHTML = `Wind Speed: ${wndspd} m/s`;
    weatherIcon.className = `fas fa-${getWeatherIcon(iconCode)} weather-icon`;
}

function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': 'sun',
        '01n': 'moon',
        '02d': 'cloud-sun',
        '02n': 'cloud-moon',
        '03d': 'cloud',
        '03n': 'cloud',
        '04d': 'cloud-meatball',
        '04n': 'cloud-meatball',
        '09d': 'cloud-showers-heavy',
        '09n': 'cloud-showers-heavy',
        '10d': 'cloud-sun-rain',
        '10n': 'cloud-moon-rain',
        '11d': 'poo-storm',
        '11n': 'poo-storm',
        '13d': 'snowflake',
        '13n': 'snowflake',
        '50d': 'smog',
        '50n': 'smog'
    };
    return iconMap[iconCode] || 'sun';
}

btn.addEventListener('click', function(){
    loadingSpinner.style.display = 'block';
    errorMessage.innerHTML = '';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputval.value}&appid=${apik}`)
    .then(res => res.json())
    .then(data => {
        loadingSpinner.style.display = 'none';
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            errorMessage.innerHTML = 'City not found. Please enter a valid city name.';
        }
    })
    .catch(err => {
        loadingSpinner.style.display = 'none';
        errorMessage.innerHTML = 'An error occurred. Please try again.';
    });
});

setInterval(updateDateTime, 1000);
