const form = document.getElementById("form");
const input = document.getElementById("input");
const main = document.getElementById("data");

const KEY = 'fcf3d72d58ef70f044775ebe713c9621';

function getWhater(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=az&appid=${KEY}`)
        .then(response => response.json())
        .then(response => addWeatherToPage(response));

}
addWeatherToPage = (response) => {
    const temp = Math.floor(response.main.temp - 273.15);
    main.innerHTML = `
        <div class="temp">
            <img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" />
            <span>${temp}°C</span>
        
        </div>
        <div class='info'>
            <span>${response.name} / </span> <span> ${response.weather[0].description}</span>
        </div>
    `;

};
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('city') !== '') {
        const newcity = JSON.parse(localStorage.getItem('city'));
        getWhater(newcity);
    }   
    
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let city = input.value;
    if (city) {
        getWhater(city);
        localStorage.setItem('city', JSON.stringify(city));
    }
});