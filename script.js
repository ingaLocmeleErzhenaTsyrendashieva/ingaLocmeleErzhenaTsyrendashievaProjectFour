const app = {};

// Get data from JSON file
const localData = cityList;

// City name array
app.cityArray = [];
// lat and lon for Toronto as a default valu
app.latitude = 43.700111;
app.longitude = -79.416298;
// Units of measure
app.metric = "metric";
// store the root endpoint of the API within app object
app.api = 'https://api.openweathermap.org/data/2.5/onecall';
// store api key within app object
app.apiKey = 'b60c0d3d756074360b47925c6dd50cb8';

// Hourly Forecast 

app.displayWeatherHourly = function (weatherData) {
    //convert UTC to local time

    //Current time correct
    $(".hourlyWeather").empty();

    for (i = 1; i < 3; i++) {
        //convert UTC to local time
        app.dailyForecastTimeHour = moment.unix(weatherData.hourly[i].dt).utc()
            .utcOffset(weatherData.timezone_offset / 60)
            .format('h A ').toString();
        app.dailyForecastClouds = weatherData.hourly[i].weather[0].main;
        app.dailyForecastWind = weatherData.hourly[i].wind_speed;
        app.dailyForecastIcon = weatherData.hourly[i].weather[0].icon;
        app.dailyForecastIconDesc = weatherData.hourly[i].weather[0].description;
        //round tempreture
        app.dailyForecastFeelsLike = Math.round(weatherData.hourly[i].feels_like);
        app.dailyForecast = Math.round(weatherData.hourly[i].temp);
        // Append data to HTML
        $(".hourlyWeather").append(
            `<ul>
                <li>${app.dailyForecastTimeHour}</li>
                <li class="cloudIcon">
                    <img src="styles/assets/${app.dailyForecastIcon}.svg" alt="${app.dailyForecastIconDesc}">
                </li>
                <li><span class="currentTemp">${app.dailyForecast}</span>°C</li>
                <li class="cloud">${app.dailyForecastClouds}</li>
                <li>Feels Like: <span class="feelsLike">${app.dailyForecastFeelsLike}</span>°C</li>
                <li>Wind: <span class="wind">${app.dailyForecastWind}</span> km/h</li>
            </ul>`)
    }
}

// weather forecast function daily
app.displayWeatherForecast = function (weatherData) {
    //convert UTC to local time

    //Current time correct
    $(".bottomWeather").empty();

    for (i = 0; i < weatherData.daily.length; i++){
        //convert UTC to local time
        app.dailyForecastTime = moment.unix(weatherData.daily[i].dt).utc()
        .utcOffset(weatherData.timezone_offset / 60)
        .format('ddd MMM D').toString();
        app.dailyForecastTimeSemantic = moment.unix(weatherData.daily[i].dt).utc()
            .utcOffset(weatherData.timezone_offset / 60)
            .format('YYYY-MM-DD').toString();
        app.dailyForecastClouds = weatherData.daily[i].weather[0].main;
        app.dailyForecastWind = weatherData.daily[i].wind_speed;
        app.dailyForecastIcon = weatherData.daily[i].weather[0].icon;
        app.dailyForecastIconDesc = weatherData.daily[i].weather[0].description;
        //round tempreture
        app.dailyForecastFeelsLike = Math.round(weatherData.daily[i].feels_like.day);
        app.dailyForecast = Math.round(weatherData.daily[i].temp.day);
        // Append data to HTML
        $(".bottomWeather").append(
        `<ul>
            <li><time datetime="${app.dailyForecastTimeSemantic}">${app.dailyForecastTime}</time></li>
            <li class="cloudIcon">
                <!-- <img src="styles/assets/${app.dailyForecastIcon}.svg" alt="${app.dailyForecastIconDesc}"> -->
            </li>
            <li><span class="currentTemp">${app.dailyForecast}</span>°C</li>
            <li class="cloud">${app.dailyForecastClouds}</li>
            <li>Feels Like: <span class="feelsLike">${app.dailyForecastFeelsLike}</span>°C</li>
            <li>Wind: <span class="wind">${app.dailyForecastWind}</span> km/h</li>
        </ul>`)
    }
}


        ////////////////////////////



// define function thats displays weather on the page html
// app.displayWeather = (weatherData) => {
//     //convert UTC to local time
//     let localTime = moment.unix(weatherData.dt).utc()
//         .utcOffset(weatherData.timezone / 60)
//         .format('ddd MMM D Y hh:mm:ss A ').toString();
//     //round tempreture
//     let tempCelcia = Math.round(weatherData.main.temp);
//     let feelLikeTemp = Math.round(weatherData.main.feels_like);
//     //store data 
//     const currentCityWeather = `<li class="currentCityCountry">${weatherData.name},  ${weatherData.sys.country}</li>
//                                 <li class="currentTime"><time datetime="">${localTime}</time></li> 
//                                 <li class="currentTemp"><span class="currentCityTemp">${tempCelcia}</span>&#8451;</li>
//                                 <li class="currentCloud">${weatherData.weather[0].description} <img src="./styles/amchartsWeatherIcons1.0.0/animated/cloudy-day-1.svg" alt="cloudy"></img></li>
//                                 <li class="currentFeelsLike">Feels Like: <span class="feelsLike">${feelLikeTemp}</span> &#8451;</li>
//                                 <li class="currentWind"><span class="wind">Wind: ${weatherData.wind.speed}</span>km/h</li>
//                                 <li class="currentHumidity"><span class="humidity">Humidity: ${weatherData.main.humidity}</span> %</li>`;
//     // used .append to update data when user select city
//     $('.currentWeather').append(currentCityWeather);
// }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Weather Forecast AJAX call
app.weatherForecast = function () {
    $.ajax({
        url: app.api,
        dataType: "json",
        method: "GET",
        data: {
            lat: app.latitude,
            lon: app.longitude,
            appid: app.apiKey,
            units: app.metric,
            exclude: "minutely"
        }
    }).then(function (response) {
        console.log(response);
        // app.displayWeather(response);
        app.displayWeatherForecast(response);
        app.displayWeatherHourly(response);
    });
}

