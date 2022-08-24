import {meteo} from "../../accetsScript/creationCard.js";
/**
 * set event on button confirm need parent for learn childen
 * @param {parent html} parent 
 * @param {button Comfirm} button 
 * @param {string key api} key 
 * @param {string} valueUnit 
 */
 export function showFavori(parent,button,key,valueUnit){
    button.addEventListener("click", () => {
         if(!localStorage.getItem("name")){
             alert("You don't have favori");
             return;
         }
         meteo(localStorage.getItem("name"),parent,key,valueUnit[2]);
     });
 }