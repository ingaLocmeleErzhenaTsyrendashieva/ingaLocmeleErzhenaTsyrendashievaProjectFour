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
app.weatherForecast = function(cityName) {
    app.cityName = cityName;
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
        console.log(response, "my quotes"); 
        app.displayQuotes(response);       
    });
};


// add event listener that takes user's input 
const userInput = () => {
    // console.log("ff")
   $('form').submit(function(e){
   e.preventDefault();
   let userInputCity = $('#userInput').val();
//    clear form after user hit submit button
       $("form").trigger("reset");
//    pass user's city to a function as a param
       app.weatherForecast(userInputCity);
   } )
}

// define function thats displays weather on the page html
app.displayWeather = (weatherData) => {
    //convert UTC to local time
    let localTime = moment.unix(weatherData.dt).utc()
        .utcOffset(weatherData.timezone/60)
        .format('ddd MMM D Y hh:mm:ss A ').toString();

    //store data 
    const spanCity = `<span class="city">${weatherData.name},</span>`;
    const spanCountry = `<span class="country">${weatherData.sys.country}</span >`;
    // console.log(spanCountry);
    const spanDateTime = `<span class="country">${localTime}</span >`;
    const spanTemp = `<br><span class="country">${weatherData.main.temp}</span >`;

    $('.cityCountry').html(spanCity+' '+spanCountry);   
    $('.currentWeather').html(spanDateTime + spanTemp );  
   
}

// define function thats displays quotes on the page html
app.displayQuotes = (dayQuote) =>{
    console.log(dayQuote);
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

