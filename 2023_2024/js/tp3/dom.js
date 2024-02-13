"use strict";

// Afficher en console l'élément d'identifiant paragraphe et le nom de la balise.
let p = document.getElementById('paragraphe');
console.log(p);
console.log("Tant que la ligne ci-dessus affiche null alors ça ne marche pas, ça devrait afficher <p>.");
console.log("Si vous ne comprenez pas pourquoi, demandez à votre prof.");
console.log("----------------------------");


const  getListe=()=>document.getElementById('liste1');
console.log("getListe()=>", getListe());

const getPara = () => document.querySelector('p');
console.log("getPara()=>", getPara());

const getTextePara = () => getPara().textContent
console.log("getTextePara()=>", getTextePara());

const getH2Debut = () => document.querySelector('h2.debut')
console.log("getH2Debut()=>", getH2Debut());

const getTexteH2Debut = () => getH2Debut().textContent;
console.log("getTexteH2Debut",getTexteH2Debut())

const getEmphase = () => document.querySelector('li em');
console.log("getEmphase()", getEmphase())


const getTexteEmphase = () => getEmphase().textContent;
console.log("getTexteEmphase()", getTexteEmphase())

const getPremierFils = () => document.querySelector('figure img');
console.log("getPremierFils()", getPremierFils())

const getSource = () => getPremierFils().getAttribute('src')
console.log("getSource()", getSource())

const getAlt = () => getPremierFils().getAttribute('alt');
console.log("getAlt()", getAlt())

const getFilsBody = () => document.querySelector('body').children;
console.log("getFilsBody()", getFilsBody())

const getTousImportant = () => document.querySelectorAll('.important');
console.log("getTousImportant()", getTousImportant())

const getParaDiv1 = () => document.querySelectorAll('#div1 p').length;
console.log("getParaDiv1()", getParaDiv1());

const comptePara = () => document.querySelectorAll('p').length;
console.log("comptePara()", comptePara());

const compteParaInDiv = () => document.querySelectorAll('div p').length;
console.log("compteParaInDiv()", compteParaInDiv());

console.log("------------------------------");


const changePara = () =>
{
    let p = document.getElementById('paragraphe');  
    p.style.width = '600px';
    p.style.color = 'red';
    p.style.fontSize = '26px';
    p.textContent = "Nouveau contenu.";
    p.setAttribute('title', 'Texte au choix pour le titre');
}
console.log("changePara()", changePara());

const changeImage = () =>
{
    const img= document.querySelector('#partie2 figure img');
    img.setAttribute('src', 'souris1968.jpg');
    img.setAttribute('alt','une souris en 1968')
}

changeImage();

const changeLegende = () =>
{
    let figcaption = document.querySelector("#partie2 figcaption");
    figcaption.textContent = "Nouveau contenu.";
}
changeLegende();

const changeItem = () =>
{
    let li = document.querySelector(".uneliste li:last-child");
    li.textContent="Nouveau contenu.";

}
changeItem()

const supprimePara = () =>
{
    document.querySelector("#partie2 p").remove();
}
supprimePara()

const supprimePremierItem = () =>
{
    document.querySelector('.uneliste li').remove();
}

supprimePremierItem();
console.log("------------------------------");

const ajouteBordure = () =>
{
    let allH2 = document.querySelectorAll('#partie3 h2');
    allH2.forEach((h2) =>
    {
        h2.style.border = '1px solid black';
    });

}
ajouteBordure()

const changeTousItems = () =>
{
    let allLI = document.querySelectorAll('#partie3 li');
    
    allLI.forEach(function (li) {
        li.style.color = 'white';
        li.style.backgroundColor = 'black';
        li.style.margin = '10px';
    });
}   
changeTousItems()


const supprimeExoDom = () =>
{
    let allLI = document.querySelectorAll('.exo-dom');
    
    allLI.forEach(function (li) {
        li.remove()
    });
}
supprimeExoDom()


const supprimeGras = () =>
{
    let allStrong = document.querySelectorAll('#gras strong'); 
    allStrong.forEach(function (strong) {
        strong.remove()
    });
}

supprimeGras()


const enleveImportant = () =>
{
    let allImportant = document.querySelectorAll('.important.exo-dom');
    allImportant.forEach((important) =>
    {    
        important.classList.remove('important');
    });
}
enleveImportant();
console.log("------------------------------");


const ajouteItem = () =>
{
    let listeEnPlus = document.getElementById('listeEnPlus');
    var nouvelElement = document.createElement('li');
        nouvelElement.textContent = "un item en plus";
    listeEnPlus.appendChild(nouvelElement);
}
ajouteItem();


const ajouteTitre = () =>
{
    let body = document.querySelector('body');
    var nouvelElement = document.createElement('h1');
    nouvelElement.textContent = "un nouveau titre";
    body.insertBefore(nouvelElement,body.firstChild)
}
ajouteTitre()

const ajoutePara = () =>
{
    let listeEnPlus = document.getElementById('listeEnPlus');
    var nouveauPara = document.createElement('p');
    nouveauPara.textContent = "nouveau paragraphe";
    listeEnPlus.parentNode.insertBefore(nouveauPara, listeEnPlus);

}
ajoutePara()


const ajouteArbre = () =>
{
    var lafinElement = document.getElementById('partie4');

    var nouvelArbre = document.createElement('div');
        nouvelArbre.className = 'important';

    var titreH3 = document.createElement('h3');
    titreH3.textContent = 'Une division créée en Javascript';

    var sousDiv = document.createElement('div');
    sousDiv.textContent = 'Une division avec ';

    var lienGoogle = document.createElement('a');
    lienGoogle.href = 'https://google.com';
    lienGoogle.textContent = 'un lien Google';

    sousDiv.appendChild(lienGoogle);
    sousDiv.innerHTML += ' qui ne sert à rien';

    nouvelArbre.appendChild(titreH3);
    nouvelArbre.appendChild(sousDiv);

    console.log("nouvelArbre",nouvelArbre)
    lafinElement.appendChild(nouvelArbre);

}
ajouteArbre()

const dupliqueListe = () =>
{
        let body = document.querySelector('body');
        var listePartie4 = document.querySelector('#partie4 ul');
        var listeClone = listePartie4.cloneNode(true);
        listeClone.classList.add('nouvelle');
        body.appendChild(listeClone)

}
dupliqueListe()