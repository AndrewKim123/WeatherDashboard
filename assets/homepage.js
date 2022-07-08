var userFormE1 = document.querySelector('#user-form');
var apiKey = '7d56b09deb595c7e0398f5af5c337bf4';


var formSubmitHandler = function (event) {
    //prevent page from refreshing
    event.preventDefault();


    
    var city = document.querySelector('#city').value
    console.log(city);

    // picks up current CITY values 
    var singleCity = document.querySelector('#todayCity')
    var singleTemp = document.querySelector('#todayTemp')
    var singleWind = document.querySelector('#todayWind')
    var singleHumidity =document.querySelector('#todayHumidity')
    var singleUV = document.querySelector('#todayUV')

    // picks up 5 Day Values
    var day5 = document.querySelector('#repo-search-term')

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`).then(response=> {
    return response.json();
}).then(data=> {
    console.log(data[0].lat);
    console.log(data[0].lon);

    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`
    ).then(response=> {
        return response.json();
    }
    ).then(data=> {

        // picks up current CITY values 
        console.log(data);
         
        singleCity.innerHTML = `
        <h2 class="subtitle" id="todayCity">${city}</h2> 
        <h3 class="subtitle" id="todayTemp">Temp: ${data.current.temp} degrees F.</h3>
        <h3 class="subtitle" id="todayWind">Wind: ${data.current.wind_speed} MPH</h3>
        <h3 class="subtitle" id="todayHumidity">Humidity: ${data.current.humidity}%</h3>
        `
       var h3element = document.createElement("h3");
       h3element.innerHTML = 
       `UVI: ${data.current.uvi}`
       
     //  UV Index (Green, Yellow, Red)
       if (data.current.uvi < 2){
          h3element.setAttribute('class', 'text-success');
       } else if (data.current.uvi < 7){
          h3element.setAttribute('class', 'text-warning');
       } else {
          h3element.setAttribute('class', 'text-danger');
       }

       singleCity.appendChild(h3element);

        // picks up 5 Day Values
        day5.innerHTML = 
        `
        <div class="row">
        <div class="card col-lg-2 col-md-2 m-1">
        <h3 class="subtitle" id="todayTemp">Temp: ${data.daily[0].temp.day} degrees F.</h3>
        <h3 class="subtitle" id=todayWind">Wind: ${data.daily[0].wind_speed} MPH. </h3>
        <h3 class="subtitle" id=todayWind">Wind: ${data.daily[0].humidity} %. </h3>
        <img src="https://openweathermap.org/img/w/${data.daily[0].weather[0].icon}.png" width="50" height="50">
        </div>

        <div class="card col-lg-2 col-md-2 m-1">
        <h3 class="subtitle" id="todayTemp">Temp: ${data.daily[1].temp.day} degrees F.</h3>
        <h3 class="subtitle" id=todayWind">Wind: ${data.daily[1].wind_speed} MPH. </h3>
        <h3 class="subtitle" id=todayWind">Wind: ${data.daily[1].humidity} %. </h3>
        <img src="https://openweathermap.org/img/w/${data.daily[1].weather[0].icon}.png" width="50" height="50">
        </div>

        <div class="card col-lg-2 col-md-2 m-1">
        <h3 class="subtitle" id="todayTemp">Temp: ${data.daily[2].temp.day} degrees F.</h3>
        <h3 class="subtitle" id=todayWind">Wind: ${data.daily[2].wind_speed} MPH. </h3>
        <h3 class="subtitle" id=todayWind">Wind: ${data.daily[2].humidity} %. </h3>
        <img src="https://openweathermap.org/img/w/${data.daily[2].weather[0].icon}.png" width="50" height="50">
        </div>

        <div class="card col-lg-2 col-md-2 m-1">
        <h3 class="subtitle" id="todayTemp">Temp: ${data.daily[3].temp.day} degrees F.</h3>
        <h3 class="subtitle" id=todayWind">Wind: ${data.daily[3].wind_speed} MPH. </h3>
        <h3 class="subtitle" id=todayWind">Wind: ${data.daily[3].humidity} %. </h3>
        <img src="https://openweathermap.org/img/w/${data.daily[3].weather[0].icon}.png" width="50" height="50">
        </div>
        
        <div class="card col-lg-2 col-md-2 m-1">
        <h3 class="subtitle" id="todayTemp">Temp: ${data.daily[4].temp.day} degrees F.</h3>
        <h3 class="subtitle" id=todayWind">Wind: ${data.daily[4].wind_speed} MPH. </h3>
        <h3 class="subtitle" id=todayWind">Wind: ${data.daily[4].humidity} %. </h3>
        <img src="https://openweathermap.org/img/w/${data.daily[4].weather[0].icon}.png" width="50" height="50">
        </div>
        </div>
        `

        
        
    })
}) 
};

// add event listeneres to forms
userFormE1.addEventListener('submit', formSubmitHandler);



