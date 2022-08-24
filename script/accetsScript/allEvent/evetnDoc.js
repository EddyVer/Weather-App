import {meteo} from "../../accetsScript/creationCard.js";
/**
 * set event on the document 
 * @param {parent html} parent 
 * @param {input html} input 
 * @param {string key api} key 
 * @param {string} valueUnit 
 */
 export function docEvent(parent,input,key,valueUnit){
    document.addEventListener("keyup",(event) => {
        if(event.key == "Enter"){
            meteo(input.value,parent,key,valueUnit[2]);
            input.value="";
        }
    });
}