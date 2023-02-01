// create global variables to store the elements in the HTML doc as well as global variable to store the API key. 
var APIKey = "4b68235b6d97901e4e6eb2b454a04dd0";
var citySearch = document.querySelector("#search-city")
var searchButton = document.querySelector("#search-btn");
var selectedCity = document.querySelector("#selected-city");
var currentTemp = document.querySelector("#temp");
var currentWind = document.querySelector("#wind");
var currentHumidty = document.querySelector("#humidity");




// do I need a function to search for cities that exist? 




function currentWeather(city) {
    // Here is the URL that we create to get data from the server 
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log(queryURL)
    fetch(queryURL).then(function (response) {
        console.log(response)
        return response.json()

    })
        .then(function (data) {
            console.log(data);



        })
    // Need a function to display the 5 days forecast for the city 

    // var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&appid=" + APIKey;


    // for loop through the 5 days? make sure to include icons
    // console.log responses? 
    // also will have to add the past searches to the history


    searchButton.addEventListener("click", function () {
        var cityName = document.querySelector("#search-city").value
        console.log(cityName)
        currentWeather(cityName)
    })

    // will have to store the data using local storage 

    // localStorage.setItem(city, searchCity);
    // localStorage.getItem("lastname");

}
