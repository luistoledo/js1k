/**
 * js1k 2016
 * February 2016
 * @author luisernesto.toledo@gmail.com (Luis Toledo)
 * @digitalcth digitalcth.com
 *
 * FAUX IKEDA 1K
 * False Ryoji Ikeda visuals, inspired in Dataset 3
 *
 * Notes
 * screen scaled by 2 to reduce draws
 *
 * 2018 revamped with kanji instead of rnd numbers, add "rythm" and sound
 * (ideas: use only two arrays (kanji & blocks) half paints up half bottom)
 */

// MATH SHRINKS
M = Math;
R = M.random;

// SET SCALE
c.scale(2,2);

// WIDTH & HEIGHT
W=c.canvas.width/2;
H=c.canvas.height/2;

f=0; // FREQUENCY
o=1; // COUNTER

// ITEM: A VERTICAL TEXT
// THERE ARE HALF_WIDTH NUMBER OF ITEMS
// ITEM POSITION IS GIVEN BY THEIR INDEX * 5
// ITEM HAVE A LINE TO THEIR VALUE, VALUE IS A RANDOM BETWEEN WIDTH/8
E = [];
D = [];
K = [];
for (i=0;i<W/4;i++) {
  E[i]=R()*W/8;
  D[i]=R()*W/8;
  if (R()>0.1) E[i]=0;
  if (R()>0.1) D[i]=0;
  K[i]=""//+R();
}
var t=(n,f)=>{while(n-->0)f();}

// GAME LOOP
G=function() {
  o+=.001;

  // CLEAR BACKGROUND & RESET NEXT BG COLOR
  j='#112';
  c.fillStyle=j;
  c.fillRect(0,0,W,H);

  f=0;

  c.fillStyle = "#fff";
  c.font = "5px Monaco";

  c.lineWidth = 1;
  c.strokeStyle="#bbb";

  for (i=0; i<W/5; i++) {
    c.save();
    c.translate(i*5, H/4);
    c.rotate(-M.PI/2);
    c.fillText(K[i], 0,0);
    c.textAlign="end"; 
    c.fillText(K[i], - H/1.8,0);
    c.restore();

    if (M.tan(o*10) > 0.95) {
      if (R()>.995) {

        E[i] = R()*W/8;
        D[i] = R()*W/8;

        K[i]="";
        t(1+R()*8,()=>K[i]+=""+String.fromCharCode(12450+parseInt(90*R())));

        if (R()>0.5) {
          E[i]=0;
          //K[i]="";
          // c.fillStyle = "#00f";
          c.strokeStyle="#00f";
          f = 100 + R()*100;
        }
        if (R()>0.3) {
          D[i]=0;
          //K[i]="";
          c.fillStyle = "#f00";
          // c.strokeStyle="#f00";
          f = R()*10;
        }
      }
    }
    else {
      // f = M.min((M.cos(o*50)*R()*2), 0.2)-R(); //wind
      f = M.min((M.cos(o*10)), R())*5*R();
      //f = R() * o / 2;
    }

    v.frequency.setValueAtTime((f*100),S.currentTime);

    if (E[i]>0) {
      c.beginPath();
      c.moveTo(i*5, H/4); // ITEM-TEXT POSITION
      c.lineTo(2+E[i]*8, H/2); // RECT POSITION
      c.stroke();
      c.closePath();
    }

    if (D[i]>0) {
      c.beginPath();
      c.moveTo(i*5, H/4 + H/1.8); // ITEM-TEXT POSITION
      c.lineTo(2+D[i]*8, H/2+18); // RECT POSITION
      c.stroke();
      c.closePath();
    }

    // MIDDLE RECTS
    c.fillRect(E[i]*8, H/2,    3*(3+M.sin(o*i/13)) ,8);
    c.fillRect(D[i]*8, H/2+10, 3*(3+M.cos(o*i/13)) ,8);
  }

  requestAnimationFrame(G);
}

S=new AudioContext();
v=S.createOscillator();
v.connect(S.destination);
v.start(0);

G();