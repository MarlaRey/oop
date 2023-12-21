let cols, rows;
let tileSize = 40;
let targetTileSize = 100;
let landscape = [];
let jakker = [];
let currentJacketIndex = 0;
let canvas;

let kopieredeJakker = [];
let hoveringJakke = null;

// Farver for hver sektion (RGB-værdier)
const sektionFarver = [
  [[48, 63, 88], [30, 42, 58]], // Sektion 1: Mørk grå og mørk blå
  [[205, 212, 227], [127, 151, 184], [255, 231, 104]], // Sektion 2: Lysere grå, lysere blå og lys gul
  [[234, 234, 234], [184, 204, 216]], // Sektion 3: Mørk hvid og meget lys blå
  [[128, 128, 128], [245, 215, 105], [228, 77, 77], [86, 137, 166]], // Sektion 4: Grå, gul, rød, blå
  [[69, 69, 69], [247, 213, 74], [228, 77, 77], [86, 113, 116], [125, 88, 69]], // Sektion 5: Mørkere grå, gul, rød, blå, brun
  [[46, 46, 46], [30, 42, 58]], // Sektion 6: Lys sort og mørk blå
];

function preload() {
    const imagePaths = [
        'assets/img/jakke1.png',
        'assets/img/jakke2.png',
        'assets/img/jakke3.png',
        'assets/img/jakke4.png',
    ];

    for (let i = 0; i < imagePaths.length; i++) {
        jakker[i] = loadImage(imagePaths[i]);
    }
}

function setup() {
    createCanvas(900, 600, WEBGL); // Brug WEBGL-renderer
    cols = floor(width / tileSize);
    rows = floor(height / tileSize);
 

    // Initialiser landskabet
    landscape = [];
    for (let i = 0; i < cols; i++) {
        landscape[i] = [];
        for (let j = 0; j < rows; j++) {
            landscape[i][j] = {
                jacket: null,
                size: tileSize,
                rotation: random(TWO_PI),
                rotationSpeed: random(-0.02, 0.01),
                growth: 10,
                color: randomColor(i, j),
            };
        }
    }
}

function draw() {
    background(255);

    // Tegn landskabet med jakker
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let x = i * tileSize + tileSize / 2;
            let y = j * tileSize + tileSize / 2;

            let jacketData = landscape[i][j];

            // Animér størrelsen
            if (jacketData.growth > 0) {
                jacketData.size = lerp(jacketData.size, targetTileSize, 0.1);
                jacketData.growth *= 0.2; // Tilføj en bremse for at undgå uendelig vækst
            }

            // Tegn jakker
            if (jacketData.jacket !== null) {
                push();
                translate(-width / 2 + x, -height / 2 + y);
                rotateZ(jacketData.rotation);
                
                // Anvend farve direkte på jakken
                tint(jacketData.color);
                
                imageMode(CENTER);
                image(jacketData.jacket, 0, 0, jacketData.size, jacketData.size);
                pop();
            }
        }
    }
}


function mouseMoved() {
    // Tjek om musen er inden for lærredet
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
        let i = floor(mouseX / tileSize);
        let j = floor(mouseY / tileSize);

        // Tjek om i og j er inden for arrayets grænser
        if (i >= 0 && i < cols && j >= 0 && j < rows) {
            // Nulstil størrelsen, rotationen og start en ny vækst
            landscape[i][j].size = random(30, 150);
           
            landscape[i][j].growth = 1;

            // Vælg en tilfældig jakke baseret på farveafsnit
            landscape[i][j].jacket = jakker[currentJacketIndex];

            // Indfør farven fra det forrige projekt
            landscape[i][j].color = randomColor(i, j);

            // Skift til næste jakke i arrayet
            currentJacketIndex = (currentJacketIndex + 1) % jakker.length;
        }
    }
}

function randomColor(i, j) {
    let hue;
    let saturation ;
    let brightness ;

    // Opdel farvesektioner baseret på musens position
    let section = floor(map(j, 0, rows, 0, 8)); // Ændret maks til 8 for at give plads til sektion 7 og 8

    switch (section) {
        case 0: // Mørk grå variation baseret på en turkisblå base
            hue = random(205);
            saturation = (83)
            brightness = (17);
            break;
        case 1: // Lys grå og lys blå
            hue = random(200, 240);
            break;
        case 2: // Meget lys i hvide og gule farver, kun kvart så høj
            hue = random(36, 15);
            saturation = (93);
            brightness = (82);
            j *= 40; // Gør sektionen kvart så høj
            break;
        case 3: // Mørk grå, brun, gul, blå
            hue = random(0, 30);
            break;
        case 4: // Mørkeblå, mørkebrun, gul, rød, beige
            hue = random(200, 240);
            break;
        case 5: // Mørk grå, sort og mørk blå
            hue = random(0, 30);
            break;
        case 6: // Ekstra sektion
            hue = random(100, 150);
            break;
        case 7: // Ekstra sektion
            hue = random(50, 100);
            break;
        default:
            hue = 0;
            break;
    }

    return color(hue, saturation, brightness);
}
