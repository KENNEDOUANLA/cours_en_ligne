"use strict";



function init() {
    // fonction qui initialise les évènements de la page
    // ici il faut capter le submit du formulaire
    document.getElementById("formulaire").addEventListener("submit",verifier );

}

function verifier(event) {
    // ici le code qui va vérifier le formulaire
    // et le bloquer (ou pas)
    var prenom = document.getElementById("prenom").value.trim();
    var jour = document.getElementById("jour").value.trim();
    var mois = document.getElementById("mois").value.trim();
    var annee = document.getElementById("annee").value.trim();
    const isDayValid = isValidInteger(jour, 1, 31);
    const isMonthValid = isValidInteger(mois, 1, 12);
    const isYearValid = isValidInteger(annee, 1900, (new Date().getFullYear()));
    var valid = true;
    if (!prenom) {
        document.getElementById("erreur-prenom").textContent = "Il faut saisir un prénom";
        valid = false;
    } else {
        document.getElementById("erreur-prenom").textContent = "";
    }
    
    if (!isDayValid || !isMonthValid || !isYearValid) {
        document.getElementById("erreur-naissance").textContent = "Il faut saisir une date valide";
        valid = false;
    }else{
        document.getElementById("erreur-naissance").textContent =""
    }

    if(!valid)
        event.preventDefault();
}

function isValidInteger(value, min, max) {
    const numericValue = Number(value);
    const integerValue = numericValue.valueOf();
    return Number.isInteger(integerValue) && integerValue >= min && integerValue <= max;
}