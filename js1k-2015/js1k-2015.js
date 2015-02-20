ac = new AudioContext();
v = ac.createOscillator();
v.connect(ac.destination);
v.start(0);

b.style.cursor='crosshair';

g=null;

// MATH SHRINKS
M = Math;
ab=M.abs;
R = M.random;

// DELTA
N = Date.now;

// SET SCALE
c.scale(9,9);

// WIDTH & HEIGHT
with(c.canvas){
    W=width/9;
    H=height/9;
}

// KEYBOARD
k=[];

// BULLETS
t=[];

// ENEMIES
e=[];

// MOUSE KEYS X Y AND BUTTON
// Z KILLS COUNTER
// J BG COLOR
f=j=z=mb=mx=my=0;

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
p.h=10; //PLAYERS HEALTH

// UPDATE AND DRAW GAME OBJECT
ud=function(o, i) {
    // RECALCULATE ENEMIE DIRECTION (AI) EVERY RANDOM TIME
    if (o.e) {
        if (R() < .05)
            o.a = fm(o,p);
        // REMOVE ENEMIE IF GOT HITTED BY A BULLET
        t.forEach(function(q){
            if (co(q, o)){
                e.splice(i,1);
                z++;
                j='#fff';
                f=300;
            }
        });
            
        // DAMAGE PLAYER
        if (co(p,o)) {
            p.h--;
            j='red';
            f=400;
        }
    }
    // DISSAPEAR BULLETS FROM OUT OF THE SCREEN
    else if(W-o.x<1||H-o.y<1)
        t.splice(i,1);


    // UPDATE POSITION (BULLETS AND ENEMIES)
    // ONLY IF THERE IT HAS AN ANGLE DIRECCTION
    if (o.a) {
        o.x-=M.cos(o.a);
        o.y-=M.sin(o.a);
    }

    // DRAW
    c.fillStyle=o.c;
    c.fillRect(o.x,o.y,1,1);
};

// CALCULATE ANGLE FROM POINT TO POINT
// o,q = game object object 1 & 2
// RETURN ANGLE FROM 0 TO -3.6
fm = function(o,q){
    return M.atan2(o.y-q.y, o.x-q.x);
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
    c.fillStyle=j;
    c.fillRect(0,0,W,H);
    j='#fde';

    v.frequency.setValueAtTime(f,ac.currentTime);
    f=0;

// ADD SOME NEW ENEMIES EVERY ~37.0-7.9 SECS
// ADD AS MUCH AS THIS CODE LOOPS IN THAT PERIOD OF TIME
    if (N()%60 < 1) {
        e.push(
                no(g,g,g,'red',1)
            );
    }

// UPDATE DRAW ENEMIES
    e.forEach(ud);

// HUD
    c.fillStyle='#000';
    c.fillText('k:'+z+' h:'+p.h,0,9);

// SKIP IF PLAYER IS DEAD
    if (p.h < 1) {v.stop(); return;}

// DRAW PLAYER
    p.y+=.5*(k[83]|0-k[87]|0);
    p.x+=.5*(k[68]|0-k[65]|0);

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
        f=200;
    }

// UPDATE DRAW BULLETS
    t.forEach(ud);

    requestAnimationFrame(gl);
}

gl();


//KEYBOARD HOOKS 
b.onkeydown = function(e) {
    k[e.keyCode]=1;
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