"use strict";

function hello(name)
{
    return `Hello ${name}`;
}

console.log(hello("Dolly")); // Output: Hello John

const bye = (name) =>
{
    return `Goodbye ${name}`;
}

console.log(bye("Mike"))

console.log("------------------------------");


//tableau

function produitTableau(tab=[])
{
    let total = 1;
    tab.forEach(element => {
        total *= element;
    });
    return total;
}
console.log("produitTableau(tableau1)", produitTableau(tableau1));


function tranche(tab=[],debut,fin)
{
    console.log(tab);
    debut = debut < 0 ? 0 : debut;

    if (debut > tab.length)
        return [];
    
    if (debut > fin)
        return [];
    
    return tab.slice(debut, fin);
}
console.log("tranche(tableau1,3,6)",tranche(tableau1,3,6))
console.log("tranche(tableau1,5,3)",tranche(tableau1,5,3))
console.log("tranche(tableau1,-3,3)", tranche(tableau1, -3, 3))


function plusPetits(tab=[],n)
{
    return tab.filter(val => val < n);
}
console.log("plusPetits(tableau1,5)",plusPetits(tableau1,5))

function estInclus(tab1 = [], tab2 = [])
{
    let inclus = true;
    tab1.forEach((tab1_item,index) =>
    {
        if (tab2.find((tab2_item)=>tab1_item===tab2_item)==undefined) {
            inclus = false;
            return
        }
    });
    return  inclus;
}

console.log("estInclus(tableau1,tableau2)",estInclus(tableau1,tableau2))
console.log("estInclus(tableau1,tableau3)",estInclus(tableau1,tableau3))


function estInclusEvery(tab1 = [], tab2 = [])
{
    return tab1.every((tab1_item) => tab2.includes(tab1_item));
}

console.log("estInclusEvery(tableau1,tableau2)",estInclusEvery(tableau1,tableau2))
console.log("estInclusEvery(tableau1,tableau3)",estInclusEvery(tableau1,tableau3))

function complementaire(tab1 = [], tab2 = [])
{
    if (estInclusEvery(tab1, tab2)) {
        return tab2.filter((tab2_item)=>!tab1.includes(tab2_item))
    }
    return false;
}
console.log("complementaire(tableau1,tableau2)",complementaire(tableau1,tableau2))
console.log("complementaire(tableau1,tableau3)",complementaire(tableau1,tableau3))


function ecrireAscii(tableau) {
    const result = tableau.map(code => String.fromCodePoint(code % 26 + 97));
    return result.join('');
}

console.log("ecrireAscii(tableau1)", ecrireAscii(tableau1));


console.log("------------------------------");


function aujourdhui() {
    const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

    const date = new Date();
    const jourSemaine = jours[date.getDay()];
    const jourMois = date.getDate();
    const moisAnnee = mois[date.getMonth()];
    const annee = date.getFullYear();

    return `${jourSemaine} ${jourMois} ${moisAnnee} ${annee}`;
}

console.log("aujourdhui()", aujourdhui());

const timestampUnix = Math.floor(new Date().getTime() / 1000);
console.log("Timestamp Unix : " + timestampUnix + " secondes");


function age(jourNaissance, moisNaissance, anneeNaissance) {
    const dateNaissance = new Date(anneeNaissance, moisNaissance - 1, jourNaissance);
    const now = new Date();

    if (dateNaissance > now) {
        return false; // La date de naissance est dans le futur
    }

    const ageMS = now - dateNaissance;
    const ageAnnees = ageMS / (365.25 * 24 * 60 * 60 * 1000);

    return Math.floor(ageAnnees);
}

console.log("Âge de Gilles : " +  age(5, 1, 1989) + " ans");
console.log("Âge de Mélodie : " + age(28, 3, 2001) + " ans");

console.log("------------------------------");

console.log("chaine1.length = ", chaine1.length)


function codeCesar(chaine, decal)
{
    if (decal<0 || decal >26) {
        return false;
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let sortie = "";

    for (let i = 0; i < chaine.length; i++) {
        let char = chaine[i];
        if (char.match(/[a-z]/i)) {
            const isLowerCase = char === char.toLowerCase();
            char = char.toLowerCase();

            const position = alphabet.indexOf(char);
            const position2 = (position + decal) % 26;
            const newChar = alphabet.charAt(position2);

            sortie += isLowerCase ? newChar : newChar.toUpperCase();
        } else {
            sortie += char;
        }
    }

    return sortie;
}

console.log("codeCesar(il faut encoder,5)" ,codeCesar("il faut encoder",5));
console.log("codeCesar(xyz,5)", codeCesar("xyz", 5));


function compterMots(cherche,chaine)
{
    const rechercheLowerCase = cherche.toLowerCase();
    const chaineLowerCase = chaine.toLowerCase();
    return chaineLowerCase.split(rechercheLowerCase).length-1;
}

console.log("compterMots(book,chaine1)", codeCesar("book", chaine1));
console.log("compterMots(printer,chaine1)", codeCesar("printer", chaine1));
console.log("------------------------------");



function estTrinome(object1)
{
    let esttrinome = true
    const arrayabc = ["a", "b", "c"];
    arrayabc.forEach((key) =>
    {
        if (!Object.hasOwn(object1, key))
            esttrinome = false;
    })
    return esttrinome;
}

console.log("estTrinome(trinome1)", estTrinome(trinome1));
console.log("estTrinome(trinome2)", estTrinome(trinome2));
console.log("estTrinome(trinome3)", estTrinome(trinome3));


function discriminant(object1)
{
    if (estTrinome(object1)) {
        return ((object1["b"] * object1["b"]) - (4* object1["a"] * object1["c"]));
    
    }
    return false;
}

console.log("discriminant(trinone1)", discriminant(trinome1));
console.log("discriminant(trinome2)", discriminant(trinome2));


function resoudre(object1)
{
    let discriminant_val=discriminant(object1);
    if (discriminant_val) {
        if (discriminant_val<0) {
            return [];
        } else {
            
            const x1 = (-object1["b"] + Math.sqrt(discriminant_val)) / (2 * object1["a"]);
            const x2 = (-object1["b"] - Math.sqrt(discriminant_val)) / (2 * object1["a"]);

            return x1 < x2 ? [x1,x2] : [x2,x1];
        
        }
    }

    return false;
}