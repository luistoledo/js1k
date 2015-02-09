// TAKE OVER THAT CANVAS
// c = canvas context
d = document;

// ZOOM FACTOR
// Z=3;

// STEP SIZE && ZOOM FACTOR
// z = 3;

W = a.width  / 4;
H = a.height / 4;

c.scale(4,4);

// KEY PRESSED
k = 0;

//MMM.. COLORS
//JUNGLE GREEN 2ABB9B
g = '#3BA';
// YELLOW F5C959
// ITS GONNA BE USED DIRECTLY
// w = '#FD6'; 
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
T=10;

// INIT
x=T, y=H/2;

// fillText shortcut
c.t = c.fillText;

// ENEMIES
e = new Array();

// BULLETS
b = new Array();

// DRAGON PLAYER
img = new Image();
img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAQAAABaf7ccAAAAKklEQVR4AWMgDP4DIZyNUwmExGMKmqL/COWMaEYzgtmYutHFYBiXhaQAAE5qF+vrh9KMAAAAAElFTkSuQmCC";
// img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAGAQAAAADiByNKAAAAGklEQVQIHWOy/c8UxsBkeILpryVT3FWmB68ANHcGywxre7AAAAAASUVORK5CYII=";

// img.src="data:image/png;base64,"+btoa("PNGIHDRâ#JIDATc²ýÏÆÀdxé¯%SÜU¦¯4wËk{°IEND®B`");

// img.src="data:image/gif;base64,R0lGODdhEAAGAIAAAAAAAHt6eiwAAAAAEAAGAAACFASCcclouloz58HoaNUcp6pIjBcUADs="
// img.src="data:image/gif;base64,R0lGODdhEAAGAIAAAAAAAAAAACH5BAEAAAEALAAAAAAQAAYAAAIUBIJxyWi6WjPnweho1RynqkiMFxQAOw=="
// img.src="data:image/gif;base64,R0lGODdhEAAGAIAAAAAAAP///ywAAAAAEAAGAAACFASCcclouloz58HoaNUcp6pIjBcUADs="
n=t=1;

// context.fillStyle function
fs=function(l){c.fillStyle=l;}

// DRAW RECTANGLE
dd=function(o,l, w,h) {
    fs(l);
    c.fillRect(o.x, o.y, w||o.w, h||o.w);
};

// COLLITION
co=function(o,d,Q){
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
nr=function(x,y,w,l){
  return ({x:x || W+R()*99,
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

c.globalAlpha = 0.5;

// GAMELOOP
gl=function() {
    requestAnimationFrame(gl);
    c.clearRect(0,0,W,H);
    // dd(({x:0,y:0}),'#888',W,H);

    if (v<1) {
      // fs(r);
      c.t("score:"+s, T, T);
      return
    }


// DELTA TIME
    D = (N()-pN) / 100;
    pN = N();

// SCORE
    // fs(g);
    // dd(({x:5,y:5}), g, 5,5);
    // c.t(v, T, T);
    // fs(r);
    // dd(({x:5,y:15}), r, 5,5);
    // c.t(s, T, 20);

    c.t("score:"+s, T, T);
    c.t("lives:"+v, T, T*2);

// PLAYER
    // if (k!=0){
      if (k==40) y += 3;
      if (k==38) y -= 3;

      // to shoot: create bullet and reset keypressed
      if (k==32) { b.push(nr(x,y,5)); k=0;}
    // }

    // PLAYER BOUNCE WITH THE UPPER/LOWER LIMITS
    if (y<0) y=0;
    if (y+T>H) y=H-T;

    // collition between player and enemies group
    if (co( ({x:x,y:y,w:T}),e,0)) v--;

    // if(n++>9){ n=0; t++; if(t>1)t=0; }
    // c.drawImage(img,t*8,0,8,8,x,y,8,8);
    
    // if(n++>9) n=0;
    // c.drawImage(img,Math.round(n/10)*8,0,8,8,x,y,8,8);

    c.save();
    // if(n++>20) t=n=1;
    // if(n>10){ c.scale(1,-1); t=-1; }

    if(n++>9) n=1;
    t=Math.round(t/10);
    c.drawImage(img,x,t*y,8,8*t);
    c.restore();

//    dd(P, g);

// ENEMIES
    e.forEach(function(m,i) {
      m.y -= 3*Math.cos(m.i*D);
      m.x -= 3;

      m.i++;

      // if enemy passed behind or it collides with a bullet, reneweit
      if (m.x<0 || co(m,b,1))  
        e[i]=nr();

      dd(m, r);
    })

// BULLETS
    b.forEach(function(m,i) {
      m.x += 3;

      // if a bullet passed away, removeit
      if (m.x>W) b.splice(i,1);
      
      // dd(m, '#FD6');
      dd(m, '#863');
    })

};
gl();


//KEYBOARD HOOKS 
d.onkeydown = function(e) {
    k = e.keyCode;
}
d.onkeyup = function() {
    k = 0;
}