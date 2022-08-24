import { roundNumber } from "../utils/roudnNumb.js";
import { numberFull } from "../utils/setFullNumb.js";
/**
 * create card weather with api openWeather
 * @param {string} city 
 * @param {parentHTML} parent 
 * @param {string} keyUser 
 * @param {string} units 
 */
export async function meteo(city,parent,keyUser,units){
    const weat = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyUser}&units=${units}`) ;
    const repWeat = await weat.json();
    const articleNewCard = document.createElement("article");
    addClassCard(repWeat.weather[0].main,articleNewCard);

    articleNewCard.classList.add(`card`);
    articleNewCard.appendChild(paragCity(repWeat.name));
    articleNewCard.appendChild(paraCountry(repWeat.sys.country));
    articleNewCard.appendChild(setImg(repWeat.weather[0].main));
    articleNewCard.appendChild(setTemp(repWeat.main.temp));
    articleNewCard.appendChild(tempMinMax(repWeat.main.temp_min,repWeat.main.temp_max,repWeat.main.feels_like));
    articleNewCard.appendChild(sunSetRice(repWeat.sys.sunset ,repWeat.sys.sunrise));
    articleNewCard.appendChild(humidity(repWeat.main.humidity));
    if(repWeat.main.temp <= 4 && repWeat.main.temp >= 27){
        articleNewCard.appendChild(iconAlert(repWeat.main.temp));
    }

    addIcon(repWeat.main.temp,articleNewCard);
    articleNewCard.appendChild(setImgFavo());
    articleNewCard.appendChild(setimgRub());
    
    parent.appendChild(articleNewCard);
    eventImgFavo();
    eventSupCard();
   
}

function addClassCard(statuWeather,learner){
    switch(statuWeather){
        case "Clear": learner.classList.add("clear"); break;
        default:learner.classList.add("cloudy"); break;
    }
}

/**
 * set paragraph with country
 * @param {string} country 
 * @returns html paragraph
 */
function paraCountry(country){
    const p =document.createElement("p");
    p.classList.add("paraCount");
    p.innerText = `${country}`;
    return p;
}

/**
 * set paragraph with city name
 * @param {string} city 
 * @returns html paragraph
 */
function paragCity(city){
    const p = document.createElement("p");
    p.classList.add("paraCity");
    p.innerText = `${city}`;
    return p;
}

/**
 * 
 * @param {string} weatherStatu 
 * @returns html img
 */
function setImg(weatherStatu){ //(add of more variation later)
  
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

/**
 * 
 * @param {int} temp 
 * @returns html paragraph
 */
function setTemp(temp){
    const p =document.createElement("p");
    p.classList.add("paraTemp");
    p.innerText = `${roundNumber(temp)}°`;
    return p;
}

/**
 * 
 * @param {int} tempMin 
 * @param {int} tempMax 
 * @param {int} tempfeel 
 * @returns html paragraph
 */
function tempMinMax(tempMin,tempMax,tempfeel){
    const paragrtempMInMax = document.createElement("p");
    paragrtempMInMax.classList.add("tempMm")
    paragrtempMInMax.innerText = `${roundNumber(tempMax)}°/${roundNumber(tempMin)}° Feels like ${roundNumber(tempfeel)}°`;
    return paragrtempMInMax;
}

/**
 * set sunSet and sunRice article
 * @param {date} sunSet 
 * @param {date} sunRice 
 * @returns html article
 */
function sunSetRice(sunSet,sunRice){//(time not good for other country)
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
    paraHourRice.innerText = `${rice.getHours()}:${numberFull(rice.getMinutes())}`;
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
    paraHourSet.innerText = `${set.getHours()}:${numberFull(set.getMinutes())}`;
    secSet.appendChild(paraHourSet);
    artSet.appendChild(secSet);
    return artSet;
}



// for fun add icon bike 
function addIcon(temp,parent){
    if(temp >= 20 && temp <= 27){
        const imgIcon = document.createElement("img");
        imgIcon.classList.add("icon");
        imgIcon.src = "accets/img/pngwing.com.png";
        imgIcon.alt = "Icon biker";
        parent.appendChild(imgIcon);
    }
    return;
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
    imgGoute.src = "accets/img/weather-drop-svgrepo-com.svg"
    imgGoute.alt = "image drop of rain";
    humiSect.appendChild(imgGoute);

    const p = document.createElement("p");
    p.innerText = `${humi}%`;
    humiSect.appendChild(p);

    return humiSect;
}

function setImgFavo(){
    const imgFavo = document.createElement("img");
    imgFavo.classList.add("imgFavo");
    imgFavo.src = "accets/img/[CITYPNG.COM]HD Square Black Heart Love Icon PNG - 1146x1147.png",
    imgFavo.alt = "image Heart";
    return imgFavo;
}

function setimgRub(){
    const imgRub = document.createElement("img");
    imgRub.classList.add("rubbish");
    imgRub.src = "accets/img/kisspng-rubbish-bins-waste-paper-baskets-recycling-bin-c-5b3928a0a4b678.2952609415304726086747.png";
    imgRub.alt = "emote rubbish";
    return imgRub;
}

// call same time create card. Add or remove favori
function eventImgFavo(){
    const favoImg = document.getElementsByClassName("imgFavo");
    for(let item of favoImg){
        item.addEventListener("click", (item) => {
            const test = item.target.parentNode.querySelector(".paraCity");
            if(localStorage.length == 1){
                alert("only one favori pls");
                confirm("do you want to remove your favori ?")? clearStorage() : 0;
                return;
            }
            console.log(localStorage);
            addItemStorage(test.innerText);
        })
    };
}

function eventSupCard(){
    const imgDel = document.getElementsByClassName("rubbish");
    
    for(let item of imgDel){
        item.addEventListener("click", (item) => {
            const parentImgDel = item.target.parentNode;
            let grandParent = parentImgDel.parentNode;
            if(parentImgDel == grandParent.firstChild){
                grandParent.removeChild(grandParent.firstChild);
                 return;
            }
            else{grandParent.removeChild(parentImgDel);}
           
        })
    }
}

function addItemStorage (item) {
    localStorage.setItem("name", `${item}`);
}
  
  function clearStorage(){
      localStorage.clear();
}

 