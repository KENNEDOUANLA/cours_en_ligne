"use strict";

function createElement(type, val=null) 
{
    var element = document.createElement(type);
    element.textContent = val;
    return element;
}
function faireTable() {
    var ol = createElement("ol"); 
    var list_items = ["Présentation", "Web et Html", "Modifier le style des pages: CSS", "Mise en page CSS", "Images sur le web et bonnes pratiques CSS", "Sélecteur avancer -- police sur le web", "Desing adaptatif -- transitions et transformations CSS"];
    list_items.forEach((li_text,id) =>{
        var a = createElement('a', li_text);
        a.setAttribute("href", "#"+id);
        var li = createElement("li")
        li.appendChild(a);
        ol.appendChild(li);
    });

    document.getElementById("table-matieres").appendChild(ol);
}
var backToTopLink = document.createElement('a');
    backToTopLink.textContent = ' ↑';
backToTopLink.href = '#';
    backToTopLink.style.textDecoration="none" ;


function addTopList()
{
    var h2_list = document.querySelectorAll("section h2");
    var h3_list = document.querySelectorAll("section h3");
    h2_list.forEach((node) =>
    {
        node.appendChild(backToTopLink.cloneNode(true));
    })
    h3_list.forEach((node) =>
    {
        node.appendChild(backToTopLink.cloneNode(true));
    })
}

