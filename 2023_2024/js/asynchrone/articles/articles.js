"use strict";

function init() {
    document.getElementById("recherche").addEventListener("submit", recherche);
}

function recherche(e)
{
    e.preventDefault();
    let input = document.querySelector("#auteur").value;
    document.querySelector("#erreur").textContent =" ";
    if (input == "" || input.trim() == "") {
        document.querySelector("#erreur").textContent= "Il faut saisir une recherche non vide";
        return
    }
    
    let xhr = new XMLHttpRequest();
    let query=`?api_key=hiza222&method=search&auteur=${input.trim()}`
    xhr.open('GET', 'https://ensweb.users.info.unicaen.fr/TW2/services/articles/articles.php'+query);
    xhr.responseType = 'json';
    var resultats = document.querySelector('#resultats');
    resultats.textContent = "";
    xhr.onload = function ()
    {
        if (xhr.response && xhr.response.result == "success") {
            const {articles} = xhr.response;
            if (articles.length) {
                articles.forEach((article, index) =>
                {
                    resultats.appendChild(createSection(article));
                })
            } else {
                resultats.innerHTML="<h2>Aucun résultat</h2>"
            }
        }
    }
    xhr.send();
}

function createSection(item)
{
    var section = document.createElement("section");
    section.style.border = "1px solid #ccc";
    var title = document.createElement("h2")
    title.textContent = item.title
    var sub_title = document.createElement("h3")
    sub_title.textContent = "De " + item.creator + ", publié le " + item.createdAt;
    var content = document.createElement("p")
    content.innerHTML = item.articleContent;

    section.appendChild(title);
    section.appendChild(sub_title);
    section.appendChild(content)

    return section;
}