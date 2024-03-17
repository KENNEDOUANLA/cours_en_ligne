"use strict";
let listeTaches = [];
let listeDevis = [];
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
    document.querySelector("#save").style.display="block";
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
            
            console.log("tache=",tache,"ligne=",ligne)
            bodyRow.appendChild(createTd(tache.intitule));
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
    document.getElementById("devis").appendChild(table);
}

function init() {
    afficheCategories();
    initStorage();
    document.getElementById("selection").addEventListener('submit', ajouter);
    document.getElementById("selection").addEventListener('reset', raz);
    document.getElementById("save").addEventListener('submit', enregistrerDevis);
    
    
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
    document.querySelector("#save").style.display="none";

    if (table) {
        table.remove()
    }
}

function enregistrerDevis(e)
{
    e.preventDefault();
    var form = document.getElementById("save");
    var client = form.elements["client"].value;
    var intitule = form.elements["intitule"].value;
    var data = { client, intitule, "devis": listeTaches };
    listeDevis.push(data);
    afficheListeDevis(listeDevis);
    localStorage.setItem("liste-devis",JSON.stringify(listeDevis));
}

function afficheListeDevis(liste){
    var mes_devis = document.getElementById("mes-devis");
    var ul = document.querySelector("#mes-devis ul");
    if (ul)
        ul.remove();
    

    var ul = document.createElement('ul');
    
        // < button type = "button" > un bouton qui ne fait rien</button>.


    mes_devis.appendChild(ul)
    liste.forEach((devis,index) => {
        let li = document.createElement('li');
        li.textContent = devis.client + " - " + devis.intitule;
        var Supprimer = document.createElement('button');
        Supprimer.type = "button";
        Supprimer.textContent="Supprimer"
        Supprimer.dataset.idDevis = index
        li.appendChild(Supprimer);
        Supprimer.addEventListener("click", supprimeDevis);
        var Exporter = document.createElement('button');
        Exporter.type = "button";
        Exporter.textContent="Exporter"
        Exporter.dataset.idDevis=index
        Exporter.addEventListener("click", exportHtml);
        li.appendChild(Exporter);
        ul.appendChild(li);
    });
}

function supprimeDevis()
{
    var id = this.dataset.idDevis;
    listeDevis.splice(id, 1);
    afficheListeDevis(listeDevis);
}

function exportHtml()
{
    var id = this.dataset.idDevis;
    var devisInfos = listeDevis[id];
    var list_items = "";
    var totalTVA = 0.0;
    var totalHT = 0.0;
    devisInfos.devis.forEach((devis) =>
    {
        var tache = taches.find(item => item.id == devis.tache);
        const { intitule, prix } = tache;
        var total = prix * devis.quantite * devis.tauxTva / 100;
            
        totalHT += prix * devis.quantite;
        totalTVA += total;
        list_items += `<tr>
            <td>${intitule}</td>
            <td>${devis.quantite}</td>
            <td>${prix.toFixed(2)} €</td>
            <td>${(prix * devis.quantite).toFixed(2)} €</td>
            <td>${devis.tauxTva} %</td>
            <td>${total.toFixed(2)} €</td>
            <td>${(total + (prix * devis.quantite)).toFixed(2)} €</td>
        </tr>`
    });
    var totalTTC=totalHT+totalTVA;
    var html = `
    <div>
        <h1>Votre devis</h1>
        <b>${devisInfos.client} - ${devisInfos.intitule}</b>
        <table border="1">
            <thead>
                <tr>
                    <th>Désignation</th>
                    <th>Quantite</th>
                    <th>PU HT</th>
                    <th>Total HT</th>
                    <th>Taux Tva</th>
                    <th>TVA</th>
                    <th>Total TTC</th>
                </tr>
            </thead>
            <tbody>
                ${list_items}
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="3">Total</th>
                    <th>${totalHT.toFixed(2)} €</th>
                    <th></th>
                    <th>${totalTVA.toFixed(2)} €</th>
                    <th>${totalTTC.toFixed(2)} €</th>
                </tr>
            </tfoot>
        </table>
    </div>`;


    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `devis-${devisInfos.client}.html`;

    link.click();
    URL.revokeObjectURL(url);

}
function initStorage()
{
    var liste_devis = localStorage.getItem("liste-devis");
    if (liste_devis) {
        listeDevis = JSON.parse(liste_devis);
        afficheListeDevis(listeDevis);
    }
}