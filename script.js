// create global variables to store the elements in the HTML doc as well as a global variable to store the API key. 
var APIKey = "4b68235b6d97901e4e6eb2b454a04dd0"
var citySearch = document.querySelector("#search-city")
var searchButton = document.querySelector("#search-btn")
var selectedCity = document.querySelector("#selected-city")
var currentTemp = document.querySelector("#temp")
var currentWind = document.querySelector("#wind")
var currentHumidity = document.querySelector("#humidity")

var now = dayjs()
var currentDay = $('#currentDay').text(now)

function currentWeather(city) {
    // Use this URL to get data from the openweather map server. use ajax get method to request data from the server with an HTTP get request. 

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "get",
    }).then(function (response) {
        console.log(response)

        // converts the temp that we received from kelvin into fahrenheit. using dot notation throughout the next few examples to get the data we need from the server and convert it and present it accordingly. 

        var tempInFar = (response.main.temp - 273.15) * 9 / 5 + 32;

        // Rounds the decimal and adds fahrenheit and degrees 

        $(currentTemp).html(Math.round(tempInFar * 100 / 100) + " degrees" + " F");

        // Gives us the humidity wich we also get from the response under main and adds a percentage

        $(currentHumidity).html(response.main.humidity + "%");

        //Converts wind speed from meters to seconds. Formula provided by openweather 

        var windSpeed = response.wind.speed;
        var windInMiles = +((2.23694 * windSpeed).toFixed(2));
        $(currentWind).html(windInMiles + " MPH");


        // Displaying the weather icon.

        var weatherIcon = response.weather[0].icon

        var iconURL = `http://openweathermap.org/img/wn/${weatherIcon}.png`

        $(".weather-icon").attr("src", iconURL)

    })
}

function futureWeather(cityid) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityid + "&appid=" + APIKey
    console.log(forecastURL)
    $.ajax({
        url: forecastURL,
        method: "get",
    }).then(function (response) {
        console.log(response)

        for (i = 0; i < 5; i++) {
            var futureTemp = response.list[((i + 1) * 8) - 1].main.temp
            var futureTempinFar = (((futureTemp - 273.15) * 9 / 5 + 32))
            var fTempRound = Math.round(futureTempinFar * 100 / 100)
            var futureWind = response.list[((i + 1) * 8) - 1].wind.speed
            var futWindMPH = +((2.23694 * futureWind).toFixed(2));
            var futureHumid = response.list[((i + 1) * 8) - 1].main.humidity
            var futureIcon = response.list[((i + 1) * 8) - 1].weather[0].icon
            var futIconURL = "https://openweathermap.org/img/wn/" + futureIcon + ".png";

            $("#futTemp" + i).html(fTempRound + " degrees" + " F")
            $("#futWind" + i).html(futWindMPH + "mph")
            $("#futHumidity" + i).html(futureHumid + " %")
            $("#futIcon" + i).html("<img src =" + futIconURL + ">")

        }
    })
}


// Still need to create storage. Would do this through maybe local.storage.setitem with the Cityname variable below as well as another variable, maybe a global to store. 

// Creates an event listener that returns the value of a city when we click the search button.  

searchButton.addEventListener("click", function () {
    var cityName = document.querySelector("#search-city").value
    console.log(cityName)
    currentWeather(cityName)
    futureWeather(cityName)
})

