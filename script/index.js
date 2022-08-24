import {allEvent} from "./accetsScript/allEvent/callAllEvent.js";
import { creatMainDiv} from "./accetsScript/creatMainDiv.js"


creatMainDiv();

let units = ["imperial","standard","metric"];
const keyUser = "d0170950f748b7c8700a8d0ec061faec";
const album = document.querySelector(".album");
const cityList = document.querySelector("#city");
const butFavori = document.querySelector(".favo");
const mainInput = document.querySelector("input");
const butConfirm = document.querySelector(".butConfirm");

allEvent(album,mainInput,butConfirm,keyUser,units,cityList,butFavori);
