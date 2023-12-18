const myCanvas = document.getElementById('myCanvas');

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;
//kontekst
const ctx = myCanvas.getContext ('2d');
console.log(ctx);


//arbejde med konteksten, indeholder alle metoder og properties
ctx.fillStyle = '#66990070';
ctx.lineWidth = 5;
ctx.fillRect(50,140,60,60)

ctx.fillStyle = 'green';
ctx.lineWidth = 5;
ctx.fillRect(10,290,100,60)

ctx.fillStyle = 'blue';
ctx.fillRect (200,10,90,90);
ctx.fillRect(300,10,900,300);

// Draw the ellipse
ctx.beginPath();
ctx.ellipse(300, 100, 70, 70, Math.PI / 1, 0, 1.5 * Math.PI);
ctx.stroke();

// Draw the ellipse's line of reflection
ctx.beginPath();
ctx.setLineDash([6, 6]);
ctx.moveTo(0, 200);
ctx.lineTo(200, 0);
ctx.stroke();


ctx.fillStyle = "orange";
ctx.beginPath();
ctx.ellipse(900, 700, 100, 100, Math.PI * 10, 10, Math.PI, true);
ctx.fill();


// Arc 
// Draw shapes
for (let i = 0; i <= 3; i++) {
    ctx.fillStyle = "black";
    ctx.lineWidth = 0.2;
    for (let j = 0; j <= 2; j++) {
      ctx.beginPath();
      let x = 40 + j * 0; // x coordinate
      let y = 20 + i * 200; // y coordinate
      let radius = 10; // Arc radius
      let startAngle = 0; // Starting point on circle
      let endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
      let counterclockwise = i % 2 === 1; // Draw counterclockwise
  
      ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  
      if (i > 1) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }


ctx.moveTo(90, 130);
ctx.lineTo(90, 25);
ctx.setLineDash([0, 0]);
ctx.lineTo(150, 90);
ctx.lineTo(213, 25);
ctx.lineTo(213, 130);
ctx.lineWidth = 40;
ctx.stroke();

//anima
class myRect {
    constructor(ctx){
        this.ctx = ctx;
        //random i sig selv giver et tal mellem 0 og 1 i kommatal, så derfor ganger vi op i 100
        this.x = Math.random () * 100;
        this.y = Math.random() * 100;
        this.width = Math.random () * 60;
        this.height = Math.random () * 10;
        this.drawRect();
}
updateRect (){
        this.ctx = ctx;
        this.x = Math.random () * 1000;
        this.y = Math.random() * 800;
        this.width = Math.random () * 100;
        this.height = Math.random () * 200;
        this.drawRect();
}
drawRect() {
    //this.ctx.fillStyle = '#eeaaee60';
    this.ctx.fillStyle = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.9)`;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

}

const myrect = new myRect(ctx);

var timer = setInterval(change, 50)

function change(){
    // ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    myrect.updateRect();
}
//--------------------------------------------