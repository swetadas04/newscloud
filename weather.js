const apiKey = 'b926fc2baa6a89ec88186ec30c741630'; // Replace with your OpenWeatherMap API key

document.getElementById('get-weather').addEventListener('click', getWeather);

function getWeather() {
    const locationInput = document.getElementById('location-input').value;
    if (!locationInput) {
        alert('Please enter a city name.');
        return;
    } 

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            updateWeatherInfo(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function updateWeatherInfo(data) {
    const rise_timestamp = data.sys.sunrise;
    const risedate = new Date(rise_timestamp * 1000); 

    const set_timestamp = data.sys.sunset;
    const setdate = new Date(set_timestamp * 1000); 

    document.getElementById('location').innerText = data.name;
    document.getElementById('temperature').innerText = `Temperature: ${(data.main.temp)}°C`;
    document.getElementById('feels_like').innerText = `Feels Like: ${(data.main.feels_like)}°C`;
    document.getElementById('wind_speed').innerText = `Wind Speed: ${(data.wind.speed)}km/h`;
    document.getElementById('sunrise').innerText = `${risedate.toLocaleString()}`;
    document.getElementById('sunset').innerText = `${setdate.toLocaleString()}`;
    document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;

    // Weather description for changing the background
    const weatherDescription = data.weather[0].description;
    console.log(weatherDescription);

    // Change background based on the weather description
    changeBackground(weatherDescription);
}

// Function to change background based on weather description
function changeBackground(weatherDescription) {
    const body = document.body;

    // Reset the background style first
    body.style.backgroundColor = '';
    body.style.backgroundImage = '';
    body.style.backgroundSize = 'cover';  // Ensures the image covers the screen
    body.style.backgroundRepeat = 'no-repeat'; // Prevents image repetition
    body.style.backgroundPosition = 'center'; // Centers the image on the screen
    body.style.height = '100vh'; // Set height to 100% of the viewport (full screen)


    // Set background 
    if (weatherDescription.includes('clear')) {
        body.style.backgroundImage = 'url("clear.png")'; // Image for clear sky
    } 
    
 
    else if (weatherDescription.includes('scattered clouds') || weatherDescription.includes('broken clouds') || weatherDescription.includes('few clouds')) {
        body.style.backgroundImage = 'url("cloud.jpg")'; // Image for scattered or broken clouds
    } 
  
    
    else if (weatherDescription.includes('rain') || weatherDescription.includes('shower rain') || weatherDescription.includes('moderate rain') || weatherDescription.includes('freezing rain')|| weatherDescription.includes('heavy intensity rain') || weatherDescription.includes('light rain')) {
        body.style.backgroundImage = 'url("rain.jpg")'; // Image for rain
    } 
    
    else if (weatherDescription.includes('thunderstorm')) {
        body.style.backgroundImage = 'url("thunder.jpg")'; // Image for thunderstorm           .............
    } 
    
    else if (weatherDescription.includes('snow')) {
        body.style.backgroundImage = 'url("snowfall.png")'; // Image for snow                 ...............
    } 
    
    else if (weatherDescription.includes('mist') || weatherDescription.includes('haze')) {
        body.style.backgroundImage = 'url("haze.jpg")'; // Image for mist                  ...........
    } 
    
    else if (weatherDescription.includes('drizzle')) {
        body.style.backgroundImage = 'url("drizzle.png")'; // Image for drizzle                 ...............
    } 
    
    else if (weatherDescription.includes('overcast')) {
        body.style.backgroundImage = 'url("overcast.png")'; // Image for overcast                 ...............
    } 
  
    
    else {
        body.style.backgroundImage = 'url("default.jpg")'; // Default background image
    }
}
