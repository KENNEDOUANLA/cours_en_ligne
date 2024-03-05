"use strict";
let listeTaches = [];

function createCell(text, type) {
    var item = document.createElement(type);
    item.textContent = text;
    return item;
}

function createTd(text) {
    return createCell(text, 'td');
}

function createTh(text) {
    return createCell(text, 'th');
}

function afficheDevis(liste)
{
    var table = document.querySelector("table");
    if (table) {
        table.remove()
    }
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    var head=["Désignation","Quantite","PU HT","Total HT","Taux Tva","TVA","Total TTC"]
    head.forEach(val => {
        headerRow.appendChild(createTh(val));
    });
    var tbody = document.createElement('tbody');
    var totalHT = 0.0;
    var totalTVA = 0.0;
    liste.forEach((ligne) =>
    {
        var bodyRow = document.createElement('tr');
        
        var tache = taches.find(item => item.id == ligne.tache);
        if (tache) {
            var total = tache.prix * ligne.quantite * ligne.tauxTva / 100;
            totalHT += tache.prix * ligne.quantite;
            totalTVA += total;
            

            bodyRow.appendChild(createTd(ligne.designation));
            bodyRow.appendChild(createTd(ligne.quantite));
            bodyRow.appendChild(createTd(tache.prix.toFixed(2) + " €"));
            bodyRow.appendChild(createTd((tache.prix * ligne.quantite).toFixed(2) + " €"));
            bodyRow.appendChild(createTd(ligne.tauxTva + " %"));
            
            bodyRow.appendChild(createTd(total.toFixed(2) + " €"));
            bodyRow.appendChild(createTd((total+ (tache.prix * ligne.quantite)).toFixed(2) + " €"));
            tbody.appendChild(bodyRow);
        }
        
    });
    var totalTTC=totalHT+totalTVA;
    var tfoot = document.createElement('tfoot');
    var footCell=createTh("Total")
    footCell.setAttribute("colspan", 3);
    tfoot.appendChild(footCell);
    tfoot.appendChild(createTh(totalHT.toFixed(2) + " €"));
    tfoot.appendChild(createTh(''));
    tfoot.appendChild(createTh(totalTVA.toFixed(2) + " €"));
    tfoot.appendChild(createTh(totalTTC.toFixed(2)+" €"));



    thead.appendChild(headerRow);
    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(tfoot);
    document.getElementById("mes-devis").appendChild(table);
}

function init() {
    afficheCategories();
    document.getElementById("selection").addEventListener('submit', ajouter);
    document.getElementById("selection").addEventListener('reset', raz);
    
}

function ajouter(e)
{
    e.preventDefault();
    var form = document.getElementById("selection");
    var tache = form.elements["tache"].value;
    var quantite = form.elements["quantite"].value;
    var tauxTva = form.elements["tva"].value;
    listeTaches.push({ tache, quantite, tauxTva });
    afficheDevis(listeTaches)
    console.log(listeTaches);
}

function afficheCategories() {
    var ul = document.createElement('ul');
    document.getElementById("categories").appendChild(ul)
    categories.forEach(categorie => {
        let li = document.createElement('li');
        li.dataset.categorieId = categorie.id;
        li.addEventListener("click",makeSelectTaches)
        li.textContent = categorie.categorie;
        ul.appendChild(li);
    });
}

function makeSelectTaches()
{
    document.querySelectorAll('.removeble').forEach((element) => element.remove());
    
    var categorie = this.dataset.categorieId;
    var select = document.getElementById("select-taches");
    taches.filter(item => item.categorie === categorie).forEach(tache =>
    {
        console.log(tache);
        let option = document.createElement('option');
        option.value = tache.id;
        option.classList.add("removeble");
        option.textContent = tache.intitule
        select.appendChild(option);
    });

}

function raz()
{
    listeTaches = [];
    var table = document.querySelector("table");
    if (table) {
        table.remove()
    }
    

}