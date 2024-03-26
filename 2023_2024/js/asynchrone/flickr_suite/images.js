"use strict";
const API_KEY = "5464e73247b247d4d0b6554b68393a73";
const BASE_URL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${API_KEY}&has_geo=1`;
let map = null;
let allMarkers = [];

function init() {
    document.getElementById("recherche").addEventListener("submit", recherche);
    map = L.map('carte', {
    center: [0,0],
    zoom: 2
    });
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
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
        var position = [photo.location.longitude, photo.location.latitude];
        var bindPopupMessage=`<figure>
                    <h2>${photo.title._content}</h2>
                    <div style="display:flex">
                        <span><img src="https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg"/></span>
                        <span>${photo.description._content?photo.description._content:"Pas de description"}</span>
                    </div>
                <figcaption> 
                    <small><a href="https://www.flickr.com/photos/${photo.owner.nsid}/${photo.id}" target="_blank">Voir chez Flickr</a></small>
                </figcaption>
            </figure>`
        map.setView(position, 10);
        var marke=L.marker(position).addTo(map)
            .bindPopup(bindPopupMessage);
            marke.openPopup();
        
        allMarkers.push(marke);
        fetch()
    }
    xhr.send();
}

function fetch(){
    const { _northEast, _southWest } = map.getBounds();
    var LON_MIN = _southWest.lng;
    var LAT_MIN = _southWest.lat;
    var LON_MAX = _northEast.lng;
    var LAT_MAX = _northEast.lat;
    const bbox = `${LON_MIN},${LAT_MIN},${LON_MAX},${LAT_MAX}`;
    let input = document.querySelector("#mots").value;
    let xhr = new XMLHttpRequest();
    let query = `&method=flickr.photos.search&per_page=20&extras=geo,description&text=${input.trim()}&bbox=${bbox}`
    xhr.open('GET', BASE_URL+query);
    xhr.responseType = 'json';

    xhr.onload = function ()
    {
        if (xhr.response.stat == "ok") {
            var photos = xhr.response.photos.photo;
            if (photos.length) {
                photos.forEach((photo) =>
                {
                    var position = [photo.longitude, photo.latitude];
                    var bindPopupMessage = `<figure>
                            <h2>${photo.title}</h2>
                            <div style="display:flex">
                                <span><img src="https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg"/></span>
                                <span>${photo.description._content?photo.description._content:"Pas de description"}</span>
                            </div>
                        <figcaption> 
                            <small><a href="https://www.flickr.com/photos/${photo.owner}/${photo.id}" target="_blank">Voir chez Flickr</a></small>
                        </figcaption>
                    </figure>`
                    var marke=L.marker(position).addTo(map)
                    .bindPopup(bindPopupMessage);
                    allMarkers.push(marke);
                });
                
                
            }
        }
    }
    xhr.send();
}