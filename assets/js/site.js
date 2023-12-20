let myFrame = 0;

//her loades alt der skal bruges inden vi går videre
function preload() {}

function setup(){
    createCanvas(900,600);
}

//rækkefølgen fungerer som lag. Det første du skriver er nederst
function draw{
console.log(myFrame);

background (220);
ellipse(50 + myFrame, 50, 80, 80);
}

//arbejd med classes hvis nogle objekter skal kunne det samme