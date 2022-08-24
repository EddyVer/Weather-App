import { docEvent } from "./evetnDoc.js";
import { showFavori } from "./showFavo.js";
import { listEvent , eventListUl } from "./eventlist.js";
import { eventButInputMain } from "./eventinpBut.js";

/**
 * 
 * @param {} album 
 * @param {*} input 
 * @param {*} butConfirm 
 * @param {*} keyUser 
 * @param {*} units 
 * @param {*} cityList 
 * @param {*} butFavori 
 */
export function allEvent(album,input,butConfirm,keyUser,units,cityList,butFavori){
    listEvent(cityList,input);
    eventButInputMain(album,input,butConfirm,keyUser,units);
    eventListUl(input,cityList);
    docEvent(album,input,keyUser,units);
    showFavori(album,butFavori,keyUser,units);
}