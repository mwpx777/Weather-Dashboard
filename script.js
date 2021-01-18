let seachButton = document.querySelector("#searchButton")
let searchForm = document.querySelector("#searchForm")
let cardText = document.querySelector("#cardText")
let citiesContainer = document.querySelector("#citiesContainer")
let currentCityName = document.querySelector("#currentCityName")

function formSubmitHandler(event){
    event.preventDefault();
    // get value from input element
    var searchFormText = searchForm.value.trim();
    
    if (searchFormText){
        // console.log(searchFormText)
        currentCityName.textContent = searchFormText
        //this will pass searchForm.value into getCurrentWeather function as argument
        //  getCurrentWeather(searchFormText);
        //  add div tag to search for city column
        // create new <h5> tag
        var cityNameText = document.createElement("h5");
        // give <div> a class
        cityNameText.classList="form-control btn btn-outline-dark align-center"
        // add text to the element
        cityNameText.textContent=searchFormText;
        // append to list
        cardText.appendChild(cityNameText)
        // append to page
        citiesContainer.appendChild(cardText);
        // this clears the searchFormText
        searchForm.value = "";               
    }else{
        alert("Please enter a city");
    }

};

function getCurrentWeather(searchFormText){

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
    
