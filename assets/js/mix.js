let cols, rows;
let tileSize = 30;
let targetTileSize = 100;
let landscape = [];
let jakker = [];
let currentJacketIndex = 0;

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

    colorMode(HSB, 360, 100, 100);

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
    cursor('pointer');
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
    let saturation = random(-100, 80);
    let brightness = random(10, 100);

    // Opdel farvesektioner baseret på musens position
    let section = floor(map(j, 0, rows, 0, 8)); // Ændret maks til 8 for at give plads til sektion 7 og 8

    switch (section) {

        case 0: // Ekstra sektion
        hue = random(200, 300);
            break;
            case 1: // Ekstra sektion
            hue = random(200, 240, 230);
                break;
            case 2: // Mørk grå, sort og mørk blå
            hue = random(200, 240, 230);
                break;
            case 3: // Mørkeblå, mørkebrun, gul, rød, beige
            hue = random(200, 240, 300);
            break;
            case 4: // Mørk grå, brun, gul, blå
            hue = random(200, 240, 230);
            brightness = (90);
                break;
            case 5: // Meget lys i hvide og gule farver, kun kvart så høj
            hue = random(300,200);
            saturation = (93);
            brightness = (209);
            j *= 40; // Gør sektionen kvart så høj
            break;
            case 6: // Lys grå og lys blå
            hue = random(200, 240, 230);
            saturation = (30)
            brightness = (50);
            break;
            case 7: // Mørk grå variation baseret på en turkisblå base
            hue = random(200, 300);
            brightness = (25);
            break;
        default:
            hue = random(200, 300);
            brightness = (10);
            break;
    }

    return color(hue, saturation, brightness);
}
