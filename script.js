// create a namespace object to represent app
// const weatherApp = {};
const app = {};
// store api key within app object
app.apiKey = 'b60c0d3d756074360b47925c6dd50cb8';
// store the root endpoint of the API within app object
app.api = 'https://api.openweathermap.org/data/2.5/weather';
app.cityName = "Toronto";

// global variable
// let submitBtn = document.getElementById("userInputBtn");
// Weather Forecast
app.weatherForecast = function(cityname) {
    $.ajax({
        url: app.api,
        dataType: "json",
        method: "GET",
        data:{
            q: app.cityName,
            appid: app.apiKey           
        }
    }).then(function (response) {
        console.log(response,"mycode");
    });
}

// Get quotes
app.quotes = function () {
    $.ajax({
        url: "https://api.adviceslip.com/advice",
        dataType: "json",
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
};


// add event listener that takes user's input by pressing "enter" key
app.addEventListener = function () {
    let cityInput = document.getElementById("userCityInput");
    // listen the event if user hit the "enter" key
    cityInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            // call function that saves user's input
            app.getUserInput();
        }
    })
}

//add event listener that calls function when user clicks button 
app.getUserInput = () =>{
    // return user's input and save in variable
    app.cityName = document.getElementById("userCityInput").value;
    // call function app.weatherForecast
    app.weatherForecast(app.cityName);
}


//define a method which will initialize the app once the document is ready
app.init = function () {
    app.weatherForecast()
};


//Document Ready
$(() => app.init());

