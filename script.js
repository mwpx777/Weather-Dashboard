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
// this creates empty array for previous searches cities
var citiesArray = [];

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
        


        // create new <h5> tag
        var cityNameText = document.createElement("h5");
        // give <div> a class
        cityNameText.classList = "form-control btn btn-outline-dark align-center"
        // add text to the element
        cityNameText.textContent = searchFormText;
        // append to list
        cardText.appendChild(cityNameText)
        // append to page
        citiesContainer.appendChild(cardText);
        //push searchFormText into citiesArray    //this is not working!
        citiesArray.push(searchFormText);
        console.log(citiesArray);
        localStorage.setItem("cityName",citiesArray);

        // this clears the searchFormText
        searchForm.value = "";

    } else {
        alert("Please enter a city");
    }

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

        // } else {
        //     console.log('failure')
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
                // console.log(' new success');
            });

        // } else {
            // console.log('failure')
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
    getCurrentUv(latitude, longitude)

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

function savedSearch() {
    // console.log("savedSearch clicked");
    var cityButton= localStorage.getItem("cityName")
    console.log(cityButton)
  
}

function getFiveDay(searchForm) {
    // var fiveDay = "http://api.weatherstack.com/current?=84e256863183471e853edffeb72d3b4c&=Denver
    var fiveDay = "https://api.weather.yahoo.com/forecast?location=sunnyvale,ca&format=json"
    iEzDfZAZX1G0aBqrYjfZbvZnUWGVdXPn
    fetch(fiveDay).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // displayFiveDay(data);

            });

        } else {
            console.log('failure')
        }
    })
        .catch(function (error) {
            alert("There was a network error")
        })
        console.log(fiveDay)

}


// function displayFiveDay(weather) {
    
//     // console.log('fiveSuccess')
//     var date = weather.list[5].dt_txt
//     var splitDate = date.split(" ");
//     var temp = weather.list[5].main.temp
//     var humid = weather.list[5].main.humidity
//     var icon = weather.list[5].weather[0].main
//     console.log(typeof (icon))
    
//     if (icon == "Clouds") {
//         // tomorrowIcon.innerHTML = '<'i class= "fas fa-cloud"></i>
//         tomorrowIcon.innerHTML = '<span> <img src="Cloudy.svg"> </span>'
//     } else if (icon == "Clear") {
//         tomorrowIcon.innerHTML = '<span> <img src="Sunny.svg"> </span>'
//     } else if (icon == "Rain") {
//         tomorrowIcon.innerHTML = '<span> <img src="Rain.svg"> </span>'
//     } else if (icon == "Snow") {
//         tomorrowIcon.innerHTML = '<span> <img src="Snow.svg"> </span>'
//     }
//     for (var i=0; i<6; i++) {   //left off here--create elements on page for 5

//     tomorrowDate.textContent = splitDate[0]
//     // tomorrowIcon.textContent= 
//     tomorrowTemp.textContent = temp + "\u00B0 F"
//     tomorrowHumid.textContent = humid + "% Humidity"

// }};
function deleteUV() {
    uvValue.remove();
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

searchForm.addEventListener('dblclick', deleteUV)
searchButton.addEventListener('click', formSubmitHandler);
citiesContainer.addEventListener('click', savedSearch);

// previousButton.addEventListener('click', savedSearch);

