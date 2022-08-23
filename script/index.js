import {meteo} from './accetsScript/creationCard.js';

const theMain = document.querySelector("main");

const mainDiv = document.createElement("div");
mainDiv.classList.add("contenant");

const divInput = document.createElement("div");
divInput.classList.add("divInput");

const mainInput = document.createElement("input");
mainInput.classList.add("aInput");
mainInput.value="";
divInput.appendChild(mainInput);

const butConfirm = document.createElement("button");
butConfirm.classList.add("aButton");
butConfirm.innerText = "confirm";
divInput.appendChild(butConfirm);

const listCountrySelect = document.createElement("ul");
listCountrySelect.setAttribute("id","city");
divInput.appendChild(listCountrySelect);

mainDiv.appendChild(divInput);

const butFavo = document.createElement("button");
butFavo.innerText = "Favori";
butFavo.classList.add("favo");
mainDiv.appendChild(butFavo);

const sectionAlbum = document.createElement("section");
sectionAlbum.classList.add("album");
mainDiv.appendChild(sectionAlbum);
theMain.appendChild(mainDiv);

//let testModule = meteo(mainInput.value,sectionAlbum,units);
function supAllChild(parent){
    while (parent.firstChild){
        parent.removeChild(parent.lastChild);
    }
}

//create list seletion
async function countryList(){
    const listCity = document.querySelector("#city");
    const valueInput = document.querySelector(".aInput");
    if(!valueInput.value){
        supAllChild(listCity);
        return;
    }
    supAllChild(listCity);
    const listCountry = await fetch(`https://api.teleport.org/api/cities/?search=${valueInput.value}`);
    const repListCountry = await listCountry.json();
    
    for(let i = 0; i < repListCountry._embedded["city:search-results"].length; i++ ){
        const fullNameCity = repListCountry._embedded["city:search-results"][i].matching_full_name;
        const optList = document.createElement("li");
        optList.innerText=fullNameCity;
        listCity.appendChild(optList);
    }
}
const album = document.querySelector(".album");
function eventButInputMain(){
    // const butConfirm = document.querySelector(".aButton");
    // const mainInput = document.querySelector(".aInput");
    butConfirm.addEventListener("click", () => { 
        meteo(mainInput.value,album); 
    });
    mainInput.addEventListener("keyup",(event) => {
        if(event.key == "Enter"){
           // meteo(mainInput.value,album);
        }
        else{countryList();}
    });
}


function eventListUl(){
    const cityList = document.querySelector("#city");
    cityList.addEventListener("click", (event) => {
        const valInput = document.querySelector(".aInput");
        valInput.value = event.target.innerText;
    });
}

function docEvent(){
    document.addEventListener("keyup",(event) => {
        if(event.key == "Enter"){
            meteo(mainInput.value,album);
        }
    });
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
eventButInputMain();
eventListUl();
docEvent();
showFavori();
