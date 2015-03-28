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
 * Version 3 features:
 * - add bomb gameplay!
 *  - A bomb appears on screen every random time; when you touch it, all enemies dissapear and you scores
 * - add speed randomness to enemies
 * - fix disturbing sustained beep sound on gameover
 * - update game colors :)
 * - remove crosshair :\
 * - code optimization and better compression (from a minimized 1275 to a crushed 1019)
 *
 * Optimizations:
 * 
 * Version 1 compressed using: 
 * - uglifyjs --compress --mangle
 * - jscrush
 * 
 * Version 2 compressed using: 
 * - closure-compiler Adcanced (+ manual fixing)
 * - regPack --crushGainFactor 1 --crushLenghtFactor 0 --crushCopiesFactor 0
 *
 * Version 3 compressed using:
 * - uglifyjs --compress --mangle
 * - regPack --crushGainFactor 2 --crushLenghtFactor 0 --crushCopiesFactor 0
 * -* discard closure-compiler due scope issues with the "with" statement
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

// m: MOUSE BUTTON
// X,Y: MOUSE X Y
// z: KILLS COUNTER SCORE
// j: BG COLOR
// f: SOUND FREQUENCY
f=j=z=m=X=Y=0;

// Creates a new game object
// x,y: POSITION
// a: DIRECTION ANGLE
// L: COLOR
// E: 1 IF ITS AN ENEMIE
O = function (x,y,a,l,e){
  return ({x:x || R()*W,
           y:y || R()*H,
           a:a || 0,
           L:l || 0,
           E:e || 0
         });
}

// INIT PLAYER
p=O(W/2,H/2,g,'#fc2');
p.h=10; //PLAYERS HEALTH

// UPDATE AND DRAW GAME OBJECT
D=function(o, i) {
    with (o) {
    // RECALCULATE ENEMIE DIRECTION (AI) EVERY RANDOM TIME
        if (E) {
            if (R() < .05)
                a = A(o,p);
            // REMOVE ENEMIE IF GOT HITTED BY A BULLET
            t.forEach(function(q){
                if (C(q, o)){
                    e.splice(i,1);
                    z++;
                    j='#ddd';
                    f=3;
                }
            });
            // DAMAGE PLAYER
            if (C(p,o)) {
                p.h--;
                j='#fc2';
                f=4;
            }
        }
        // DISSAPEAR BULLETS FROM OUT OF THE SCREEN
        else if(W-x<1||H-y<1)
            t.splice(i,1);


        // UPDATE POSITION (BULLETS AND ENEMIES)
        // ONLY OBJECTS WITH ANGLE DIRECCTION
        if (a) {
            x-=M.cos(a);
            y-=M.sin(a);
        }

        // DRAW
        c.fillStyle=o.L;
        c.fillRect(x,y,1,1);
    }
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
    // return (abs(o.x-q.x) < 1  && abs(o.y-q.y) < 1);
    return (B(o.x-q.x) + B(o.y-q.y) < 2);
}


// GAME LOOP
G=function() {
// CLEAR BACKGROUND & RESET NEXT BG COLOR
    c.fillStyle=j;
    c.fillRect(0,0,W,H);
    j='#6aa';

// In order to get the hud showed before players death, draw something (bullets) before game over
// UPDATE DRAW BULLETS
    t.forEach(D);

    // HUD
    c.fillText('k:'+z+' h:'+p.h,0,9);

// GAME OVER (SKIP) IF PLAYER IS DEAD
    if (p.h < 1) {
        v.stop(1);
        return;
    }

// 'PLAY' NOTE ON THE OSCILLATOR, AND RESET THE FREQUENCY (f) FOR THE NEXT LOOP
// EXTERN SYNTAXT TO IMPROVE MY WORKFLOW WITH CLOSURE COMPILER. IT SHOULD BE READ AS v.frequency.setValueAtTime()
// v.frequency.value=f; // WEIRD SUSTAINED SOUNDS XD
    v.frequency.setValueAtTime(f*100,S.currentTime);
    f=0;

// SHOOT A BULLET IF MOUSE PRESSED AND RANDOM
    if (m && R()>.8) { 
        t.push( 
                O( p.x,
                    p.y,
                    A(p,O(X,Y)),
                    'Tan',
                    0)
              );
        f=2;
    }

// ADD SOME NEW ENEMIES EVERY ~37.0-7.9 SECS
// ADD AS MUCH AS THIS CODE LOOPS IN THAT PERIOD OF TIME
    if (Date.now()%45 < 1) {
        e.push(
                O(g,g,g,'#445',1)
            );
    }

// PLACE DAH BOOOOMB!!!
    // if (Date.now()%99 < 1)
    if (R() > .99)
        u = O(g,g,g,'red');

// IF A BOMB 'EXISTS', DRAW, AND IF PLAYER CATCH IT EXPLODE THEM ALL!
    if (u) {
        D(u);
        if (C(p,u)) {
            u = g;
            z+=e.length;
            e=[];
            j='red';
            f=7;
        }
    }

// UPDATE DRAW ENEMIES
    e.forEach(D);

// UPDATE PLAYER
    p.y+=.5*(k[83]|0-k[87]|0);
    p.x+=.5*(k[68]|0-k[65]|0);

// DRAW PLAYER
    D(p);

// REPEAT GAME LOOP ON NEXT ANIMATION FRAME
// LEAVE THIS REQUEST AT THE END TO NOT FORCE/INTERRUPT THE REDRAW (DIFICULTY IS HYPER SENCIBLE TO THAT)
    requestAnimationFrame(G);
}

// INITIALIZE A CONTINUOUS OSCILLATOR
S=new AudioContext();
v=S.createOscillator();
v.connect(S.destination);
v.start(0);

G();


//KEYBOARD AND MOUSE HOOKS 
onkeydown = function(e) {
    k[e.which]=1;
}
onkeyup = function(e) {
    k[e.which]=0;
}
onmousemove = function(e) {
    X=e.layerX/9;
    Y=e.layerY/9;
}
onmousedown = function() {
   ++m;
}
onmouseup = function() {
   --m;
}