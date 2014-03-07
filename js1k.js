// TAKE OVER THAT CANVAS
// c = canvas context

d = document;
W = a.width;
H = a.height;

//KEY
k = 0;
//KEYPRESSED
s = 5;

//STEP SIZE (FOR BALL AND PLAYER) 
z = 20;

//CUBES HEIGHT/WIDTH, PLAYER HEIGHT 
//MMM.. COLORS
g = 'gray';
r = 'red';
b = 'black';

// DELTATIMES
N = Date.now;
pN = N();
x=10;

// GAMELOOP
function gl() {
    requestAnimationFrame(gl);
    dr(0,0,W,H,'#fff');
    
    D = (N()-pN) / 10;
    pN = N();

    x = x + 2;
    if (x>W) { x=0; }
    
    dr(x,10,10,10,r);
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