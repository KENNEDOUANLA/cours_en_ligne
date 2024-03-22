"use strict";
const API_KEY = "5464e73247b247d4d0b6554b68393a73";
const BASE_URL=`https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${API_KEY}`;
function init() {
        document.getElementById("recherche").addEventListener("submit", recherche);
}

function recherche(e)
{
    e.preventDefault();
    let input = document.querySelector("#mots").value;
    document.querySelector("#erreur").textContent =" ";
    if (input == "" || input.trim() == "") {
        document.querySelector("#erreur").textContent = "Il faut saisir une recherche non vide";
        return
    }

    let xhr = new XMLHttpRequest();
    let query=`&method=flickr.photos.search&per_page=300&text=${input.trim()}`
    xhr.open('GET', BASE_URL+query);
    xhr.responseType = 'json';
    var resultats = document.querySelector('#resultats');
    resultats.textContent = "";
    xhr.onload = function ()
    {
        if (xhr.response.stat == "ok") {
            var photos = xhr.response.photos.photo;
            if (photos.length) {
                photos.forEach((photo) =>
                {
                    resultats.appendChild(afficheReponse(photo));
                })
            } else {
                resultats.innerHTML="<h2>Aucun résultat</h2>"
            }
        }
        console.log(xhr.status, xhr.response);
        
    }
    xhr.send();
}

function afficheReponse(photo,size='s'){
    var url=`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`
    var image = document.createElement("img");
    image.setAttribute("src", url);
    image.title = photo.title;
    image.alt = photo.title;
    image.setAttribute("id", photo.id);
    image.addEventListener("click", getDetails);
    return image;
}

function getDetails(e)
{
    console.log(this.id);
    let query = `&method=flickr.photos.getInfo&photo_id=${this.id}`
    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL+query);
    xhr.responseType = 'json';
    var details = document.querySelector('#details');
    details.textContent = "";
    xhr.onload = function ()
    {
        if (xhr.response.stat == "ok") {
            var photo = xhr.response.photo;
            details.innerHTML = `
                <figure>
                    <h2>${photo.title._content}</h2>
                    <p>${photo.description._content}</p>
                <img src="https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg"/>
                <figcaption> 
                    <div><small>Photo prise le ${photo.dates.taken} par <a href="https://www.flickr.com/photos/${photo.owner.nsid}" target="_blank">${photo.owner.username}</a></small></div>
                </figcaption>
            </figure>
            
            `; 
        }
        console.log(xhr.status, xhr.response);
        
    }
    xhr.send();
}