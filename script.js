let units = ["imperial","standard","metric"];
//fetch(`/api.teleport.org/api/cities/?search=${userInput}`);

const city = "london";
const theMain = document.querySelector("main");
const mainDiv = document.createElement("div");
mainDiv.classList.add("contenant");
const aInput = document.createElement("input");
aInput.classList.add("aInput");
aInput.value="charleroi";
mainDiv.appendChild(aInput);
const but = document.createElement("button");
but.classList.add("aButton");
but.innerText = "country";
mainDiv.appendChild(but);
const sect = document.createElement("section");
sect.classList.add("album");
mainDiv.appendChild(sect);
theMain.appendChild(mainDiv);

async function meteo(event){

    const weat = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${event}&appid=d0170950f748b7c8700a8d0ec061faec&units=${units[2]}`) ;
    const repWeat = await weat.json();
    const newArticle = document.createElement("article");
    newArticle.classList.add(`card`);
    newArticle.appendChild(paragCity(repWeat.sys.country,repWeat.name));
    newArticle.appendChild(setImg(repWeat.weather[0].main));
    newArticle.appendChild(setTemp(repWeat.main.temp));
    newArticle.appendChild(tempMinMax(repWeat.main.temp_min,repWeat.main.temp_max,repWeat.main.feels_like));
    newArticle.appendChild(sunSetRice(repWeat.sys.sunset ,repWeat.sys.sunrise));
    newArticle.appendChild(humidity(repWeat.main.humidity));
    if(repWeat.main.temp <= 4 && repWeat.main.temp >= 27){
        newArticle.appendChild(iconAlert(repWeat.main.temp));
    }

    if(repWeat.main.temp >= 20 && repWeat.main.temp <= 27){
        newArticle.appendChild(addIcon());
    }
    //console.log();
    sect.appendChild(newArticle);
}

function paragCity(country,city){
    const p = document.createElement("p");
    p.classList.add("paraCity");
    p.innerText = `${city}, ${country}`;
    return p;
}

//set picture(see of more variation later)
function setImg(weatherStatu){
    const picture = document.createElement("img");
    picture.classList.add("imgWeather");
    switch(weatherStatu){
        case "Clear": picture.src = "accets/img/sunny-weather-svgrepo-com.svg";
                picture.alt= "Icon weather clear.";
         break;
        case "Clouds":picture.src = "accets/img/cloudy-weather-svgrepo-com(1).svg";
                picture.alt= "Icon weather cloud.";
         break;
        case "Rain": picture.src = "accets/img/weather-rain-showers-day-svgrepo-com.svg";
                picture.alt= "Icon weather rain.";
         break;
        case "Thunderstorm":picture.src = "accets/img/weather-wind-storm-rain-svgrepo-com.svg";
                picture.alt= "Icon weather thunderstorm.";
         break;
        case "Snow":picture.src = "accets/img/weather-snow-shower-day-svgrepo-com.svg";
                picture.alt= "Icon weather snow.";
         break;
        default: picture.src ="accets/img/weather-fog-svgrepo-com.svg";
                picture.alt= "Icon weather fog.";
         break;
    }
    return picture;
}

function setTemp(temp){
    const p =document.createElement("p");
    p.classList.add("paraTemp");
    p.innerText = `${roundNumber(temp)}°`;
    return p;
}

function tempMinMax(tempMin,tempMax,tempfeel){
    const paragrtempMInMax = document.createElement("p");
    paragrtempMInMax.classList.add("tempMm")
    paragrtempMInMax.innerText = `${roundNumber(tempMax)}°/${roundNumber(tempMin)}° Feels like ${roundNumber(tempfeel)}°`;
    return paragrtempMInMax;
}


function roundNumber(number){
    const finalNumber =  number.toFixed(0);
    return finalNumber;
}

function sunSetRice(sunSet,sunRice){
    const set = new Date(sunSet*1000);
    const rice = new Date(sunRice*1000);
    const artSet = document.createElement("section");
    artSet.classList.add("sunSetRice");
    const secRice = document.createElement("article");
    secRice.classList.add("set");
    const riceImg = document.createElement("img");
    riceImg.src = "accets/img/weather-sunny-low-svgrepo-com.svg"
    riceImg.alt = "image sun rice";
    secRice.appendChild(riceImg);
    const paraHourRice = document.createElement("p");
    paraHourRice.classList.add("noMarg");
    paraHourRice.innerText = `${rice.getHours()}:${numberHourFull(rice.getMinutes())}`;
    secRice.appendChild(paraHourRice);
    artSet.appendChild(secRice)

    const secSet = document.createElement("article");
    secSet.classList.add("set");
    const setImg = document.createElement("img");
    setImg.src = "accets/img/weather-sunny-low-svgrepo-com(1).svg";
    setImg.alt = "image sun set";
    secSet.appendChild(setImg);
    const paraHourSet = document.createElement("p");
    paraHourSet.classList.add("noMarg");
    paraHourSet.innerText = `${set.getHours()}:${numberHourFull(set.getMinutes())}`;
    secSet.appendChild(paraHourSet);
    artSet.appendChild(secSet);
    return artSet;
}

function numberHourFull(numb){
    return String(numb).padStart(2,"0");
}

function addIcon(){
    const imgIcon = document.createElement("img");
    imgIcon.classList.add("icon");
    imgIcon.src = "accets/img/pngwing.com.png";
    imgIcon.alt = "Icon biker";
    return imgIcon;
}
function iconAlert(temp){
    if(temp < 4){
        const imgCold = document.createElement("img");
        imgCold.classList.add("imgAlert");
        imgCold.src = "accets/img/forecast-thermometer-weather-temperature-winter-cold-svgrepo-com.svg";
        imgCold.alt = "";
        return imgCold;
    }
    if(temp > 27){
        const imgWarm = document.createElement("img");
        imgWarm.classList.add("imgAlert");
        imgWarm.src = "accets/img/tforecast-hermometer-weather-temperature-summer-hot-svgrepo-com.svg";
        imgWarm.alt = "";
        return imgWarm;
    }
}

function humidity(humi){
    const humiSect = document.createElement("section");
    humiSect.classList.add("sectHumidity");

    const imgGoute = document.createElement("img");
    imgGoute.src = "/accets/img/weather-drop-svgrepo-com.svg"
    imgGoute.alt = "image drop of rain";
    humiSect.appendChild(imgGoute);

    const p = document.createElement("p");
    p.innerText = `${humi}%`;
    humiSect.appendChild(p);

    return humiSect;
}
const findBut = document.querySelector(".aButton");
const findInput = document.querySelector(".aInput");

findBut.addEventListener("click", () =>  meteo(findInput.value) );
findInput.addEventListener("keyup",(event) => {
    if(event.key == "Enter"){
        meteo(findInput.value);
    }
});





function addItemStorage (item) {
  let listName = JSON.parse(localStorage.getItem("name", "[]"));
  listName.push(item);
  localStorage.setItem("name", JSON.stringify(listName));
}
function getAllItems () {
  return JSON.parse(localStorage.getItem("name", "[]"));
}
function clearStorage(){
    localStorage.clear();
}
