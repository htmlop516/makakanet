// При загрузке страницы
window.onload = () => {
  // Фоновая музыка
  const bg = document.getElementById('bg-music');
  bg.play().catch(() => {}); // ignore autoplay block

  // Переход от boot-screen к desktop
  setTimeout(() => {
    document.getElementById('boot-screen').classList.add('hidden');
    document.getElementById('desktop').classList.remove('hidden');
  }, 4000);

  // Запуск AFK-глюка через 30 секунд простоя
  resetAFKTimer();
  ['mousemove','keydown','click'].forEach(e =>
    document.addEventListener(e, resetAFKTimer)
  );
};

let afkTimer;
function resetAFKTimer() {
  clearTimeout(afkTimer);
  afkTimer = setTimeout(triggerGlitch, 30000);
}

// Открытие приложений
function openApp(app) {
  const content = document.getElementById('app-content');
  const win     = document.getElementById('app-window');
  content.innerHTML = '';

  if (app === 'paint') {
    content.innerHTML = `<canvas id="paint-canvas" width="300" height="300"></canvas>`;
    initPaint();
  }
  else if (app === 'music') {
    content.innerHTML = `
      <h2>Select a song:</h2>
      <button onclick="playMusic('rickroll')">Rickroll</button><br>
      <button onclick="playMusic('gangnam')">Gangnam</button><br>
      <button onclick="playMusic('vatsok')">Vatsok</button>
    `;
  }
  else if (app === 'delete') {
    content.innerHTML = `<p>Are you sure you want to delete yourself?<br><button onclick="alert('Deletion failed — you\\'re too powerful.')">Yes</button></p>`;
  }

  win.classList.remove('hidden');
  resetAFKTimer();
}

// Закрытие окна
function closeApp() {
  document.getElementById('app-window').classList.add('hidden');
  resetAFKTimer();
}

// Инициализация Paint
function initPaint() {
  const canvas = document.getElementById('paint-canvas');
  const ctx = canvas.getContext('2d');
  let drawing = false;

  canvas.addEventListener('mousedown', () => drawing = true);
  canvas.addEventListener('mouseup',   () => drawing = false);
  canvas.addEventListener('mousemove', e => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#0f0';
    ctx.beginPath();
    ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 5, 0, Math.PI * 2);
    ctx.fill();
    resetAFKTimer();
  });
}

// Проигрывать музыку
function playMusic(id) {
  ['rickroll','gangnam','vatsok'].forEach(key => {
    const a = document.getElementById(key);
    if (key === id) {
      a.currentTime = 0;
      a.play();
    } else {
      a.pause();
    }
  });
  resetAFKTimer();
}

// Глюк-эффект
function triggerGlitch() {
  document.body.classList.add('glitch');
  const warning = document.createElement('div');
  warning.className = 'glitch-warning';
  warning.innerHTML = '<h2>⚠ Bloxy Entity Detected</h2><p>Reality integrity compromised.</p>';
  document.body.appendChild(warning);

  setTimeout(() => {
    document.body.innerHTML = '<h1 style="text-align:center;margin-top:20%;font-size:3rem;">█ █ █ █ █ █ █ █ █ █</h1>';
  }, 5000);
}
