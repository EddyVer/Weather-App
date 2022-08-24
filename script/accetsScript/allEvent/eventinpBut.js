import {meteo} from "../../accetsScript/creationCard.js";

export function eventButInputMain(parent,input,button,key,valueUnit){
    button.addEventListener("click", () => { 
        meteo(input.value,parent,key,valueUnit[2]); 
        input.value="";
    });
    
}