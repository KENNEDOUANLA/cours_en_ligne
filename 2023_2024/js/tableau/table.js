"use strict";

function createCell(text, type) {
    // fonction à écrire
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

function afficher(infos) {
    const conteneur = document.getElementById("conteneur");
    var h2 = document.createElement("h2");
    h2.textContent = infos.nom + " " + infos.prenom;
    conteneur.appendChild(h2);  

    var table = document.createElement('table');
    
    var thead = document.createElement('thead');

    const headerRow = document.createElement('tr');


    var head=["Jour","Début","Fin","Heures jour","Heures prévus","-/+"]
    head.forEach(val => {
        headerRow.appendChild(createTh(val));
    });

    // const semaine = infos.semaine;
    var tbody = document.createElement('tbody');
    var total_duration = 0;
    var total_prevision = 0;
    for (let jour in infos.semaine) {
        var day_info = infos.semaine[jour];
        
        var bodyRow = document.createElement('tr');
        
        total_prevision += day_info.prevision;
        bodyRow.appendChild(createTh(jour));


        if (day_info.heures.length) {
            bodyRow.appendChild(createTd(day_info.heures[0]));
            bodyRow.appendChild(createTd(day_info.heures[1]));
            var duration = day_info.heures[1] - day_info.heures[0];
        } else {
            bodyRow.appendChild(createTd(0));
            bodyRow.appendChild(createTd(0));
            var duration = 0;
        }
        var prevision_diff = duration - day_info.prevision;
        total_duration += duration;

        bodyRow.appendChild(createTd(duration));

        bodyRow.appendChild(createTd(day_info.prevision));

        var plusOuMoinsCell=createTd(prevision_diff)
        if (prevision_diff>=0) {
            plusOuMoinsCell.classList.add("more");
        } else {
            plusOuMoinsCell.classList.add("less");
        }

        bodyRow.appendChild(plusOuMoinsCell);
        tbody.appendChild(bodyRow);
    }

    var tfoot = document.createElement('tfoot');


    var footCell=createTh("Totaux")
    footCell.setAttribute("colspan", 3);
    tfoot.appendChild(footCell);

    var totDurationCell = createTd(total_duration);
    totDurationCell.classList.add("more");
    tfoot.appendChild(totDurationCell);
    tfoot.appendChild(createTd(total_prevision));

    var total_prevision_diff = total_duration - total_prevision;
    var totDiffPrevCell =createTd(total_prevision_diff);
    totDiffPrevCell.classList.add(`${total_prevision_diff>=0? "more" : "less"}` );
    tfoot.appendChild(totDiffPrevCell);    

    thead.appendChild(headerRow);
    table.appendChild(thead)
    table.appendChild(tbody)
    table.appendChild(tfoot)
    conteneur.appendChild(table);
    




}

function afficherTous(infos) {
    infos.forEach(info =>
    {
        afficher(info)
    });
}

