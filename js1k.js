// TAKE OVER THAT CANVAS
// c = canvas context

d = document;

zm=3;

W = a.width  / zm;
H = a.height / zm;

//KEY
k = 0;
//KEYPRESSED
s = 5;

//STEP SIZE (FOR BALL AND PLAYER) 
z = 20;

//CUBES HEIGHT/WIDTH, PLAYER HEIGHT 
//MMM.. COLORS
g = 'gray';
r = '#F5C959';
b = 'black';

// DELTATIMES
N = Date.now;
pN = N();

// INIT
x=10, y=10;

c.scale(zm,zm);

var cs = Math.cos(120.01), sn = Math.sin(120.01);
var hh = Math.cos(17.50);
var aa = 100*cs, bb = -100*sn, cc = 200;
var dd = hh*100*sn, ee = hh*100*cs, ff = 200;

var image = new Image();
image.src = "http://localhost:8000/grasstile.jpg";


var img = new Image();
img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAADFBMVEUAAABrw/85jv9Rtv+Mhd5YAAAAAXRSTlMAQObYZgAAAGZJREFUeNqt00EKwCAQQ9Ek3v/OtSBB0WDR/m0es1L8HGs3QE3lvbxFIANeg7UQGggnJMEAXIPSQgKOnIT6CyfAuwEDsNiCUegaeA9Ch4BbEHaLHbCQAVrfAQOwGN8ruqbfUQFOewAGOgOIVNucnAAAAABJRU5ErkJggg==";

//c.drawImage(this, 0, 0,


//c.setTransform(aa, dd, bb, ee, cc, ff);
//tx=-5;ty=-5;

// GAMELOOP
function gl() {
    requestAnimationFrame(gl);
    dr(0,0,W,H,'#5E5E5E');
        
    D = (N()-pN) / 100;
    pN = N();

    x += 2;
    y = 50*Math.cos(x);
    if (x>W) { x=0; }

    c.drawImage(img,0,0);    
    dr(x,y,10,10,r);

};
gl();

// DRAW RECTANGLE
function dr(x,y,w,h,l) {
    c.fillStyle = l;
    c.fillRect(x,y,w,h);
}

//KEYBOARD HOOKS 
d.onkeydown = function(e) {
    k = e.keyCode;
}
d.onkeyup = function(e) {
    k = 0;
}