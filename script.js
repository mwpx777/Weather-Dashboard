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
let fiveDayContainer = document.querySelector('#fiveDayContainer')
let fiveDayHead = document.querySelector('#fiveDayHead')
let weatherIcon = document.querySelector('#weatherIcon')
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

        // create new <li> tag
        var cityNameText = document.createElement("li");
        // give <div> a class
        cityNameText.classList = "listEl form-control btn btn-outline-dark align-center"
        // add text to the element
        cityNameText.textContent = searchFormText;
        // append cityNameText to citySearches
        citySearches.appendChild(cityNameText)
        citiesArray.push(searchFormText)
        localStorage.setItem("cities", JSON.stringify (citiesArray))
        


        // this clears the searchFormText
        searchForm.value = "";


    } else {
        alert("Please enter a city");
    }
};


function getLocalStorage(){
    // if there aren't items in localStorage array, create new empty array
    if(localStorage.getItem('cities') === null){
        citiesArray = [];
    // else JSON.parse the localStorage "cities" items and bring it back to page
    }else{
        citiesArray = JSON.parse(localStorage.getItem('cities'))
    }
 
    citiesArray.forEach(function(stored){
                
    var cityNameText = document.createElement("li");
    // give <div> a class
    cityNameText.classList = "listEl form-control btn btn-outline-dark align-center"
    // add text to the element
    cityNameText.textContent = stored;
    // append cityNameText to citySearches
    citySearches.appendChild(cityNameText)
    })
};   


getLocalStorage();



function getSavedWeather(cityNameHistory) {
    currentCityName.innerHTML = cityNameHistory;
    uvValue.innerHTML = "";
    fiveDayContainer.innerHTML = "";
    fiveDayHead.innerHTML = "";

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

 setInterval(getCurrentWeather, 60000);
 


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

setInterval(getCurrentUv, 60000);



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
function displayCurrentIcon(daily){
    var icon = daily[0].weather[0].main
    console.log(icon)
    
    
        if (icon == "Clouds") {
            // tomorrowIcon.innerHTML = '<'i class= "fas fa-cloud"></i>
            weatherIcon.innerHTML =  '<img src="Cloudy1.svg" width = 100px>'
        } else if (icon == "Clear") {
            weatherIcon.innerHTML = ' <img src="Sunny.svg" width = 100px>'
        } else if (icon == "Rain") {
            weatherIcon.innerHTML = ' <img src="Rain.svg" width = 100px> '
        } else if (icon == "Snow") {
            weatherIcon.innerHTML = ' <img src="Snow.svg" width = 100px> '
        }

        

    }


   

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

//variable for sending cityNameHistory to getSavedWeather function
$('.citySearches').on('click', 'li', function () {
    var cityNameHistory = $(this).text();
    currentCityName.innerHTML = "";
    weatherIcon.innerHTML = "",
    getSavedWeather(cityNameHistory);
});


function getFiveDay(latitude, longitude) {

    var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=alerts,current,minutely,hourly&units=imperial&appid=aa99fd2fc316f423fddae9487450c4d8"

    fetch(fiveDay).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                //  console.log("this works!")
                // this passes just the daily array to displayFiveDay
                displayFiveDay(data.daily);
                displayCurrentIcon(data.daily);

                // console.log(data)
            });

        }
    })
        .catch(function (error) {
            alert("There was a network error")
        })
}


function displayFiveDay(daily) {

    var fiveDayHeader = document.createElement('h2')
    fiveDayHeader.textContent= "5 Day Forcast"
    fiveDayHead.appendChild(fiveDayHeader)
  
    // console.log(daily)
    
    for (var i = 0; i < 5; i++) { 
        // this grabs dt timestamp
        let unix_timestamp = daily[i].dt
        // this converts unix_timestamp to date and splits the time off only displaying the [0] array which is the date
        var timeStamp = new Date(unix_timestamp * 1000).toLocaleString().split(",")[0];

        let temp = daily[i].temp.max
        let humid = daily[i].humidity
        let icon = daily[i].weather[0].main
        let wind = daily[i].wind_speed
        
        // create weather box
        var weatherBox = document.createElement("div")
        weatherBox.classList =  "column card border-secondary p-3 m-3 shadow bg-light rounded"

        var fiveDayDate = document.createElement('span')
        fiveDayDate.classList = "fiveDayDate"
        fiveDayDate.textContent = timeStamp
        weatherBox.appendChild(fiveDayDate)

        var fiveDayIcon = document.createElement('span')
        fiveDayIcon.classList = "fiveDayIcon"
        if (icon == "Clouds") {
            // tomorrowIcon.innerHTML = '<'i class= "fas fa-cloud"></i>
            fiveDayIcon.innerHTML =  '<img src="Cloudy1.svg" width = 100px>'
        } else if (icon == "Clear") {
            fiveDayIcon.innerHTML = ' <img src="Sunny.svg" width = 100px>'
        } else if (icon == "Rain") {
            fiveDayIcon.innerHTML = ' <img src="Rain.svg" width = 100px> '
        } else if (icon == "Snow") {
            fiveDayIcon.innerHTML = ' <img src="Snow.svg" width = 100px> '
        }
        weatherBox.appendChild(fiveDayIcon)

        var fiveDayTemp = document.createElement('span')
        fiveDayTemp.classList = "fiveDatTemp"
        fiveDayTemp.textContent = temp + "\u00B0 F"
        weatherBox.appendChild(fiveDayTemp)

        var fiveDayHumid = document.createElement('span')
        fiveDayHumid.classList = "fiveDayHumid"
        fiveDayHumid.textContent = humid + "% Humidity"
        weatherBox.appendChild(fiveDayHumid)

        var fiveDayWind = document.createElement('span')
        fiveDayWind.classList = "fiveDayWind"
        fiveDayWind.textContent = wind + " mph"
        weatherBox.appendChild(fiveDayWind)

        fiveDayContainer.appendChild(weatherBox)
    }
};

function deleteUV() {
    uvValue.innerHTML = "";
    fiveDayContainer.innerHTML = "";
    fiveDayHead.innerHTML = "";
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