// Collect user's input
app.userInput = function () {
    $('form').on('submit', function () {
        // e.preventDefault();
        app.userInputCity = $('#userInput').val();
        //Check if the entry is valid
        if (app.userInputCity != ""){
            for (let i = 0; i < app.cityArray.length; i++){
                if (app.userInputCity == app.cityArray[i].label){
                    console.log("matches");
                    //Display city name
                    $("h2").html(app.userInputCity);
                    //pass user's input to a function
                    app.latitude = app.cityArray[i].lat;
                    app.longitude = app.cityArray[i].lon;
                    //Send Ajax for chosen city
                    app.weatherForecast();
                    $(this).trigger("reset");
                    return false;
                }
            }
            for (let i = 0; i < app.cityArray.length; i++) {
                if (app.userInputCity !== app.cityArray[i].label) {
                    //Print error message
                    $(".errorMessage").empty().append(`<p>Country is not on the list!</p>`).fadeIn().delay(1000).fadeOut().delay(500);
                    $(this).trigger("reset");
                    return false;
                }
            }
        }
        else {
            console.log("empty");
            //Print error message
            $(".errorMessage").empty().append(`<p>The field is empty!</p>`).fadeIn().delay(1000).fadeOut().delay(500);
        }
        //clear form after user hit submit button
        $(this).trigger("reset");
    });
}

// Function for jQuery UI (this part of the code is adjusted jQuery UI) autofill country
// adding aditional method to show the end of country name in the input field
// adding aditional method to enter the end of the city if clicked out of the input field
app.jQueryUiFunction = function (location) {
    let firstElement = $(location).data("uiAutocomplete").menu.element[0].children[0]
        , inpt = $(location)
        , original = inpt.val()
        , firstElementText = $(firstElement).text();
    /*
        here we want to make sure that we're not matching something that doesn't start
        with what was typed in 
    */
    if (firstElementText.toLowerCase().indexOf(original.toLowerCase()) === 0) {
        inpt.val(firstElementText);//change the input to the first match

        inpt[0].selectionStart = original.length; //highlight from end of input
        inpt[0].selectionEnd = firstElementText.length; //highlight to the end
        // $("#zoominmap").click(); // trigger click on mobile
    }
}
// adding aditional method to decrease results to 10 by using slice
// jQuery UI script adjusted to search values only by the first letter
app.jqueryUiAutoFill = function () {
    $(function () {
        $(".cityName").autocomplete({
            source: function (request, response) {
                app.results = $.ui.autocomplete.filter(app.cityArray, request.term);
                response(app.results.slice(0, 10));
            },
            select: function (event, ui) {
            },
            open: function (event, ui) {
                app.jQueryUiFunction(this);
            },
            close: function (event, ui) {
                app.jQueryUiFunction(this);
            }
        });
        // Collect user's input
        app.userInput();
    });
}

// Add city names and IDs as objects to the cityArray // Exclude empty fields
app.makeCityArray = function () {
    for (let i = 0; i < localData.length; i++) {
        app.addNameToArray = localData[i].name;
        app.addStateToArray = localData[i].state;
        app.addCountryToArray = localData[i].country;
        app.addLonToArray = localData[i].coord.lon;
        app.addLatToArray = localData[i].coord.lat;
        if (app.addCountryToArray !== "" && app.addNameToArray !== "" && app.addStateToArray !== "") {
            let eachCityObject  = { 
                "label": `${app.addNameToArray}, ${app.addCountryToArray}`,
                "lon": `${app.addLonToArray}`,
                "lat": `${app.addLatToArray}`
            };
            app.cityArray.push(eachCityObject);
        }
        else if (app.addCountryToArray !== "" && app.addNameToArray !== "") {
            let eachCityObject = {
                "label": `${app.addNameToArray}, ${app.addCountryToArray}`,
                "lon": `${app.addLonToArray}`,
                "lat": `${app.addLatToArray}`
            };
            app.cityArray.push(eachCityObject);
        }
    }
    // Call jQuery UI autofill function
    app.jqueryUiAutoFill();
}

// define function that displays quotes on the html page
app.displayQuotes = (dayQuote) => {
    const advice = dayQuote.slip.advice;
    $('.quotes').html(`<span class="dayQuote">${advice}</span>`);
}

// Get quotes
app.quotes = function () {
    $.ajax({
        url: "https://api.adviceslip.com/advice",
        dataType: "json",
        method: "GET"
    }).then(function (response) {
        app.displayQuotes(response);
    });
};

//Get the main object, search by a city.
app.init = function () {
    $("form").trigger("reset");
    // Run Toronto AJAX as a default
    app.weatherForecast();
    app.makeCityArray();
    app.quotes();
};

//Document Ready
$(() => app.init());