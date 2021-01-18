let seachButton = document.querySelector("#searchButton")

function searchCity(event){
    // console.log('button clicked')
      // this will assign the 'data-language' value from the clicked button to this variable 'language'
      var cityName = event.target.getAttribute("data-city");
      console.log(cityName)
    //   if(language){
    //       getFeaturedRepos(language);
    //   }
    //   // clear out previous content
    //   repoContainerEl.textContent ="";
    // api.openweathermap.org/data/2.5/forecast?q={data-object-type}&appid={API key}

};


function displayDate() {
    //this takes current date from moment()
    let currentDate = moment().format('MMMM Do,  YYYY  h:mm:ss A');
    // this displays currentDate on page in .date area
    document.querySelector("#timeSpan").innerHTML = currentDate;
}

//this calls the displayDate function every 1000ms
setInterval(displayDate, 1000);

displayDate();

searchButton.addEventListener('click', searchCity);
    
