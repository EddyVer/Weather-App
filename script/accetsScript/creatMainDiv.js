
export function creatMainDiv(){
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
    return theMain;
}