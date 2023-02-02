// create global variables to store the elements in the HTML doc as well as a global variable to store the API key. 
var APIKey = "4b68235b6d97901e4e6eb2b454a04dd0"
var citySearch = document.querySelector("#search-city")
var searchButton = document.querySelector("#search-btn")
var selectedCity = document.querySelector("#selected-city")
var currentTemp = document.querySelector("#temp")
var currentWind = document.querySelector("#wind")
var currentHumidity = document.querySelector("#humidity")

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

        // for (i = 0; i < 5; i++) {
        //     var futureTemp = (response.main.temp - 273.15) * 9 / 5 + 32;
        //     var futureWind = response.wind.speed
        //     var futureHumid = $(currentHumidity).html(response.main.humidity + "%");
        //     var futureWMPH = +((2.23694 * futureWind).toFixed(2));

        //     $("#futTemp" + i).html(futureTemp + " degrees" + " F")
        //     $("#futWind" + i).html(futureWMPH + " mph")
        //     $("#futHumidity" + i).html(futureHumid + " %")

    }

    )
}
// }

// Creates an event listener that returns the value of a city when we click the search button.  

searchButton.addEventListener("click", function () {
    var cityName = document.querySelector("#search-city").value
    console.log(cityName)
    currentWeather(cityName)
    // futureWeather(cityName)
})




    // will have to store the data using local storage 

    // localStorage.setItem(city, searchCity);
    // localStorage.getItem("lastname");




    // Need a function to display the 5 days forecast for the city

// var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&appid=" + APIKey;


// for loop through the 5 days? make sure to include icons
// console.log responses? 
// also will have to add the past searches to the history

