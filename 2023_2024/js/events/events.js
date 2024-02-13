"use strict";

function init() {
   console.log("vous devez copléter la fonction init");
   document.getElementById("question1").addEventListener('click', changeCouleur);
   document.getElementById("question2-3").addEventListener("mouseenter", mettreBordure);
   document.getElementById("question2-3").addEventListener("mouseleave", enleverBordure);
   document.getElementById("question4").addEventListener("click", changeImage);
   document.getElementById("question5").addEventListener("click", toggleImage);
   document.getElementById("question6").addEventListener("click", togglePara);
   document.getElementById("question7").addEventListener("click", stopGoogle);
   document.getElementById("question8").addEventListener("click", ajouteItem);
   document.getElementById("question9").addEventListener("click", ajouteDoubleClic);
   document.getElementById("question10").addEventListener("click", enleveDoubleClic);
   document.querySelectorAll("#question11 button").forEach(bouton => bouton.addEventListener("click", supprimeItem));
   document.getElementById('question12').addEventListener('click', initDark);
   document.getElementById("question13").addEventListener("click", paragraphesAleatoires);

}

// Attention à créer les fonctions callback en dehors de la fonction init
function changeCouleur  ()
{
   const h1 = document.querySelector("h1");
   h1.style.color="red";
}
function mettreBordure()
{
   const question2_3 = document.getElementById("question2-3");
   question2_3.style.border= "1px solid gray" ;
}
function enleverBordure()
{
   const question2_3 = document.getElementById("question2-3");
   question2_3.style.border= "0px" ;
}

function changeImage()
{
   const img = document.querySelector("img");
   img.src="images/chateau_sable_pro.jpg";
}

function toggleImage()
{
   const img = document.querySelector("img");
   const src = img.getAttribute("src")==="images/chateau_sable_debutant.jpg"?"images/chateau_sable_pro.jpg":"images/chateau_sable_debutant.jpg";
   img.src = src
}

function togglePara()
{
   const para = document.getElementById("para");
   if(para.style.display=="none")
      para.style.display ="block";
   else
      para.style.display ="none";
}

function stopGoogle(event)
{
   event.preventDefault();
   return 
}

function ajouteItem()
{
   const liste = document.getElementById("liste");
   const li = document.createElement('li');
   li.textContent = "new li";
   liste.appendChild(li);
}

function ajouteDoubleClic()
{
   var para = document.getElementById('para');
   para.addEventListener('dblclick', function ()
   {
      
      const currentColor = para.style.backgroundColor;
      const newColor = (currentColor === 'yellow') ? 'pink' : 'yellow';
      para.style.backgroundColor = newColor;
       
   });
}

function enleveDoubleClic()
{
   document.getElementById('para').removeEventListener("dblclick",ajouteDoubleClic)
}  

function supprimeItem()
{
      const liste = document.getElementById("liste");
      liste.removeChild(liste.lastElementChild);
}

function initDark()
{
   let listeDarkB = document.querySelectorAll(".dark");
   listeDarkB.forEach(function(element) {
        element.addEventListener('click', function() {
            element.style.color = 'white';
            element.style.backgroundColor = 'black';
        });
      });

}
function randomInt(min=1, max=5) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomColor() {
   var r = randomInt(0, 255);
   var g = randomInt(0, 255);
   var b = randomInt(0, 255);
   return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function paragraphesAleatoires()
{
   var nombreParagraphes = randomInt(1, 5);
   for (var i = 0; i < nombreParagraphes; i++) {
      var newParagraphe = document.createElement('p');
      newParagraphe.textContent = 'Paragraphe aléatoire';
      // newParagraphe.classList.add('paragraphe-aleatoire');

      newParagraphe.addEventListener('click', function() {
         this.style.backgroundColor = randomColor();
      });

      document.body.appendChild(newParagraphe);
   }
}