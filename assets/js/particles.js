const myCanvas = document.getElementById('myCanvas');

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;
//kontekst
const ctx = myCanvas.getContext ('2d');
console.log(ctx);

//arbejde med konteksten, indeholder alle metoder og properties
ctx.fillStyle = 'red';
ctx.lineWidth = 5;

ctx.fillRect(10,190,40,60)

ctx.fillStyle = 'blue';
ctx.fillRect (100,10,80,90);

ctx.fillstyle = 'green';

ctx.fillRect(300,10,100,300);

// elipse
// Arc 
// line 