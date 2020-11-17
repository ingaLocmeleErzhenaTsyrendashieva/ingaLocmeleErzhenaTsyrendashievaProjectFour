const app = {};


//Get the main object.
app.init = function () {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=London&appid=b60c0d3d756074360b47925c6dd50cb8",
        dataType: "json",
        method: "GET"
    }).then(function (response) {
        console.log(response);

        app.init2 = function () {
            $.ajax({
                // url: "https://quote-garden.herokuapp.com/api/v2/quotes/random",
                url: " 	https://api.adviceslip.com/advice",

                dataType: "json",
                method: "GET"
            }).then(function (response) {
                console.log(response);
            });
        };

        app.init2();

    });
};

//Get the main object.


//Document Ready
$(() => app.init());