// create a namespace object to represent app
// const weatherApp = {};
const app = {};
// store api key within app object
app.apiKey = 'b60c0d3d756074360b47925c6dd50cb8';
// store the root endpoint of the API within app object
app.api = 'https://api.openweathermap.org/data/2.5/weather';
// declear variable with default data
app.cityName = "Toronto";
app.metric = "metric";
// global variable

// Get data from JSON file
const localData = cityList;

// City name array
app.cityArray = [];
app.idArray = [];


// Weather Forecast
app.weatherForecast = function(cityName) {
    app.cityName = cityName;
    $.ajax({
        url: app.api,
        dataType: "json",
        method: "GET",
        data:{
            q: app.cityName,
            appid: app.apiKey,
            units: app.metric           
        }
    }).then(function (response) {
        console.log(response,"mycode");
        app.displayWeather(response);
    });
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

//Function for jQuery UI, // adding aditional method to decrease results to 10 by using slice
// jQuery UI script adjusted to search values only by the first letter
app.jqueryUiAutoFill = function () {
    $(function () {
        $(".userCityInput").autocomplete({
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

// add event listener that takes user's input 
const userInput = () => {
   $('form').submit(function(e){
        e.preventDefault();
        let userInputCity = $('#userInput').val();
        //clear form after user hit submit button
        $("form").trigger("reset");
        //pass user's city to a function
        app.weatherForecast(userInputCity);
   } )
}

// define function thats displays weather on the page html
app.displayWeather = (weatherData) => {
    //convert UTC to local time
    let localTime = moment.unix(weatherData.dt).utc()
        .utcOffset(weatherData.timezone/60)
        .format('ddd MMM D Y hh:mm:ss A ').toString();
    //round tempreture
    let tempCelcia = Math.round(weatherData.main.temp);
    let feelLikeTemp = Math.round(weatherData.main.feels_like);
    
    //store data 
    const currentCityWeather = `<li class="currentCityCountry">${weatherData.name},  ${weatherData.sys.country}</li>
                                <li class="currentTime"><time datetime="">${localTime}</time></li> 
                                <li class="currentTemp"><span class="currentCityTemp">${tempCelcia}</span>&#8451;</li>
                                <li class="currentCloud">${weatherData.weather[0].description} <img src="./styles/amchartsWeatherIcons1.0.0/animated/cloudy-day-1.svg" alt="cloudy"></img></li>
                                <li class="currentFeelsLike">Feels Like: <span class="feelsLike">${feelLikeTemp}</span> &#8451;</li>
                                <li class="currentWind"><span class="wind">Wind: ${weatherData.wind.speed}</span>km/h</li>
                                <li class="currentHumidity"><span class="humidity">Humidity: ${weatherData.main.humidity}</span> %</li >
                                
                                `;   
    // used .append to update data when user select city
    $('.currentWeather').append(currentCityWeather);   
    
    
   
}

// define function that displays quotes on the html page
app.displayQuotes = (dayQuote) =>{
    const advice = dayQuote.slip.advice;
    $('.quotes').html(`<span class="dayQuote">${advice}</span>`);  
}

//define a method which will initialize the app once the document is ready
app.init = function () {
    app.weatherForecast(app.cityName);
    app.makeCityArray();
    userInput();
    app.quotes();
};









//Document Ready
$(() => app.init());

