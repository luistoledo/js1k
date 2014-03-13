// TAKE OVER THAT CANVAS
// c = canvas context
d = document;

// ZOOM FACTOR
// Z=3;

// STEP SIZE
z = 3;

W = a.width  / z;
H = a.height / z;

c.scale(z,z);

// KEY PRESSED
k = 0;

//MMM.. COLORS
//JUNGLE GREEN 2ABB9B
g = '#3BA';
// YELLOW F5C959
w = '#FD6';
// CINNABAR E74C3C
r = '#E54';

// DELTATIMES
N = Date.now;
pN = N();

// RANDOMMMMM!
R = Math.random;

// SCORE
s=0;
// LIVES
v=5;

// CONSTANTS
T=10, F=5;

// INIT
x=T, y=H/2;

c.t = c.fillText;

// ENEMIES
e = new Array();

// BULLETS
b = new Array();

// DRAW RECTANGLE
// dr = function (x,y,w,h,l) {
//     c.fillStyle = l;
//     c.fillRect(x,y,w,h);
// };

dd = function (o,l, w,h) {
    c.fillStyle = l;
    c.fillRect(o.x, o.y, w||o.w, h||o.w);
};


// COLLITION
co = function (o,d,Q){
  for (var i=0;i<d.length;i++) {
    var m = d[i];
    if ( (o.x+o.w >= m.x) && 
         (o.x <= m.x+m.w) &&
         (o.y+o.w >= m.y) &&
         (o.y <= m.y+m.w))
      { d.splice(i,1);
        // another nasty lenghtsaver
        // send a true 3rd param to increment the score
        s+=Q;
      return true; }
  }
  return false;
}

// CREATE RECTANGLE
nr = function (x,y,w,l){
  return new Object ({x:x || W+R()*150,
                      y:y || R()*H, 
                      i:0,
                      w:w || T,
                      l:0 || l
                    });
}


// nasty reuse of key to be the index in the loop to fill enemies
while(k<T) {
  e.push(nr());
  k++;
}

// GAMELOOP
function gl() {
    requestAnimationFrame(gl);
    // dr(0,0,W,H,'#666');
    dd(({x:0,y:0}),'#666',W,H);

    if (v<=0) {
      c.fillStyle=r;
      c.t("lost, reload", T, T);
      return
    }


// DELTA TIME
    D = (N()-pN) / 100;
    pN = N();

// SCORE
    c.fillStyle=g;
    c.t(v, 20, 15);
    c.fillStyle=r;
    c.t(s, 20, 25);

// PLAYER
    if (k!=0){
      if (k==40) y += z;
      if (k==38) y -= z;
      // to shoot: create bullet and reset keypressed
      if (k==32) { b.push(nr(x,y,F)); k=0;}
    }

    // PLAYER BOUNCE WITH THE UPPER/LOWER LIMITS
    if (y<0) y=0;
    if (y+T>H) y=H-T;

    // collition between player and enemies group
    var P = ({x:x,y:y,w:T});
    if (co(P,e,0)) v--;

    // dr(x, y, T, T, g);
    dd(P, g);

// ENEMIES
    for (var i=0; i<e.length; i++) {
      var m = e[i];
      m.y -= z*Math.cos(m.i*D);
      m.x -= z;

      m.i++;

      // if enemy passed behind or it collides with a bullet, reneweit
      if (m.x<0 || co(m,b,1))  
        e[i]=nr();

      // dr(m.x, m.y, T, T, r);
      dd(m, r);
    }

// BULLETS
    for (var i=0; i<b.length; i++) {
      var m = b[i];
      m.x += z;

      // if a bullet passed away, removeit
      if (m.x>W) b.splice(i,1);
      
      // dr(m.x, m.y, F, F, w);
      dd(m, w);
    }
    
};
gl();


//KEYBOARD HOOKS 
d.onkeydown = function(e) {
    k = e.keyCode;
}
d.onkeyup = function(e) {
    k = 0;
}