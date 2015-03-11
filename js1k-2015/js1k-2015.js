/**
 * js1k 2015
 * February 2015
 * @author luisernesto.toledo@gmail.com (Luis Toledo)
 * @digitalcth digitalcth.com
 * 
 * MINI SHOOT'ER
 * A player that shoots dangerous enemy waves on top-down view.
 * WASD to move, MOUSE to aim and shoot. 
 * 
 * Version 1 features:
 * - 'smooth' player movement 
 * - mouse aim and shooting 
 * - simple AI that follows the player 
 * - enemies appears in waves 
 * - hud with score and health 
 * - eyecandy: different background flashes when got hurt and score!
 *
 * Version 2 features:
 * - eyecandy: different beep sound when shoot, got hurt and score!!
 *  - nasty audio strategy: using an endless oscillator, update the next frequency tone, and lastly reset the tone. same strategy as the background eyecandy
 * - eyecandy: mouse cursor as crosshair
 * - remove hud words, leaving just letters k: and h:
 * - better compression (from a minimized 1270 to a crushed 1024)
 * 
 * Version 1 compressed using: 
 * - uglifyjs --compress --mangle
 * - jscrush
 * 
 * Version 2 compressed using: 
 * - closure-compiler Adcanced (+ manual fixing)
 * - regPack --crushGainFactor 1 --crushLenghtFactor 0 --crushCopiesFactor 0
 *
 * Inspired by a js13k's winner: extreme-mini-massacre by @pixelstab http://js13kgames.com/entries/extreme-mini-massacre
 *
 * posted on: http://js1k.com/2015-hypetrain/demo/2154
 */

// b.style.cursor='crosshair';

u=g=null;

// MATH SHRINKS
M = Math;
B = M.abs;
R = M.random;

// SET SCALE
c.scale(9,9);

// WIDTH & HEIGHT
W=c.canvas.width/9;
H=c.canvas.height/9;

// KEYBOARD
k=[];

// BULLETS
t=[];

// ENEMIES
e=[];

// MOUSE KEYS X Y AND BUTTON
// Z KILLS COUNTER SCORE
// J BG COLOR
// F SOUND FREQUENCY
f=j=z=mb=mx=my=0;

// Creates a new game object
// X,Y: POSITION
// A: DIRECTION ANGLE
// C: COLOR
// E: 1 IF ITS AN ENEMIE
O = function (x,y,a,c,e){
  return ({x:x || R()*W,
           y:y || R()*H,
           a:a || 0,
           c:c || 0,
           e:e || 0
         });
}

// INIT PLAYER
p=O(W/2,H/2,g,'#0f0');
p.h=10; //PLAYERS HEALTH

// UPDATE AND DRAW GAME OBJECT
D=function(o, i) {
    // RECALCULATE ENEMIE DIRECTION (AI) EVERY RANDOM TIME
    if (o.e) {
        if (R() < .05)
            o.a = A(o,p);
        // REMOVE ENEMIE IF GOT HITTED BY A BULLET
        t.forEach(function(q){
            if (C(q, o)){
                e.splice(i,1);
                z++;
                j='#fff';
                f=300;
            }
        });
            
        // DAMAGE PLAYER
        if (C(p,o)) {
            p.h--;
            j='red';
            f=400;
        }
    }
    // DISSAPEAR BULLETS FROM OUT OF THE SCREEN
    else if(W-o.x<1||H-o.y<1)
        t.splice(i,1);


    // UPDATE POSITION (BULLETS AND ENEMIES)
    // ONLY OBJECTS WITH ANGLE DIRECCTION
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
A=function(o,q){
    return M.atan2(o.y-q.y, o.x-q.x);
}

// COLLITION BETWEEN TWO OBJECTS
// RETURNS TRUE IF THEY COLIDE
C=function(o,q){
    // return (mbs(o.x-q.x) < 1  && mbs(o.y-q.y) < 1);
    return (B(o.x-q.x) + B(o.y-q.y) < 2);
}


// GAME LOOP
G=function() {
// CLEAR BACKGROUND & RESET NEXT BG COLOR
    c.fillStyle=j;
    c.fillRect(0,0,W,H);
    j='#fde';

// In order to get the hud showed before players death, draw something (bullets) before game over
// UPDATE DRAW BULLETS
    t.forEach(D);

    // HUD
    c.fillText('k:'+z+' h:'+p.h,0,9);

// GAME OVER (SKIP) IF PLAYER IS DEAD
    if (p.h < 1) {v.stop(); return;}

// 'PLAY' NOTE ON THE OSCILLATOR, AND RESET THE FREQUENCY (f) FOR THE NEXT LOOP
    v.frequency.setValueAtTime(f,ac.currentTime);
    // v.frequency.value=f; // WEIRD SUSTAINED SOUNDS XD
    f=0;

// SHOOT A BULLET IF MOUSE PRESSED AND RANDOM
    if (mb && R()>.8) { 
        t.push( 
                O( p.x,
                    p.y,
                    A(p,O(mx,my)),
                    'Tan',
                    0)
              );
        f=200;
    }

// ADD SOME NEW ENEMIES EVERY ~37.0-7.9 SECS
// ADD AS MUCH AS THIS CODE LOOPS IN THAT PERIOD OF TIME
    if (Date.now()%45 < 1) {
        e.push(
                O(g,g,g,'red',1)
            );
    }

// PLACE DAH BOOOOMB!!!
    // if (Date.now()%99 < 1)
    if (R() > .99)
        u = O(g,g,g,'#000');

// IF A BOMB 'EXISTS', DRAW AND IF PLAYER GOT IT, EXPLODE THEM ALL!
    if (u) {
        D(u);
        if (C(p,u)) {
            u = g;
            z+=e.lenght;
            e=[];
            j='#fff';
            f=999;
        }
    }

// UPDATE DRAW ENEMIES
    e.forEach(D);

// UPDATE PLAYER
    p.y+=.5*(k[83]|0-k[87]|0);
    p.x+=.5*(k[68]|0-k[65]|0);

// DRAW PLAYER
    D(p,0);

// REPET GAME LOOP ON NEXT ANIMATION FRAME
// LEAVE THIS REQUEST AT THE END OF THE FUNCTION TO NOT FORCE/INTERRUPT THE REDRAW
    requestAnimationFrame(G);
}

// INITIALIZE A CONTINUOUS OSCILLATOR
ac=new AudioContext();
v=ac.createOscillator();
v.connect(ac.destination);
v.start(0);

G();


//KEYBOARD AND MOUSE HOOKS 
onkeydown = function(e) {
    k[e.keyCode]=1;
}
onkeyup = function(e) {
    k[e.keyCode]=0;
}
onmousemove = function(e) {
    mx=e.layerX/9;
    my=e.layerY/9;
}
onmousedown = function() {
   ++mb;
}
onmouseup = function() {
   --mb;
}
// onkeydown = onkeyup = function(e) {
//     k[e.keyCode] = (e.type=='keydown')? 1 : 0;
// }