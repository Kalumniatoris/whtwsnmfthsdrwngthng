var py=null;
var px=null;
var run;

conf={


}
function setup() {

  createCanvas(screen.availWidth,screen.availHeight);
  pg=createGraphics(screen.availWidth,screen.availHeight);
  
  pg.stroke(128,200,128);
  pg.strokeWeight(2)
  stroke(128,128,128)


  // /  osc.start();
}
var i = 0;
var c = 1;
var p = [];

l1 = 50;
l2 = 50;
l3 = 50;

s1 = 1;
s2 = -1;
s3 = 0.5;

tsp=100
hider=false;
colours=true;
relative=true;
var cx,cy,ax,ay,ax2,ay2,ax3,ay3;
function draw() {
  
  step();
  image(pg,0,0)

   if(!hider){
   line(cx, cy, ax, ay);
   line(ax, ay, ax2, ay2);
   line(ax2, ay2, ax3, ay3);}

  //p.push({ ax3, ay3 });
  //p.forEach(q => { point(q.ax3, q.ay3) });
  i = i + PI / tsp;
  //i=i>2*PI?0:i;
 // c = i == 0 ? c + 1 : c;

  // l1+=0.01
  // l2-=0.01
  if (p.length >= 10000) { p = []; }
   
  //pg.background(color(0,3))
  // osc.freq(ay2-height/4,0.1)
  // osc.amp(ax,0.1)
}

function setql(x){
  tsp=x*x;
}
function clearP() {
  px=0;py=0;
  i=0;
  pg.background(0);
}

function setl1(x) {
  l1 = x;
}
function setl2(x) {
  l2 = x;
}
function setl3(x) {
  l3 = x;
}

function sets1(x) {
  s1 = parseFloat(x);
}

function sets2(x) {
  s2 = parseFloat(x);
}

function sets3(x) {
  s3 =parseFloat(x);
}

function fhider(x){
hider=x.checked;
}
function fcolours(x){
  colours=x.checked;
  }

  function frelative(x){
    relative=x.checked;
    }
function step(){

  

  background(0);

  cx = width / 2;
  cy = height / 2;
  ax = l1 * sin(i * s1) + cx;
  ay = l1 * cos(i * s1) + cy;

  if(relative){
 ax2 = ax + l2 * sin(i * s2 + i*s1);
  ay2 = ay + l2 * cos(i * s2 + i*s1);
   ax3 = ax2 + l3 * sin(i * s3+ i*s2 +i*s1);
  ay3 = ay2 + l3 * cos(i * s3+ i*s2 +i*s1);
  }
  else{
    ax2 = ax + l2 * sin(i * s2);
    ay2 = ay + l2 * cos(i * s2);
     ax3 = ax2 + l3 * sin(i * s3);
    ay3 = ay2 + l3 * cos(i * s3);
  }
 if(colours){
  pg.colorMode(HSB)
  pg.stroke((i*10)%360,100,100)}
  else{
    pg.colorMode(RGB);
    pg.stroke(128,222,128)
  }
  pg.point(ax3,ay3);
  if(px>0) pg.line(px,py,ax3,ay3);
  px=ax3;
  py=ay3;


}