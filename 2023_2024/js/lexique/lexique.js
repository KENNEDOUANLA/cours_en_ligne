"use strict";

let lexiqueAdd = [];

function expliquer(event)
{
    var div = document.createElement("div");
    if (lexiqueAdd == 0)
        resetbutton.style.display = "block";
    
    var key = event.target.innerHTML.trim().toLowerCase();
    if (lexiqueAdd.includes(key)) {
        return
    }
    lexiqueAdd.push(key);

    
    var p = document.createElement('p');
    p.innerHTML = lexique[key].desc;

    div.appendChild(p);
    if (Object.hasOwn(lexique[key], 'url')) {
        var link = lexique[key].url;
        var a = document.createElement('a');
        a.setAttribute('href', link);
        a.textContent = link;
        div.appendChild(a);
    }   
    div.appendChild(document.createElement('hr'));

    lexiqueItems.insertBefore(div,resetbutton);
}

function reset(event)
{
    resetbutton.style.display = "none";
    lexiqueAdd = [];
    document.querySelectorAll("#lexique div").forEach((e)=>e.remove());

}