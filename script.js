let units = ["imperial","standard","metric"];

const theMain = document.querySelector("main");
const mainDiv = document.createElement("div");
mainDiv.classList.add("contenant");

const divInput = document.createElement("div");
divInput.classList.add("divInput");

const aInput = document.createElement("input");
aInput.classList.add("aInput");

aInput.value="charleroi";
mainDiv.appendChild(aInput);

aInput.value="";
divInput.appendChild(aInput);

const but = document.createElement("button");
but.classList.add("aButton");
but.innerText = "confirm";
divInput.appendChild(but);
const list = document.createElement("ul");
list.setAttribute("id","city");
divInput.appendChild(list);

mainDiv.appendChild(divInput);



const butFavo = document.createElement("button");
butFavo.innerText = "Favori";
butFavo.classList.add("favo");
mainDiv.appendChild(butFavo);



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
//create list seletion
async function countryList(){
    const listCity = document.querySelector("#city");
    const valueInput = document.querySelector(".aInput");
    if(!valueInput.value){
        while (listCity.firstChild){
            listCity.removeChild(listCity.lastChild);
        }
        return;
    }
    while (listCity.firstChild){
        listCity.removeChild(listCity.lastChild);
    }
     const listCountry = await fetch(`https://api.teleport.org/api/cities/?search=${valueInput.value}`);
    const repListCountry = await listCountry.json();
    
    for(let i = 0; i < repListCountry._embedded["city:search-results"].length; i++ ){
        const fullNameCity = repListCountry._embedded["city:search-results"][i].matching_full_name;
        const optList = document.createElement("li");
        optList.innerText=fullNameCity;
        listCity.appendChild(optList);
    }
}

//create card weather
async function meteo(event){

    const weat = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${event}&appid=d0170950f748b7c8700a8d0ec061faec&units=${units[2]}`) ;
    const repWeat = await weat.json();
    const newArticle = document.createElement("article");
    switch(repWeat.weather[0].main){
        case "Clear": newArticle.classList.add("clear"); break;
        default:newArticle.classList.add("cloudy"); break;
    }
    newArticle.classList.add(`card`);
    newArticle.appendChild(paragCity(repWeat.name));
    newArticle.appendChild(paraCountry(repWeat.sys.country));
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
    
    newArticle.appendChild(setImgFavo());
    newArticle.appendChild(setimgRub());
    
    sect.appendChild(newArticle);
    eventImgFavo();
    eventSupCard();
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


// call same time create img. Add or remove favori
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

function showFavori(){
    const butFavori = document.querySelector(".favo");
    butFavori.addEventListener("click", () => {
        if(!localStorage.getItem("name")){
            alert("You don't have favori");
            return;
        }
        meteo(localStorage.getItem("name"));
    });
}



function addItemStorage (item) {
    localStorage.setItem("name", `${item}`);
}

function clearStorage(){
    localStorage.clear();
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
  localStorage.getItem("name", `${item}`);
}

function clearStorage(){
    localStorage.clear();

};

const cityList = document.querySelector("#city");
cityList.addEventListener("click", (event) => {
    const valInput = document.querySelector(".aInput");
    valInput.value = event.target.innerText;
});

document.addEventListener("keyup",(event) => {
        if(event.key == "Enter"){
            meteo(findInput.value);
        }
});

showFavori();
