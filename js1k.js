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
//JUNGLE GREEN
g = '#2ABB9B';
// YELLOW
w = '#F5C959';
// CINNABAR
r = '#E74C3C';

// DELTATIMES
N = Date.now;
pN = N();

// SCORE
s=0;
// LIVES
v=5;

// INIT
x=15, y=H/2;

c.t = c.fillText;

// ENEMIES
e=new Array();

// BULLETS
b = new Array();

// DRAW RECTANGLE
dr = function (x,y,w,h,l) {
    c.fillStyle = l;
    c.fillRect(x,y,w,h);
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
  return new Object ({x:x || W+Math.random()*150,
                      y:y || Math.random()*H, 
                      i:0,
                      w:w || 10,
                      l:0 || l
                    });
}


// nasty reuse of key to be the index in the loop to fill enemies
while(k<9) {
  e.push(nr());
  k++;
}

// GAMELOOP
function gl() {
    requestAnimationFrame(gl);
    if (v<=0) {
      dr(0,0,W,H,'#000');
      dr(0,0,0,0,'#fff');
      c.t("lost, reload",10,10);
    return
    }
    dr(0,0,W,H,'#666');

// DELTA TIME
    D = (N()-pN) / 100;
    pN = N();

// SCORE
    dr(10, 10, 5, 5, g);
    c.t(v, 20, 15);
    dr(10, 20, 5, 5, r);
    c.t(s, 20, 25);

// PLAYER
    if (k!=0){
      if (k==40) y += z;
      if (k==38) y -= z;
      // to shoot: create bullet and reset keypressed
      if (k==32) { b.push(nr(x,y,5)); k=0;}
    }

    if (y<0) y=0;
    if (y+10>H) y=H-10;

    // collition between player and enemies group
    if (co(({x:x,y:y,w:10}),e,0)) { 
      v--;
    }

    dr(x, y, 10, 10, g);

// ENEMIES
    for (var i=0; i<e.length; i++) {
      var m = e[i];
      m.y -= z*Math.cos(m.i*D);
      m.x -= z;

      m.i++;

      // if enemy passed behind or it collides with a bullet, reneweit
      if (m.x<0 || co(m,b,1)) { 
        e[i]=nr();
      }

      dr(m.x, m.y, 10, 10, r);
    }

// BULLETS
    for (var i=0; i<b.length; i++) {
      var m = b[i];
      m.x += z;

      // if a bullet passed away, removeit
      if (m.x>W) b.splice(i,1);
      
      dr(m.x, m.y, 5, 5, w);
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