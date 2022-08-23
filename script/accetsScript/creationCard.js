let units = ["imperial","standard","metric"];
//create card weather with api openWeather
export async function meteo(event,parent){
    const weat = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${event}&appid=d0170950f748b7c8700a8d0ec061faec&units=${units[2]}`) ;
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
    if(repWeat.main.temp >= 20 && repWeat.main.temp <= 27){
        articleNewCard.appendChild(addIcon());
    }
    articleNewCard.appendChild(setImgFavo());
    articleNewCard.appendChild(setimgRub());
    
    parent.appendChild(articleNewCard);
    eventImgFavo();
    eventSupCard();
   
}

function addClassCard(statuWeather,learn){
    switch(statuWeather){
        case "Clear": learn.classList.add("clear"); break;
        default:learn.classList.add("cloudy"); break;
    }
}
function paraCountry(country){
    const p =document.createElement("p");
    p.classList.add("paraCount");
    p.innerText = `${country}`;
    return p;
}

function paragCity(city){
    const p = document.createElement("p");
    p.classList.add("paraCity");
    p.innerText = `${city}`;
    return p;
}

//set picture weather(add of more variation later)
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
//set sunSet and sunRice on the card (time not good for other country)
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

function numberHourFull(number){
    return String(number).padStart(2,"0");
}

// for fun add icon bike 
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

 