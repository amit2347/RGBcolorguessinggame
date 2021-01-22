var temp23 = document.querySelector("#cityTemperature");
var location23 = document.querySelector("#cityName")
var rain23 = document.querySelector("#rainMeasure");
var wind23 = document.querySelector("#windSpeed");

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition);
	}

	function showPosition(position) {
		lat = position.coords.latitude;
		lon = position.coords.longitude;
		lat = lat.toFixed(6);
		lon = lon.toFixed(6);
		var latString = lat.toString();
		var lonString = lon.toString();
		showWeatherData(lat, lon);
	}

}

function showWeatherData(latString, lonString) {
	fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latString + '&lon=' + lonString + '&units=metric&appid=927097d7e0cf450eefc07e00cc28ba7a')
		.then(response => response.json())
		.then(data => {
			var cityTemperature = data['main']['temp'].toFixed(1) + "°";
			temp23.innerHTML = cityTemperature;
			location23.innerHTML = data['name'];
			rain23.innerHTML = data['clouds']['all'] + '%';
			wind23.innerHTML = data['wind']['speed'] + ' KMPH';


		})

		.catch(err => alert("Wrong city name!"));

}

getLocation()