const app = {};

// Weather Forecast
app.weatherForecast = function() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&units=metric&appid=b60c0d3d756074360b47925c6dd50cb8",
        dataType: "json",
        method: "GET"
    }).then(function (response) {
        console.log(response);
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

//Get the main object, search by a city.
app.init = function () {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=b60c0d3d756074360b47925c6dd50cb8",
        dataType: "json",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        app.quotes();
        app.weatherForecast();
    });
};



//Document Ready
$(() => app.init());