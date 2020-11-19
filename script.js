const app = {};

// Get data from JSON file
const localData = cityList;

// City name array
app.cityArray = [];
app.idArray = [];


// Weather Forecast
app.weatherForecast = function() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&units=metric&appid=b60c0d3d756074360b47925c6dd50cb8",
        dataType: "json",
        method: "GET"
    }).then(function (response) {
        // console.log(response);
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//Function for jQuery UI, // adding aditional method to decrease results to 10 by using slice
// jQuery UI script adjusted to search values only by the first letter
app.jqueryUiAutoFill = function () {
    $(function () {
        $(".cityName").autocomplete({
            source: function (request, response) {
                app.results = $.ui.autocomplete.filter(app.cityArray, request.term);
                response(app.results.slice(0, 10));
            }
        });
    });
}

// Add city names to the cityArray // Exclude empty fields
app.makeCityArray = function () {
    for (let i = 0; i < localData.length; i++) {
        app.addNameToArray = localData[i].name;
        app.addStateToArray = localData[i].state;
        app.addCountryToArray = localData[i].country;
        app.addIdToArray = localData[i].id;
        if (app.addCountryToArray !== "" && app.addNameToArray !== "" && app.addStateToArray !== "") {
            app.cityArray.push(`${app.addNameToArray}, ${app.addStateToArray}, ${app.addCountryToArray}`);
            app.idArray.push(`${app.addIdToArray}`);
        }
        else if (app.addCountryToArray !== "" && app.addNameToArray !== "") {
            app.cityArray.push(`${app.addNameToArray}, ${app.addCountryToArray}`);
            app.idArray.push(`${app.addIdToArray}`);
        }
    }
    // Call jQuery UI autofill function
    app.jqueryUiAutoFill();
}



//Get the main object, search by a city.
app.init = function () {
    app.makeCityArray();
    app.quotes();


    // Search by city name
    // $.ajax({
    //     url: "https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=b60c0d3d756074360b47925c6dd50cb8",
    //     dataType: "json",
    //     method: "GET"
    // }).then(function (response) {
    //     // console.log(response);
    //     app.quotes();
    //     app.weatherForecast();
    // });
};











//Document Ready
$(() => app.init());