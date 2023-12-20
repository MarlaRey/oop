let cols, rows;
let tileSize = 40;
let targetTileSize = 100; // Størrelse, som shapes vil vokse til
let landscape = [];
let activeShape = null;
let shapes = ["rect", "circle", "line"];
let currentShapeIndex = 0;

function setup() {
    createCanvas(900, 600);
    cols = floor(width / tileSize);
    rows = floor(height / tileSize);

    colorMode(HSB, 360, 100, 100);

    // Initialiser landskabet
    for (let i = 0; i < cols; i++) {
        landscape[i] = [];
        for (let j = 0; j < rows; j++) {
            landscape[i][j] = {
                color: color(0),
                size: tileSize,
                growth: 10,
                shape: null
            };
        }
    }
}

function draw() {
    background(25);

    // Tegn landskabet
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let x = i * tileSize;
            let y = j * tileSize;

            let shapeData = landscape[i][j];

            // Animér størrelsen
            if (shapeData.growth > 0) {
                shapeData.size = lerp(shapeData.size, targetTileSize, 0.1);
                shapeData.growth *= 0.2; // Tilføj en bremse for at undgå uendelig vækst
            }

            // Tegn forskellige former baseret på farveafsnit
            fill(shapeData.color);
            noStroke();

            switch (shapeData.shape) {
                case "circle":
                    ellipse(x + shapeData.size / 2, y + shapeData.size / 2, shapeData.size);
                    break;
           
                case "line":
                    line(x, y, x + shapeData.size, y + shapeData.size);
                    break;
                default:
                    rect(x, y, shapeData.size, shapeData.size);
                    break;
            }
        }
    }
}

function mouseMoved() {
    // Tjek om musen er inden for lærredet
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
        let i = floor(mouseX / tileSize);
        let j = floor(mouseY / tileSize);

        // Hvis det ikke er den samme shape som før
        if (activeShape !== landscape[i][j]) {
            // Gradvist ændre farven
            landscape[i][j].color = lerpColor(landscape[i][j].color, randomColor(i, j), 0.1);

            // Nulstil størrelsen og start en ny vækst
            landscape[i][j].size = random(1, 5); // Tilføj en tilfældig størrelse
            landscape[i][j].growth = 1;

            // Vælg en tilfældig form baseret på farveafsnit
            landscape[i][j].shape = shapes[currentShapeIndex];

            // Opdater den aktive shape
            activeShape = landscape[i][j];

            // Skift til næste form i arrayet
            currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
        }
    }
}

function randomColor(i, j) {
    let hue;
    let saturation = 100;
    let brightness = 100;

    // Opdel farvesektioner baseret på musens position
    let section = floor(map(j, 0, rows, 0, 6));

    switch (section) {
        case 0: // Mørk grå og mørk blå
            hue = random(0, 60);
            break;
        case 1: // Lys grå og lys blå
            hue = random(200, 240);
            break;
        case 2: // Gulgrå og lys gul
            hue = random(30, 60);
            break;
        case 3: // Mørk grå, brun, gul, blå
            hue = random(0, 240);
            break;
        case 4: // Mørkeblå, mørkebrun, gul, rød, beige
            hue = random(200, 360);
            break;
        case 5: // Mørk grå, sort og mørk blå
            hue = random(0, 60);
            break;
        default:
            hue = 0;
            break;
    }

    return color(hue, saturation, brightness);
}
