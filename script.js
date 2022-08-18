let units = ["imperial","standard","metric"];
//fetch(`/api.teleport.org/api/cities/?search=${userInput}`);
const city = "london";
const theMain = document.querySelector("main");
const mainDiv = document.createElement("div");
mainDiv.classList.add("contenant");
const aInput = document.createElement("input");
aInput.classList.add("aInput");
aInput.value="london";
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

    const weat = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${event}&appid=d0170950f748b7c8700a8d0ec061faec&units=${units[2]}`) ;
    const repWeat = await weat.json();
    const newArticle = document.createElement("article");
    newArticle.classList.add(`card`);
    newArticle.appendChild(paragCity(repWeat.sys.country,repWeat.name));
    newArticle.appendChild(setImg(repWeat.weather[0].main));
    newArticle.appendChild(tempMinMax(repWeat.main.temp_min,repWeat.main.temp_max,repWeat.main.feels_like));
    newArticle.appendChild(sunSetRice(repWeat.sys.sunset ,repWeat.sys.sunrise))
    
    //console.log();
    sect.appendChild(newArticle);
}

function paragCity(country,city){
    const p = document.createElement("p");
    p.classList.add("paraCity");
    p.innerText = ` ${city} ,${country}`;
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
    const artSet = document.createElement("article");
    
    const secRice = document.createElement("section");
    secRice.classList.add("rice");
    const riceImg = document.createElement("img");
    riceImg.src = "accets/img/weather-sunny-low-svgrepo-com(1).svg"
    riceImg.alt = "image sun rice";
    secRice.appendChild(riceImg);
    const paraHourRice = document.createElement("p");
    paraHourRice.innerText = `${rice.getHours()}:${rice.getMinutes()}`;
    secRice.appendChild(paraHourRice);
    artSet.appendChild(secRice)

    const secSet = document.createElement("section");
    secSet.classList.add("set");    
    const setImg = document.createElement("img");
    setImg.src = "accets/img/weather-sunny-low-svgrepo-com.svg";
    setImg.alt = "image sun set";
    secSet.appendChild(setImg);
    const paraHourSet = document.createElement("p");
    paraHourSet.innerText = `${set.getHours()}:${set.getMinutes()}`;
    secSet.appendChild(paraHourSet);
    artSet.appendChild(secSet);
    return artSet;
}



const findBut = document.querySelector(".aButton");
const findInput = document.querySelector(".aInput");

findBut.addEventListener("click", () =>  meteo(findInput.value) );
findInput.addEventListener("keyup",(event) => {
    console.log(event.key);
    if(event.key == "Enter"){
        meteo(findInput.value);
    }
})

