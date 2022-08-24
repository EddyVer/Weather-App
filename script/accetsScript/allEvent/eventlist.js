import{supAllChild} from "../../utils/removeChild.js";


export function listEvent(list,input){
    input.addEventListener("keyup", () => countryList(list,input));
}
/**
 * 
 * @param {input html} input 
 * @param {ul id=city} list 
 */
export function eventListUl(input,list){
     list.addEventListener("click", (event) => {
        input.value = event.target.innerText;
    });
}

//create list seletion
async function countryList(list,input){
    if(!input.value){
        supAllChild(list);
        return;
    }
    supAllChild(list);
    const listCountry = await fetch(`https://api.teleport.org/api/cities/?search=${input.value}`);
    const repListCountry = await listCountry.json();
    
    for(let i = 0; i < repListCountry._embedded["city:search-results"].length; i++ ){
        const fullNameCity = repListCountry._embedded["city:search-results"][i].matching_full_name;
        const optList = document.createElement("li");
        optList.innerText=fullNameCity;
        list.appendChild(optList);
    }
}