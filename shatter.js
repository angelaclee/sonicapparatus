// Synth Global Vars
let sampler, wave, ftt;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);

  // Create Sampler stuff
  fft = new Tone.FFT(256).toMaster();
  wave = new Tone.Waveform(256).toMaster();
  sampler = new Tone.Sampler({
    "C3": "./samples/glass.mp3",
  });

  // Sampler Routing
  sampler.connect(fft);
  sampler.connect(wave);
}

function draw() {}

function mouseClicked() {
  stroke('white');
  let num = ceil(random(2,5));
  // let num = 5;
  crack(mouseX, mouseY, num)
  // sampler.triggerAttackRelease('C3', '4n');

  console.log(num);


  switch (true) {
    case (num == 5):
      sampler.triggerAttackRelease('C2', '4n');
      break;
    case (num == 4):
      sampler.triggerAttackRelease('C3', '4n');
      break;
    case (num == 3):
      sampler.triggerAttackRelease('C4', '4n');
      break;
    case (num == 2):
      sampler.triggerAttackRelease('C5', '4n');
      break;
  }
}

// recursive create cracks
function crack(x, y, num, previousVect) {
  stroke('white');
  if (num <= 0) {
    return;
  }

  strokeWeight(num);

  for (var i = 0; i < random(1, 3); i++) {
    let prev = makeCrack(x, y, previousVect);
    if (x < 0 || x > windowWidth || y < 0 || y > windowWidth) {
      return;
    }

    crack(prev.end.x, prev.end.y, num-1, prev.previousVect);
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
