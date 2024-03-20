"use strict";

function init() {
    document.getElementById("recherche").addEventListener("submit", recherche);
}

function recherche(e)
{
    e.preventDefault();
    let input = document.querySelector("#auteur").value;
    console.log("input", input);
    if (input == "" || input.trim() == "") {
        document.querySelector("#erreur").textContent= "Il faut saisir une recherche non vide";
        return
    }
    
    let xhr = new XMLHttpRequest();
    let query=`?api_key=hiza222&method=search&auteur=${input.trim()}`
    xhr.open('GET', 'https://ensweb.users.info.unicaen.fr/TW2/services/articles/articles.php'+query);
    xhr.responseType='json';
    xhr.onload = function ()
    {
        if (xhr.status == 200) {
            console.log(xhr.response);
        }
        console.log("xhr.response",console.log(xhr.response));
    }
    xhr.send();
}