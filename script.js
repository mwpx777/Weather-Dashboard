let seachButton = document.querySelector("#searchButton")
let searchForm = document.querySelector("#searchForm")
let cardText = document.querySelector("#cardText")
let citiesContainer = document.querySelector("#citiesContainer")
let currentCityName = document.querySelector("#currentCityName")
let temperature = document.querySelector("#temperature")
let humidity = document.querySelector("#humidity")
let windSpeed = document.querySelector("#windSpeed")
let uvIndex = document.querySelector("#uvIndex")
let uvValue = document.querySelector("#uvValue")
let tomorrowDate = document.querySelector("#date")
let tomorrowTemp = document.querySelector("#temp")
let tomorrowHumid = document.querySelector("#humid")
let tomorrowIcon = document.querySelector("#icon")
let previousSearches = document.querySelector('#previous')
let citySearches = document.querySelector(".citySearches")
// this creates empty array for previous searches cities
// var citiesArray = [];

function formSubmitHandler(event) {

    event.preventDefault();
    // get value from input element
    var searchFormText = searchForm.value.trim();

    if (searchFormText) {
        // console.log(searchFormText)
        currentCityName.textContent = searchFormText
        //this will pass searchForm.value into getCurrentWeather function as argument
        getCurrentWeather(searchFormText);
        getFiveDay(searchFormText);

         // create new <li> tag
        var cityNameText = document.createElement("li");
        // give <div> a class
        cityNameText.classList = "listEl form-control btn btn-outline-dark align-center"
        // add text to the element
        cityNameText.textContent = searchFormText;
        // append cityNameText to citySearches
        citySearches.appendChild(cityNameText)


        // this clears the searchFormText
        searchForm.value = "";


    } else {
        alert("Please enter a city");
    }

};
function getSavedWeather(cityNameHistory) {
    currentCityName.innerHTML = cityNameHistory;
    uvValue.innerHTML = "";

    var weather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameHistory + "&units=imperial&appid=aa99fd2fc316f423fddae9487450c4d8"

    // console.log(cityName);

    fetch(weather).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrentWeather(data);
                getCurrentUv(data);
                // console.log('success');
            });
        }
    })
        .catch(function (error) {
            alert("There was a network error")
        })

};

function getCurrentWeather(searchForm) {

    var weather = "https://api.openweathermap.org/data/2.5/weather?q=" + searchForm + "&units=imperial&appid=aa99fd2fc316f423fddae9487450c4d8"

    // console.log(searchForm);

    fetch(weather).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrentWeather(data);
                getCurrentUv(data);
                // console.log('success');
            });
        }
    })
        .catch(function (error) {
            alert("There was a network error")
        })

};
function getCurrentUv(latitude, longitude) {
    var uvIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=aa99fd2fc316f423fddae9487450c4d8"

    fetch(uvIndex).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrentUvIndex(data);
            });
        }
    })
        .catch(function (error) {
            alert("There was a network error")
        })
};

function displayCurrentWeather(weather) {
    var currentTemp = weather.main.temp
    var currentHumidity = weather.main.humidity
    var currentWindSpeed = weather.wind.speed
    var latitude = weather.coord.lat
    var longitude = weather.coord.lon

    temperature.textContent = "Temperature:  " + currentTemp + "\u00B0 F"
    humidity.textContent = "Humidity: " + currentHumidity + " %"
    windSpeed.textContent = "Wind Speed: " + currentWindSpeed + " mph"
    // console.log(longitude);
    // console.log(latitude);
    getCurrentUv(latitude, longitude);
    getFiveDay(latitude, longitude);

};

function displayCurrentUvIndex(weather) {
    // console.log('UV Success!');
    var currentUvIndex = weather.current.uvi

    if (currentUvIndex < 2.1) {
        // create new <h6> tag
        var goodUV = document.createElement("h5");
        // give <div> a class
        goodUV.classList = " p-2  justify-content-center"
        goodUV.style.width = '25%';
        goodUV.style.background = 'green';
        goodUV.style.color = 'white';
        // add text to the element
        goodUV.textContent = "UV Index: " + currentUvIndex;
        // append to list
        uvValue.appendChild(goodUV)
        // append to page

    } else if (currentUvIndex > 2.1 && currentUvIndex < 5) {

        // create new <h6> tag
        var goodUV = document.createElement("h5");
        // give <div> a class
        goodUV.classList = " p-2 "
        goodUV.style.width = '25%';
        goodUV.style.background = 'yellow';
        goodUV.style.color = 'black';
        goodUV.textContent = "UV Index: " + currentUvIndex;
        // append to list
        uvValue.appendChild(goodUV)

    } else if (currentUvIndex > 5.1) {
        // create new <h6> tag
        var goodUV = document.createElement("h5");
        // give <div> a class
        goodUV.classList = " p-2 "
        goodUV.style.width = '25%';
        goodUV.style.background = 'red';
        goodUV.style.color = 'white';
        goodUV.textContent = "UV Index: " + currentUvIndex;
        // append to list
        uvValue.appendChild(goodUV)
    }
};
    
    $('.citySearches').on('click', 'li', function () {
        var cityNameHistory = $(this).text();
        currentCityName.innerHTML = "";
        getSavedWeather(cityNameHistory);
        // console.log(cityNameHistory)
    });


function getFiveDay(latitude, longitude) {

    var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=current,minutely,hourly&units=imperial&appid=aa99fd2fc316f423fddae9487450c4d8"

    fetch(fiveDay).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // console.log("this works!")
                displayFiveDay(data);
                console.log(data)
            });

        } else {
            console.log('failure')
        }
    })
        .catch(function (error) {
            alert("There was a network error")
        })
}


function displayFiveDay(daily) {

    //console.log('fiveSuccess')
    let day = moment().format('MM/DD')

    let humid = 30;
    let temp = 60;
    let icon = "Clouds"


    // let temp = daily[1].temp.max
    // let humid = daily[1].humidity
    // let icon = daily[1].weather[1].main
    console.log(temp)

    if (icon == "Clouds") {
        // tomorrowIcon.innerHTML = '<'i class= "fas fa-cloud"></i>
        tomorrowIcon.innerHTML = '<span> <img src="Cloudy.svg"> </span>'
    } else if (icon == "Clear") {
        tomorrowIcon.innerHTML = '<span> <img src="Sunny.svg"> </span>'
    } else if (icon == "Rain") {
        tomorrowIcon.innerHTML = '<span> <img src="Rain.svg"> </span>'
    } else if (icon == "Snow") {
        tomorrowIcon.innerHTML = '<span> <img src="Snow.svg"> </span>'
    }
    for (var i = 0; i <= 5; i++) {   //left off here--create elements on page for 5

        tomorrowDate.textContent = day

        tomorrowTemp.textContent = temp + "\u00B0 F"
        tomorrowHumid.textContent = humid + "% Humidity"

    }
};

function deleteUV() {
    uvValue.innerHTML = "";
}


function displayDate() {
    //this takes current date from moment()
    let currentDate = moment().format('MMMM Do,  YYYY  h:mm:ss A');
    // this displays currentDate on page in .date area
    document.querySelector("#timeSpan").innerHTML = currentDate;
}
//this calls the displayDate function every 1000ms
setInterval(displayDate, 1000);

displayDate();

searchForm.addEventListener('click', deleteUV)
searchButton.addEventListener('click', formSubmitHandler);
// citiesContainer.addEventListener('click', savedSearch);
