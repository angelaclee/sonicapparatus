// Synth Global Vars
let sampler, wave, ftt, img, imgSize;

function preload() {
  img = loadImage('assets/breakglass.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);

  imgSize = floor(0.8 * (windowWidth > windowHeight ? windowHeight : windowWidth));
  tint(255, 200); // Display at half opacity  
  image(img, windowWidth/2 - (imgSize/2), windowHeight/2 - (imgSize/2), imgSize, imgSize);

  // Create Sampler stuff
  fft = new Tone.FFT(256).toMaster();
  wave = new Tone.Waveform(256).toMaster();
  sampler = new Tone.Sampler({
    C3: "./samples/glass.mp3"
  });

  // Sampler Routing
  sampler.connect(fft);
  sampler.connect(wave);
}

function draw() {}

function mouseClicked() {
  stroke("white");
  let num = ceil(random(2, 5));

  crack(mouseX, mouseY, num);

  switch (true) {
    case num == 5:
      sampler.triggerAttackRelease("C2", "4n");
      break;
    case num == 4:
      sampler.triggerAttackRelease("C3", "4n");
      break;
    case num == 3:
      sampler.triggerAttackRelease("C4", "4n");
      break;
    case num == 2:
      sampler.triggerAttackRelease("C5", "4n");
      break;
  }
}

// recursive create cracks
function crack(x, y, num, previousVect) {
  stroke("white");
  if (num <= 0) {
    return;
  }

  strokeWeight(num);

  for (var i = 0; i < random(1, 3); i++) {
    let prev = makeCrack(x, y, previousVect);
    if (x < 0 || x > windowWidth || y < 0 || y > windowHeight) {
      return;
    }

    crack(prev.end.x, prev.end.y, num - 1, prev.previousVect);
  }
}

function makeCrack(x, y, previousVector) {
  // calculate a random line
  const center = createVector(x, y);

  let randomVect;
  if (previousVector) {
    let noise = p5.Vector.random2D().mult(random(20, 30));
    randomVect = previousVector.add(noise);
  } else {
    randomVect = p5.Vector.random2D().mult(random(20, 30));
  }
  let end = randomVect.copy().add(center);

  line(center.x, center.y, end.x, end.y);
  return {
    end: end,
    previousVect: randomVect
  };
}
