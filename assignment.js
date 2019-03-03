'use strict';
//deifniera variabler/arrays
let startIndex = 0;
let currentIndex;
let smallImages;

//Skapa array sections med section-taggarna i
let sections = document.querySelectorAll("section");

window.addEventListener("load", function () {
    // Koppla lyssnare till thumbnail-bilderna (smallImages):
    smallImages = document.querySelector("div").getElementsByTagName("img");
    //console-logga html-collectionen smallImages
    console.log(smallImages);
    
    /*så länge i är mindre än längden av smallImages, loopa följande funktion (som vid eventet 'click' lägger till smallImageCliclListener
    på smallImages) och öka index-värdet med 1 varje gång. Funktionen sätter också attributet data-index på smallImages och ger den värdet av i såsom
    i definierats i denna for-loop*/    
    for (let i = 0; i < smallImages.length; i++) {
        smallImages[i].addEventListener("click", smallImagesClickListener);
        smallImages[i].setAttribute("data-index", i);
    }
    
    document.getElementById("nextImg").addEventListener("click", function(myMouseEvent){
        myMouseEvent.stopPropagation();
        displayNextImg();
    });
    document.getElementById("prevImg").addEventListener("click", function(myMouseEvent){
        myMouseEvent.stopPropagation();//metod till event-objektet
        displayPreviousImg();
    });
    document.getElementById("big-display-1").addEventListener("click", bigImageClickListner);
    document.getElementById("overlay").addEventListener("click", removeOverlay);
    
    document.addEventListener("keydown", keyListener);

     // Sätt current index till 0 via startIndex
     currentIndex = startIndex;
     // Visa första bilden som stor bild.
     displayImgFromIndex(currentIndex);

     //lägg till border på första bilden, som ju är den som är current image när sidan laddas
     smallImages[0].style.border = "5px solid #4F4F4F";

});

//Tangentbordslyssnare. Ändrar bild beroende på vilket knapptryck som registrerats (ArrowLeft/ArrowRight)
// e är event-objektet som skickas till eventlyssnaren keyListener
function keyListener (e) {
    if (e.key == "ArrowLeft") {
        console.log("Vänster!")
        displayPreviousImg();
    }

    if (e.key == "ArrowRight") {
        console.log("Höger!")
        displayNextImg();
    }
}

function displayNextImg() {
    currentIndex = currentIndex + 1;
    console.log(currentIndex);
    if (currentIndex >= smallImages.length) {
        currentIndex = 0;
    }
    displayOverlayImageFromIndex(currentIndex);
}

function displayPreviousImg() {
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) {
        // Högsta index i en numerisk 0-indexerad array är length - 1
        currentIndex = smallImages.length - 1;
    }
    displayOverlayImageFromIndex(currentIndex);
    
}
// Till slut ska vi sätta ny src på big img. Men till vilket värde?
function displayImgFromIndex(index) {
    document.getElementById("big-display-1").src = "imgs/" + smallImages[index].getAttribute("data-bigimgsrc") ;
}

function displayOverlayImageFromIndex(index) {
    document.querySelector("#overlay .overlay-image").src = "imgs/" + smallImages[index].getAttribute("data-bigimgsrc") ;
}

function smallImagesClickListener() {
    //gör currentIndex till indexet av den bild som klickats på (this = den thumbnail-bild som klickats på)
    currentIndex = parseInt(this.dataset.index);
    /*sätter src till html-elementet img-taggen "big-display-1" till det värde som givits data-attributet 
    bigimgsrc i den thumbnail-bild som klickas på (currentIndex). This refererar alltså till den thumbnail-bild
    som klickats på*/
    document.getElementById("big-display-1").src = "imgs/" + this.dataset.bigimgsrc;
    
    //tar bort bordern från alla bilder när vi klickar på ny bild
    smallImages[0].removeAttribute("style");

    //För att sedan lägga på den ny border på den bild vi klickat på
    let imgDiv = document.getElementsByClassName("thumbnails"); //https://stackoverflow.com/questions/17821560/loop-through-all-descendants-of-a-div-js-only
    //targeta alla (*) descendents till diven som variabeln(arrayen) imgDiv refererar till, alltså den i vilken alla bilder ligger (thumbnails).
    let descendents = imgDiv[0].getElementsByTagName('*'); 
    
    /*classList lägger till/tar bort (beroende på add/remove-property) en css-klass (och i förlängningen dess styling) på ett html/DOM-element.
    Så länge i = 0 (vilket ju är när stora bilden motsvarar index 0, vilket är första thumbnailen i indexet), behåll klassen initial-border. 
    Om index är mindre än 0, vilket det ju är om vilken annan bild som helst är markerad/klickad på, ta bort klassen (och därmed stylingen från klassen) initial_border*/
    for(let i = 0; i < descendents.length; i++){
        descendents[i].classList.remove("initial_border");
    }
    descendents[this.dataset.index].classList.add("initial_border");

    console.log("Du klickade på en thumbnail-bild!");
    console.log("Current index: " + this.dataset.index);//this refererar i dessa fall till element-objektets index motsvarande den tumbnail-bild som användaren klickat på 
    console.log("Dataset image: " + this.dataset.bigimgsrc);
    console.log("Div size: " + imgDiv.length);
    console.log("Descendent size: " + descendents.length);
    
}    

//sätter src på overlay-image till sourcen av "this" (this refererar till bigimgsrc-datan från den thumbnail som klickats på currently).
function bigImageClickListner() {
    let elem = document.querySelector(".overlay-image");
    elem.src = this.src;
    showOverlay();
    console.log(this.src)
}


function showOverlay() {
    document.getElementById("overlay").classList.add("visible");
}

/* Dölj #overlay genom att ta bort klassen visible */
function removeOverlay() {
    document.getElementById("overlay").classList.remove("visible");
}