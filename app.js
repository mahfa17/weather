//API from www.openweathermap.org
const api={
base:"https://api.openweathermap.org/data/2.5/",
key:"e5c9146c29bcad7c0eacc5fe3b1cbe2d"
}
//call weather by default city
let defCity=getResult('Tehran');
//call weather by searh
const search=document.querySelector('.search')
search.addEventListener('keyup',() =>{
        getResult(search.value);
    //clear search box
 search.addEventListener('blur',() =>{
  search.value=''
  })
})

//get API by city name
function getResult(city){
    fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
   .then(weather =>{
       return weather.json();
       //call function to show result
   }).then(displayResults);
}


//display weather result
function displayResults(weather){
// location
    let location=document.querySelector('.location');
    location.innerText=`${weather.name},${weather.sys.country}`
// date
    let now=new Date();
    let date=document.querySelector('.date');
    //call function to tranlate date()
    date.innerText=dateBuilder(now);

// icon
    //get weather description like sunny
    let weMain = weather.weather[0].main;
    //call function to get icon.svg
    let icon = getIcon(weMain);
    //set icon with that icon.svg
    let setIcon=document.querySelector('.icon');
    setIcon.innerHTML = `<img src='icon/${icon}'></img>`;

// temp
    let temp=document.querySelector('.temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}  <span>°C</span>`;
    
//weather description
    let we=document.querySelector('.weather');
    we.innerText=weather.weather[0].main;
}

//resolve icon.svg by name
function getIcon(weMain){
    let icon;
    //for diffrent icon like clear-Day or clear-Night
    const DayOrNigh = getDayOrNight();

    switch (weMain) {
        case 'Thunder':
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`;
            break;
        case 'Rain':
            icon = `${weMain}.svg`;
            break;
        case 'Snow':
            icon = `${weMain}.svg`;
            break;
        case 'Clear':
            icon = `${weMain}-${DayOrNigh}.svg`;
            break;
        case 'Clouds':
            icon = `${weMain}-${DayOrNigh}.svg`;
            break;
    }
    return icon;
}

// 
function getDayOrNight() {
    let DayOrNigh;
    var d = new Date();

    const hour = d.getHours();

    if (hour >= 6 && hour <= 19) {
        DayOrNigh = 'Day';
    } else {
        DayOrNigh = 'Night';
    }

    return DayOrNigh;
}

//
function dateBuilder(d){
    //translate monthNumbers to monthName
   let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
   let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
   
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;
}