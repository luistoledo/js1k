// TAKE OVER THAT CANVAS
// c = canvas context
d = document;

// ZOOM FACTOR
zm=3;

W = a.width  / zm;
H = a.height / zm;

// KEY PRESSED
k = 0;

// STEP SIZE
z = 2;

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

// INIT
x=10, y=10;

c.scale(zm,zm);

// ENEMIES
e=new Array();

// BULLETS
b = new Array();

// DRAW RECTANGLE
dr = function (x,y,w,h,l,t) {
    c.fillStyle = l;
    c.fillRect(x,y,w,h);
};

// COLLITION
co = function (o,d){
  for (var i=0;i<d.length;i++) {
    var m = d[i];
    if ( (o.x+o.w >= m.x) && 
         (o.x <= m.x+m.w) &&
         (o.y+o.w >= m.y) &&
         (o.y <= m.y+m.w))
      { d.splice(i,1);
      return true; }
  }
  return false;
}

// CREATE RECTANGLE
nr = function (x,y,w,l){
  return new Object ({x:x || W+Math.random()*90,
                      y:y || Math.random()*H, 
                      i:0,
                      w:w || 10,
                      l:0 || l
                    });
}


// nasty reuse of key to be the index in the loop to fill enemies
while(k<5) {
  e.push(nr());
  k++;
}

// GAMELOOP
function gl() {
    requestAnimationFrame(gl);
    dr(0,0,W,H,'#5E5E5E');
        
    D = (N()-pN) / 100;
    pN = N();

// PLAYER
    if (k!=0){
      if (k==40) y += z;
      if (k==38) y -= z;
      // to shoot: create bullet and reset keypressed
      if (k==32) { b.push(nr(x,y,5)); k=0;}
    }

    if (y<0) y=0;
    if (y>H) y=H-10;

    dr(x, y, 10, 10, g);

// ENEMIES
    for (var i=0; i<e.length; i++) {
      var m = e[i];
      m.y -= z*Math.cos(m.i*D);
      m.x -= z;

      m.i++;
      if (m.x<0 || co(m,b)) e[i]=nr();
      
      dr(m.x, m.y, 10, 10, r);
    }

// BULLETS
    for (var i=0; i<b.length; i++) {
      var m = b[i];
      m.x += z;
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