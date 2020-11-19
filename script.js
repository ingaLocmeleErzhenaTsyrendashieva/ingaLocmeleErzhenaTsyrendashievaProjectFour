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
    // 
    let tempCelcia = Math.round(weatherData.main.temp);
    let feelLikeTemp = Math.round(weatherData.main.feels_like);
    
    //store data 
    const spanCity = `<span class="city">${weatherData.name},</span>`;
    const spanCountry = `<span class="country">${weatherData.sys.country}</span >`;
    const spanDateTime = `<span class="country">${localTime}</span >`;
    const spanTemp = `<br><span class="temp">${tempCelcia}&#8451;</span >`;
    const spanCloudy = `<br><span class="cloud">${weatherData.weather[0].description}</span >`;
    const spanFeelsLike = `<br><span class="feelsLike">Feels Like: ${feelLikeTemp}&#8451;</span >`;
    const spanWind = `<br><span class="wind">Wind: ${weatherData.wind.speed} km/h</span >`;
    const humidity = `<br><span class="humidity">Humidity: ${weatherData.main.humidity} %</span >`;
    // used .html to update data when user select city
    $('.cityCountry').html(spanCity+' '+spanCountry);   
    $('.currentWeather').html(spanDateTime + spanTemp + spanCloudy + spanFeelsLike + spanWind + humidity);  
   
}

// define function that displays quotes on the html page
app.displayQuotes = (dayQuote) =>{
    const advice = dayQuote.slip.advice;
    $('.quotes').html(`<span class="dayQuote">${advice}</span>`);  
}

//define a method which will initialize the app once the document is ready
app.init = function () {
    app.weatherForecast(app.cityName);
    userInput();
    app.quotes();
};

//Document Ready
$(() => app.init());

