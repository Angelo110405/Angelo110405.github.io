// costruzione tabellone
const struttura = [
  [1,5,11,15,21,25],
  [6,10,16,20,26,30],
  [31,35,41,45,51,55],
  [36,40,46,50,56,60],
  [61,65,71,75,81,85],
  [66,70,76,80,86,90]
];
const tab = document.getElementById('tabellone');
struttura.forEach((sec, idx)=>{
  const box = document.createElement('div'); box.className='sezione';
  box.setAttribute('role','group'); box.setAttribute('aria-label','Sezione '+(idx+1));
  for(let r=0;r<3;r++){
    const row=document.createElement('div'); row.className='riga';
    const start=sec[r*2], end=sec[r*2+1];
    for(let n=start;n<=end;n++){
      const item=document.createElement('div'); item.className='numero'; item.id='num'+n; item.textContent=n;
      row.appendChild(item);
    }
    box.appendChild(row);
  }
  tab.appendChild(box);
});

// logica numero grande + marcatura
let stato=0, ultimoNumero=null;
const input=document.getElementById('numberInput');
const btn=document.getElementById('btn');
const big=document.getElementById('big-number');

function mostraNumeroStatico(n){
  big.textContent=n; stato=1; ultimoNumero=n;
}
function nascondiESegna(){
  if(ultimoNumero!==null){
    const cell=document.getElementById('num'+ultimoNumero);
    if(cell) cell.classList.add('marked');
  }
  stato=0; ultimoNumero=null; input.value='';
}
function handleInvio(){
  const val=parseInt(input.value,10);
  if(stato===1){ nascondiESegna(); return; }
  if(Number.isNaN(val)||val<1||val>90){ alert('Inserisci un numero valido tra 1 e 90'); return; }
  const existing=document.getElementById('num'+val);
  if(existing&&existing.classList.contains('marked')){ alert('Numero già segnato'); input.value=''; return; }
  mostraNumeroStatico(val);
}
btn.addEventListener('click', handleInvio);
input.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); handleInvio(); }});
input.focus();

// neve
setInterval(()=>{
  const f=document.createElement('div'); f.className='snowflake'; f.textContent='❄';
  f.style.left=Math.random()*100+'vw';
  f.style.fontSize=(10+Math.random()*18)+'px';
  f.style.animationDuration=(4+Math.random()*6)+'s';
  document.body.appendChild(f);
  setTimeout(()=>f.remove(),10000);
},220);

const p = "ntl";
let t = 0;

function checkp(){
  const pwd = prompt(" ");
  if(pwd === p){
    document.querySelector('.main-container').style.display = 'flex';
    document.querySelector('header').style.display = 'block';
  } else {
    t++;
    alert("P errata!");
    if(t >= 3) {
      alert("A negato!");
      window.close(); // prova a chiudere la finestra (non sempre funziona)
    }
  }
}

// All'avvio nascondi tutto e chiedi password
document.querySelector('.main-container').style.display = 'none';
document.querySelector('header').style.display = 'none';
checkp();

const dataScadenza = new Date("2025-12-25");
const oggi = new Date();
if(oggi > dataScadenza){
  alert("Il tabellone non è più disponibile.");
  document.body.innerHTML = "<h1>Il tabellone è scaduto</h1>";
  throw new Error("Tabellone scaduto");
}


/* ==========================================================
   LED SEQUENZIALI NATALIZI lungo tutte le ghirlande
   ========================================================== */

const coloriLed = ["red", "yellow", "green", "blue"];
let gruppiLed = [[], [], [], []];

function creaLedSequenziale(x, y, gruppo, colore) {
    const led = document.createElement("div");
    led.className = "led " + colore;
    led.style.left = x + "px";
    led.style.top = y + "px";
    document.body.appendChild(led);
    gruppiLed[gruppo].push(led);
}

function generaLuciSequenziali() {
    gruppiLed = [[], [], [], []];
    document.querySelectorAll(".led").forEach(e => e.remove());

    const w = window.innerWidth;
    const h = window.innerHeight;
    let gruppo = 0;

    // TOP
    for (let x = 30; x < w; x += 90) {
        creaLedSequenziale(x, 40, gruppo, coloriLed[gruppo]);
        gruppo = (gruppo + 1) % 4;
    }

    // RIGHT
    for (let y = 50; y < h; y += 90) {
        creaLedSequenziale(w - 50, y, gruppo, coloriLed[gruppo]);
        gruppo = (gruppo + 1) % 4;
    }

    // BOTTOM
    for (let x = 30; x < w; x += 90) {
        creaLedSequenziale(x, h - 50, gruppo, coloriLed[gruppo]);
        gruppo = (gruppo + 1) % 4;
    }

    // LEFT
    for (let y = 50; y < h; y += 90) {
        creaLedSequenziale(50, y, gruppo, coloriLed[gruppo]);
        gruppo = (gruppo + 1) % 4;
    }
}

function avviaSequenza() {
    let step = 0;
    setInterval(() => {
        gruppiLed.forEach((gr, idx) => {
            gr.forEach(led => led.classList.remove("on"));
        });

        gruppiLed[step].forEach(led => led.classList.add("on"));

        step = (step + 1) % gruppiLed.length;
    }, 450); // velocità sequenza
}

generaLuciSequenziali();
avviaSequenza();

window.addEventListener("resize", () => {
    generaLuciSequenziali();
});
