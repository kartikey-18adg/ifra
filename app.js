const CONFIG = {
  letters: {
    I: {
      caption: "The 'I' stands for impossible to stop thinking about you 😭",
      photo: "C:\Krish\plp\pvp-v2\ifra-date-v2\i.jpg",
      badgeBg: 'linear-gradient(135deg, #ff4d8d, #ff85ad)',
      badgeShadow: '#c4255e',
    },
    F: {
      caption: "The 'F' stands for finally founding you this fascinating 💜",
      photo: "c:\Krish\plp\pvp-v2\ifra-date-v2\f.jpg",
      badgeBg: 'linear-gradient(135deg, #b14aff, #d480ff)',
      badgeShadow: '#7a28c2',
    },
    R: {
      caption: "The 'R' stands for I really really REALLY like you 🥺",
      photo: "C:\Krish\plp\pvp-v2\ifra-date-v2\r.jpg",
      badgeBg: 'linear-gradient(135deg, #00c9be, #00f0e3)',
      badgeShadow: '#008f86',
    },
    A: {
      caption: "The 'A' stands for being absolutely amazing 🌟",
      photo: "C:\Krish\plp\pvp-v2\ifra-date-v2\a.jpg",
      badgeBg: 'linear-gradient(135deg, #ffe44d, #ffd000)',
      badgeShadow: '#c5a800',
      badgeColor: '#2a0a1f',
    },
  },

  
  noMessages: [
    "wrong button babe 😅",
    "are you sure??? 🥺",
    "the button is getting smaller for a reason...",
    "your finger slipped right? 😭",
    "just press YES come on!!",
    "the yes button is RIGHT THERE 👀",
    "ok i'm not mad... i'm just disappointed 😔",
    "last chance before it disappears!! 🚨",
    "...really? REALLY?? 😤",
    "ok fine i'll wait. i have snacks 🍿",
  ],
};

const modalBackdrop = document.getElementById('modalBackdrop');
const modalCard     = document.getElementById('modalCard');
const modalLetter   = document.getElementById('modalLetter');
const modalPhoto    = document.getElementById('modalPhoto');
const modalCaption  = document.getElementById('modalCaption');
const modalClose    = document.getElementById('modalClose');
const modalOk       = document.getElementById('modalOk');
const yesBtn        = document.getElementById('yesBtn');
const noBtn         = document.getElementById('noBtn');
const noCounter     = document.getElementById('noCounter');
const yesScene      = document.getElementById('yesScene');
const yesHearts     = document.getElementById('yesHearts');
const confettiContainer = document.getElementById('confettiContainer');

(function bgShapes() {
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const shapes = [];
  const palette = ['#ffd6e8','#f0d6ff','#d6f5f3','#fff3d6','#ffc8de','#e0c8ff'];
  const emojiForms = ['♥','★','✿','◆','●','▲'];

  for (let i = 0; i < 28; i++) {
    shapes.push({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    14 + Math.random() * 30,
      vx:   (Math.random() - 0.5) * 0.35,
      vy:   (Math.random() - 0.5) * 0.35,
      color: palette[Math.floor(Math.random() * palette.length)],
      form:  emojiForms[Math.floor(Math.random() * emojiForms.length)],
      angle: Math.random() * Math.PI * 2,
      spin:  (Math.random() - 0.5) * 0.012,
      alpha: 0.25 + Math.random() * 0.35,
    });
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const s of shapes) {
      s.x += s.vx; s.y += s.vy; s.angle += s.spin;

      if (s.x < -60)  s.x = canvas.width  + 60;
      if (s.x > canvas.width  + 60) s.x = -60;
      if (s.y < -60)  s.y = canvas.height + 60;
      if (s.y > canvas.height + 60) s.y = -60;

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.angle);
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = s.color;
      ctx.font = `${s.r * 2}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.form, 0, 0);
      ctx.restore();
    }

    requestAnimationFrame(tick);
  }

  tick();
})();

document.querySelectorAll('.letter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key  = btn.dataset.letter;
    const data = CONFIG.letters[key];
    if (!data) return;

    btn.classList.add('revealed');

    modalLetter.style.background   = data.badgeBg;
    modalLetter.style.color        = data.badgeColor || 'white';
    modalLetter.style.boxShadow    = `0 6px 20px ${data.badgeShadow}55`;
    modalLetter.textContent        = key;
    modalCaption.textContent       = data.caption;

    const prevImg = modalPhoto.querySelector('img');
    if (prevImg) prevImg.remove();
    const ph = modalPhoto.querySelector('.photo-placeholder');

    if (data.photo) {
      ph.style.display = 'none';
      const img = document.createElement('img');
      img.src = data.photo;
      img.alt = `Ifra — ${key}`;
      modalPhoto.appendChild(img);
    } else {
      ph.style.display = 'flex';
      ph.querySelector('p').innerHTML =
        `drop Ifra's pic here!<br/><small>set <code>photo: "photos/${key.toLowerCase()}.jpg"</code> in app.js</small>`;
    }

    openModal();
  });
});

function openModal() {
  modalBackdrop.classList.add('open');
  modalOk.focus();
}

function closeModal() {
  modalBackdrop.classList.remove('open');
}

modalClose.addEventListener('click', closeModal);
modalOk.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', e => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

let noCount = 0;
let noScale = 1;
let yesFontSize = 1;

noBtn.addEventListener('click', () => {
  noCount++;

  noScale = Math.max(0.25, noScale * 0.74);
  noBtn.style.transform    = `scale(${noScale})`;
  noBtn.style.opacity      = String(Math.max(0.06, noScale));
  if (noScale < 0.38) {
    noBtn.style.pointerEvents = 'none';
    noBtn.setAttribute('aria-disabled', 'true');
  }

  yesFontSize = Math.min(2.0, yesFontSize * 1.13);
  yesBtn.style.transform = `scale(${yesFontSize})`;

  const msgs = CONFIG.noMessages;
  noCounter.textContent = msgs[Math.min(noCount - 1, msgs.length - 1)];

  spawnConfetti(8, '#ff4d8d', '#b14aff');
});

yesBtn.addEventListener('click', () => {
  yesScene.classList.add('active');
  yesHearts.textContent = '💕 🌹 💖 🎉 ✨';
  spawnConfetti(120, '#ff4d8d', '#b14aff', '#ffe44d', '#00d4c8', '#ff85ad');
});

function spawnConfetti(count, ...colors) {
  const pieces = [];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';

    const color = colors[Math.floor(Math.random() * colors.length)];
    const left  = 10 + Math.random() * 80;
    const dur   = 1.2 + Math.random() * 2;
    const delay = Math.random() * 0.6;
    const size  = 8 + Math.random() * 10;
    const skew  = (Math.random() - 0.5) * 20;

    el.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size * 1.4}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      transform: skewX(${skew}deg);
    `;

    confettiContainer.appendChild(el);
    pieces.push(el);

    setTimeout(() => el.remove(), (dur + delay + 0.2) * 1000);
  }
}

document.querySelectorAll('.letter-btn').forEach((btn, i) => {
  btn.style.opacity = '0';
  btn.style.transform = 'scale(0.5)';
  setTimeout(() => {
    btn.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    btn.style.opacity    = '1';
    btn.style.transform  = 'scale(1)';
  }, 900 + i * 110);
});