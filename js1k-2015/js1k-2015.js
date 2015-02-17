// file:///Users/luis/projects/js/js1k/js1k-2015/shim.html
g=null;

c.t = c.fillText;

MT = Math;
ab=MT.abs;

R = MT.random;

// DELTA
N = Date.now;
// pN = N();

// SET SCALE
c.scale(9,9);

cc=c.canvas;
// WIDTH & HEIGHT
W=cc.width/9;
H=cc.height/9;

// KEYBOARD
k=t=e=[];

// BULLETS
// t=[];

// ENEMIES
// e=[];

mb=mx=my=0;

// Creates a new game object
// X,Y: POSITION
// A: DIRECTION ANGLE
// C: COLOR
// E: 1 IF ITS AN ENEMIE
no = function (x,y,a,c,e){
  return ({x:x || R()*W,
           y:y || R()*H,
           a:a || 0,
           c:c || 0,
           e:e || 0
         });
}

// PLAYER
p=no(W/2,H/2,g,'#0f0');
p.h=50; //PLAYER HEALTH

// UPDATE AND DRAW GAME OBJECT
ud=function(o, i) {
    // RECALCULATE ENEMIE DIRECTION (AI) EVERY RANDOM TIME
    if (o.e) {
        if (R() < .05)
            o.a = fm(o,p);
        // REMOVE ENEMIE IF GOT HITTED BY A BULLET
        t.forEach(function(q){
            if (co(q, o)){
                // console.log('kill:'+i);
                e.splice(i,1);
            }
        });
            
        // DAMAGE PLAYER
        if (co(p,o)) {
            // console.log('hit player:'+p.h);
            p.h--;
        }
    }
    // DISSAPEAR BULLETS FROM OUT OF THE SCREEN
    else if(W-o.x<1||H-o.y<1)
        t.splice(i,1);


    // UPDATE POSITION (BULLETS AND ENEMIES)
    // ONLY IF THERE IT HAS AN ANGLE DIRECCTION
    if (o.a) {
        o.x-=MT.cos(o.a);
        o.y-=MT.sin(o.a);
    }

    // DRAW
    c.fillStyle=o.c;
    c.fillRect(o.x,o.y,1,1);
};

// CALCULATE ANGLE FROM POINT TO POINT
// o,q = game object object 1 & 2
// RETURN ANGLE FROM 0 TO -3.6
fm = function(o,q){
    return MT.atan2(o.y-q.y, o.x-q.x);
}

// COLLITION BETWEEN TWO OBJECTS
// RETURNS TRUE IF THEY COLIDE
co=function(o,q){
    // return (mbs(o.x-q.x) < 1  && mbs(o.y-q.y) < 1);
    return (ab(o.x-q.x) + ab(o.y-q.y) < 2);
}


// GAME LOOP
gl=function() {
// CLEAR BUFFER
    c.clearRect(0,0,W,H);

// UPDATE DELTATIME
    // D = N()-pN;
    // pN = N();

// ADD NEW ENEMIE EVERY 100 SECS OR SO
    if (N()%100 < 1) {
        e.push(
                no(g,g,g,'red',1)
            );
        // console.log (no());
    }

// UPDATE DRAW ENEMIES
    e.forEach(ud);

// SKIP IF PLAYER IS DEAD
    if (p.h < 1) return;

// DRAW PLAYER
    p.y+=0.5*(k[83]|0-k[87]|0);
    p.x+=0.5*(k[68]|0-k[65]|0);
    // p.y+=k[40]|0-k[38]|0;
    // p.x+=k[39]|0-k[37]|0;
    ud(p);

// SHOOT A BULLET IF MOUSE PRESSED AND RANDOM
    if (mb && R()>.8) { 
        t.push( 
                no( p.x,
                    p.y,
                    fm(p,no(mx,my)),
                    '#993',
                    0)
              );
    }

// UPDATE DRAW BULLETS
    t.forEach(ud);

    requestAnimationFrame(gl);
}

gl();


//KEYBOARD HOOKS 
b.onkeydown = function(e) {
    k[e.keyCode]=1;
    // console.log(e.keyCode);
}
b.onkeyup = function(e) {
    k[e.keyCode]=0;
}
b.onmousemove = function(e) {
    mx=e.layerX/9;
    my=e.layerY/9;
}
b.onmousedown = function() {
   ++mb;
}
b.onmouseup = function() {
   --mb;
}