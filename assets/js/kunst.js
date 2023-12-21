let canvas;
let jakker = [];
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

  // Indlæs billeder og tilføj dem til jakker-arrayet
  for (let i = 0; i < imagePaths.length; i++) {
    jakker[i] = loadImage(imagePaths[i]);
  }
}

function setup() {
    canvas = createCanvas(900, 600);
    canvas.parent("canvasContainer");
  
    // Fjern jakkerne ved start
    kopieredeJakker = [];
    
    // Placer en tilfældig jakke ved musen
    hoveringJakke = { img: random(jakker), sektionIndex: 0, x: mouseX, y: mouseY };
   
  }
function draw() {
  background(0);

  // Tegn farvede sektioner og beregn sektionsstørrelse
  let sektionHoejde = height / sektionFarver.length;
  for (let i = 0; i < sektionFarver.length; i++) {
    fill([i][0]);
    rect(0, i * sektionHoejde, width, sektionHoejde);
  }

  // Tegn alle kopierede jakker
  for (let i = 0; i < kopieredeJakker.length; i++) {
    let kopi = kopieredeJakker[i];
    image(kopi.img, kopi.x, kopi.y, 100, 100);
  }

  // Tegn svævende jakke ved musen
  if (hoveringJakke) {
    tint(sektionFarver[hoveringJakke.sektionIndex][0]); // Anvend farve baseret på sektionen
    image(hoveringJakke.img, mouseX, mouseY, 100, 100);
    noTint(); // Nulstil farveændringen efter tegning af jakken
  }
}

function mousePressed() {
  // Find ud af, hvilken sektion musen er i
  let sektionIndex = floor(mouseY / (height / sektionFarver.length));

  // Når der klikkes, tilføj en kopi af den svævende jakke til kopieredeJakker-arrayet
  if (hoveringJakke) {
    let jakkeKopi = createImage(100, 100);
    jakkeKopi.copy(
      hoveringJakke.img,
      0,
      0,
      hoveringJakke.img.width,
      hoveringJakke.img.height,
      0,
      0,
      100,
      100
    );

    // Opdater farven på kopien baseret på sektionen med nedsat alpha
    jakkeKopi.loadPixels();
    for (let i = 0; i < jakkeKopi.pixels.length; i += 4) {
      let alpha = jakkeKopi.pixels[i + 3];
      if (alpha > 0) {
        jakkeKopi.pixels[i] = sektionFarver[sektionIndex][0][0];
        jakkeKopi.pixels[i + 1] = sektionFarver[sektionIndex][0][1];
        jakkeKopi.pixels[i + 2] = sektionFarver[sektionIndex][0][2];
        jakkeKopi.pixels[i + 3] = 150; // Juster alpha-værdien
      }
    }
    jakkeKopi.updatePixels();

    kopieredeJakker.push({
      img: jakkeKopi,
      x: mouseX,
      y: mouseY,
      sektionIndex: sektionIndex,
    });
  }

  // Vælg en tilfældig jakke til at svæve med musen
  hoveringJakke = { img: random(jakker), sektionIndex: sektionIndex };
}

function mouseMoved() {
    // Kontroller om musen er inden for lærredets grænser
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      // Opdater farven på den svævende jakke baseret på sektionen
      if (hoveringJakke) {
        hoveringJakke.sektionIndex = floor(mouseY / (height / sektionFarver.length));
      }
    }
  }
  