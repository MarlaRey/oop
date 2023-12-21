let cols, rows;
let tileSize = 40;
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
    createCanvas(900, 600);
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
                size: random(30, 150), // Tilfældig størrelse
                rotation: random(TWO_PI), // Tilfældig rotation
                rotationSpeed: random(-0.02, 0.01), // Tilføj en tilfældig rotationshastighed
                growth: 10,
            };
        }
    }
}

function draw() {
    background(25);

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

            // Håndter roteringsfase
            if (jacketData.rotationFrames > 0) {
                jacketData.rotationFrames--;

                // Tegn jakker
                if (jacketData.jacket !== null) {
                    push();
                    translate(x, y);
                    rotate(jacketData.rotation);
                    imageMode(CENTER);
                    image(jacketData.jacket, 0, 0, jacketData.size, jacketData.size);
                    pop();
                }
            } else {
                jacketData.rotation += jacketData.rotationSpeed;

                // Tegn jakker
                if (jacketData.jacket !== null) {
                    push();
                    translate(x, y);
                    rotate(jacketData.rotation);
                    imageMode(CENTER);
                    image(jacketData.jacket, 0, 0, jacketData.size, jacketData.size);
                    pop();
                }
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
            landscape[i][j].size = random(30, 150); // Tilføj en tilfældig størrelse
            landscape[i][j].rotation = random(TWO_PI); // Tilføj en tilfældig rotation
            landscape[i][j].rotationSpeed = random(-0.02, 0.02); // Tilføj en tilfældig rotationshastighed
            landscape[i][j].growth = 1;

            // Vælg en tilfældig jakke baseret på farveafsnit
            landscape[i][j].jacket = jakker[currentJacketIndex];

            // Skift til næste jakke i arrayet
            currentJacketIndex = (currentJacketIndex + 1) % jakker.length;
        }
    }
}
