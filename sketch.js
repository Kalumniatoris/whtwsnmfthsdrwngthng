var py = null;
var px = null;
var run;


conf = {
  colour:"#55ecba",
  l: [50, 50, 50],
  s: [1, 0.2, 0.5],
  r: [1, 1, 1],
  hider: false,
  colours: true,
  relative: true,
  tsp: 100,

  sound: false
}

pre = {
  s: [[1, 1 / 2, 1 / 3],
   [1 / 6, 1 / 3, 1],
   [-1 / 4, 1 / 2, 3 / 4],
   [1, 0.9, 0.9],
   [1, 1 / 3, 0],
   [1/3,1,2/3],
   [1,-1,-1/2],
   [1/3,1/6,1/9],
   [1/9,1/6,1/3],
   [1/3,2/3,3/3],
   [3/3,2/3,1/3],
   [1/3,1/6,1/12]
  
  ]
}
function setup() {


  createCanvas(screen.availWidth, screen.availHeight);
  pg = createGraphics(screen.availWidth, screen.availHeight);

  pg.stroke(color(conf.colour));
  pg.strokeWeight(2)
  stroke(128, 128, 128)

  cx = width / 2;
  cy = height / 2;

  fillpres();
  synth = new p5.MonoSynth();
  // /  osc.start();
}
var i = 0;
var c = 1;

var cx, cy, ax, ay, ax2, ay2, ax3, ay3;
function draw() {

  step();
  image(pg, 0, 0)

  if (!conf.hider) {
    line(cx, cy, ax, ay);
    line(ax, ay, ax2, ay2);
    line(ax2, ay2, ax3, ay3);
  }

  //p.push({ ax3, ay3 });
  //p.forEach(q => { point(q.ax3, q.ay3) });
  i = i + PI / conf.tsp;


}

function setql(x) {
  conf.tsp = x * x;
}
function clearP() {
  px = 0; py = 0;
  i = 0;
  pg.background(0);
}

function setl1(x) {
  conf.l[0] = x;
}
function setl2(x) {
  conf.l[1] = x;
}
function setl3(x) {
  conf.l[2] = x;
}

function sets1(x) {
  conf.s[0] = parseFloat(x);
}

function sets2(x) {
  conf.s[1] = parseFloat(x);
}

function sets3(x) {
  conf.s[2] = parseFloat(x);
}

function fhider(x) {
  conf.hider = x.checked;
}
function fcolours(x) {
  conf.colours = x.checked;
}

function frelative(x) {
  conf.relative = x.checked;
}
function step() {



  background(0);
  //pg.background(color(0,1))

  ax = conf.l[0] * sin(i * conf.s[0] * conf.r[0]) + cx;
  ay = conf.l[0] * cos(i * conf.s[0] * conf.r[0]) + cy;

  if (conf.relative) {
    ax2 = ax + conf.l[1] * sin(i * conf.s[1] * conf.r[1] + i * conf.s[0] * conf.r[0]);
    ay2 = ay + conf.l[1] * cos(i * conf.s[1] * conf.r[1] + i * conf.s[0] * conf.r[0]);
    ax3 = ax2 + conf.l[2] * sin(i * conf.s[2] * conf.r[2] + i * conf.s[1] * conf.r[1] + i * conf.s[0] * conf.r[0]);
    ay3 = ay2 + conf.l[2] * cos(i * conf.s[2] * conf.r[2] + i * conf.s[1] * conf.r[1] + i * conf.s[0] * conf.r[0]);
  }
  else {
    ax2 = ax + conf.l[1] * sin(i * conf.s[1] * conf.r[1]);
    ay2 = ay + conf.l[1] * cos(i * conf.s[1] * conf.r[1]);
    ax3 = ax2 + conf.l[2] * sin(i * conf.s[2] * conf.r[2]);
    ay3 = ay2 + conf.l[2] * cos(i * conf.s[2] * conf.r[2]);
  }
  if (conf.colours) {
    pg.colorMode(HSB)
    pg.stroke((i * 10) % 360, 100, 100)
  }

  else {
    pg.colorMode(RGB);
    pg.stroke(color(conf.colour));
  }
  //  / pg.point(ax3,ay3);
  if (px > 0) pg.line(px, py, ax3, ay3);
  px = ax3;
  py = ay3;

  if (conf.sound && (floor(millis()) % (floor(1000 / 6))) == 0) { playsound() }
}

function setvar(v, x) {
  conf[v] = x;
}

function mouseClicked(x) {
  userStartAudio();
}

function playsound() {

  let note = map(cx, width / 2 - 300, width / 2 + 300, 128, 1024);
  let vel = map(cy, height / 2 - 300, height / 2 + 300, 0, 1, true);
  let time = 0;
  let dur = 2 / 6;

  synth.play(note, vel, time, dur)
}

function rev(x, bol) {
  let tmp = bol ? -1 : 1;
  conf.r[x] = tmp;
}

function pres(x) {
  conf.s = pre.s[x];


  clearP();
  updateSliders();
}

function updateSliders() {
  let s1s = document.getElementById("s1slider");
  let s2s = document.getElementById("s2slider");
  let s3s = document.getElementById("s3slider");

  let c1=document.getElementById("r1ch");
  let c2=document.getElementById("r2ch");
  let c3=document.getElementById("r3ch");

  if (conf.s[0] >= 0) {
    s1s.value = conf.s[0];
    c1.checked=false;
  }
  else { s1s.value = -conf.s[0];c1.checked=true; }
  if (conf.s[1] >= 0) {
    s2s.value = conf.s[1];
    c2.checked=false;
  }
  else { s2s.value = - conf.s[1];c2.checked=true; }
  if (conf.s[2] >= 0) {
    s3s.value = conf.s[2];
    c3.checked=false;
  } else { s3s.value = conf.s[2];
    c3.checked=true;
  }
}

function fillpres(){
  //console.log("fillpres");
   let selpr=document.getElementById("selpr");

   for(let q=0;q<pre.s.length;q+=1){
     // console.log(q);

      var opt=document.createElement('option');
      opt.vale=q;
      opt.innerHTML=q;
      selpr.appendChild(opt);
   }
}

function setColour(col){
  conf.colour=col;

}