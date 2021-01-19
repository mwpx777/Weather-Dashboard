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

function formSubmitHandler(event) {
    event.preventDefault();
    // get value from input element
    var searchFormText = searchForm.value.trim();

    if (searchFormText) {
        // console.log(searchFormText)
        currentCityName.textContent = searchFormText
        //this will pass searchForm.value into getCurrentWeather function as argument
        getCurrentWeather(searchFormText);

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
                console.log('success');
            });

        } else {
            console.log('failure')
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
                console.log(' new success');
            });

        } else {
            console.log('failure')
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
    console.log(longitude);
    console.log(latitude);
    getCurrentUv(latitude, longitude)

};

function displayCurrentUvIndex(weather) {
    console.log('UV Success!');
    var currentUvIndex = weather.current.uvi
    if (currentUvIndex < 2.1) {
        // create new <h6> tag
        var goodUV = document.createElement("h6");
        // give <div> a class
        goodUV.classList = "btn btn-success p-2 "
        // add text to the element
        goodUV.textContent = currentUvIndex;
        // append to list
        uvValue.appendChild(goodUV)
        // append to page




    } else if (currentUvIndex > 2.1 && currentUvIndex < 5) {

        // create new <h6> tag
        var goodUV = document.createElement("h6");
        // give <div> a class
        goodUV.classList = "btn btn-warning p-2 "
        // add text to the element
        goodUV.textContent = currentUvIndex;
        // append to list
        uvValue.appendChild(goodUV)


    } else if (currentUvIndex > 5.1) {
        // create new <h6> tag
        var goodUV = document.createElement("h6");
        // give <div> a class
        goodUV.classList = "btn btn-danger p-2 "
        // add text to the element
        goodUV.textContent = currentUvIndex;
        // append to list
        uvValue.appendChild(goodUV)

    }




    // uvIndex.textContent = "UV Index: " + currentUvIndex
};

function savedSearch() {
    var savedSearch = button.innerHTML.trim();

    var weather = "https://api.openweathermap.org/data/2.5/forecast?q=" + savedSearch + "&appid=aa99fd2fc316f423fddae9487450c4d8"

    console.log(searchForm);

    fetch(weather).then(function (response) {
        if (response.ok) {
            console.log('success')
        } else {
            console.log('failure')
        }
    })
        .catch(function (error) {
            alert("There was a network error")
        })
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

searchButton.addEventListener('click', formSubmitHandler);

// previousButton.addEventListener('click', savedSearch);

