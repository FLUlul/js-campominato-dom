/* 
PARTE 1
Consegna L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49 
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro (o simili, l’importante è dare all’utente il feedback che ha scoperto una casella che rimarrà scoperta, con il numero relativo).
*/

/* 
PARTE 2
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su ogni cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
(come detto sull’effetiva interfaccia fate voi, non ci son specifiche vincolanti, ma partite semplici)
La partita termina quando il giocatore clicca su una bomba
o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato un quadratino con un numero consentito. (quindi se ci pensate dovrete tenere traccia del punteggio).
*/

/* 
con difficoltà 1 => tra 1 e 100  10x10
con difficoltà 2 => tra 1 e 81   9x9
con difficoltà 3 => tra 1 e 49   7x7

-creo una funzione che mi genera un elemento e aggiunge una classe
    -potro andare a mettere i parametri:
        dell'elemento
        della classe
-creo una funzione con un ciclo for che mi vada a riempire il container di quadrati
    -potro andare a mettere i parametri:
        quante iterazioni deve fare

-creo un event listener click al pulsante easy
    -vado a inserire la funzione del ciclo mettendo i parametri di 100 iterazioni e la classe specifica
    -vado a disabilitare gli altri pulsanti

-creo un event listener click al pulsante medium
    -vado a inserire la funzione del ciclo mettendo i parametri di 81 iterazioni e la classe specifica
    -vado a disabilitare gli altri pulsanti

-creo un event listener click al pulsante hard
    -vado a inserire la funzione del ciclo mettendo i parametri di 49 iterazioni e la classe specifica
    -vado a disabilitare gli altri pulsanti

-creo un event listener per il pulsante reset che mi reloadi la pagina per selezionare un'altro livello

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
potrei anche creare una funzione con i parametri che posso cambiare in base al pulsante premuto e alle iterazioni che deve fare
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-creo una funzione che mi permetta di generare numeri random
    -creo un array vuoto
    -genero 16 numeri random dal numero massimo delle caselle scelte (easy medium hard)
    
    creo la variabile array.includes(numero random)

    se la variabile e' falsa
        -pusho il numero random nell'array

    

*/

const sqrCont = document.getElementById("sqr-container");
const easyBtn = document.getElementById("easy-btn");
const mediumBtn = document.getElementById("medium-btn");
const hardBtn = document.getElementById("hard-btn");
const resetBtn = document.getElementById("reset-btn");

const easy = 100;
const medium = 81;
const hard = 49;

let verify = false;
let count = 0;

let bombs = [];

easyBtn.addEventListener("click",
    function(){
        bombs = createBombs(easy);
        generateSquares(easy, "sqr-easy");

        easyBtn.classList.add("active");
        buttonDisable (easyBtn, mediumBtn, hardBtn);  
    }
);

mediumBtn.addEventListener("click",
    function(){
        bombs = createBombs(medium);
        generateSquares(medium, "sqr-medium");

        mediumBtn.classList.add("active");
        buttonDisable (easyBtn, mediumBtn, hardBtn);    
    }
);

hardBtn.addEventListener("click",
    function(){
        bombs = createBombs(hard);
        generateSquares(hard, "sqr-hard");
        
        hardBtn.classList.add("active");
        buttonDisable (easyBtn, mediumBtn, hardBtn);
    }
);

resetBtn.addEventListener("click",
    function(){
        location.reload();
    }
);



function generateSquares(maxCicles, defaultClass){
    
    console.log(bombs);
    for(i=1; i<=maxCicles; i++){
        let eleDiv = elementGenerator("div", defaultClass);
        let eleSpan = elementGenerator("span", "dnone");
        sqrCont.append(eleDiv);
        eleDiv.append(eleSpan);
        eleSpan.append(i);
        eleDiv.setAttribute("id", i);
        


        eleDiv.addEventListener("click",
            function(){
                eleDiv.classList.add("active");
                eleSpan.classList.remove("dnone");
                let idBomb = parseInt(eleDiv.id);

                
                if(bombs.includes(idBomb)){
                    eleDiv.classList.add("sqr-bomb");
                    eleDiv.classList.remove("active");
                    alert(`YOU LOST, your score is: ${count}. Press RESET to try again`);
                    verify = true;
                    console.log(verify);
                }else{
                    count++;
                    console.log(count);
                }
            }
        );
/*         if(bombs.includes(i)){
            eleDiv.classList.add("sqr-bomb");
        } */
    }
}

function createBombs (max) {
    let arrNum = [];
    while (arrNum.length < 16) {
        let randNum = Math.floor(Math.random() * max + 1);
        if (arrNum.includes(randNum) !== true) { 
            arrNum.push(randNum);
        }
    }

    return arrNum;
}

function elementGenerator(element, className){
    let item = document.createElement(element);
    item.classList.add(className);
    return item;
}

function buttonDisable (buttonOne, buttonTwo, buttonThree){
    buttonOne.setAttribute("disabled", "");
    buttonTwo.setAttribute("disabled", "");
    buttonThree.setAttribute("disabled", "");
}