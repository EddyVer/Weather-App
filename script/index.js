import {meteo} from "./accetsScript/creationCard.js";
import{supAllChild} from "./utils/removeChild.js";
let units = ["imperial","standard","metric"];
const keyUser = "d0170950f748b7c8700a8d0ec061faec";

const theMain = document.querySelector("main");

const mainDiv = document.createElement("div");
mainDiv.classList.add("contenant");

const divInput = document.createElement("div");
divInput.classList.add("divInput");

const mainInput = document.createElement("input");
mainInput.classList.add("aInput");
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


//create list seletion
async function countryList(list,input){
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
const cityList = document.querySelector("#city");
const butFavori = document.querySelector(".favo");

function eventButInputMain(parent,input,button,key,valueUnit){
    button.addEventListener("click", () => { 
        meteo(input.value,parent,key,valueUnit[2]); 
        input.value="";
    });
    input.addEventListener("keyup", countryList)
}


function eventListUl(input,list){
     list.addEventListener("click", (event) => {
        input.value = event.target.innerText;
    });
}

function docEvent(parent,input,key,valueUnit){
    document.addEventListener("keyup",(event) => {
        if(event.key == "Enter"){
            meteo(input.value,parent,key,valueUnit[2]);
            input.value="";
        }
    });
}
function showFavori(parent,button,key,valueUnit){
   button.addEventListener("click", () => {
        if(!localStorage.getItem("name")){
            alert("You don't have favori");
            return;
        }
        meteo(localStorage.getItem("name"),parent,key,valueUnit[2]);
    });
}
eventButInputMain(album,mainInput,butConfirm,keyUser,units);
eventListUl(mainInput,cityList);
docEvent(album,mainInput,keyUser,units);
showFavori(album,butFavori,keyUser,units);
