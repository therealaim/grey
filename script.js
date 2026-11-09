const RATE = 58.5;

const welcome = document.getElementById('welcome');
const send = document.getElementById('send');
const usd = document.getElementById('usd');
const php = document.getElementById('php');
const btn = document.getElementById('btn');

// Status bar clock
function updateClock() {
  const d = new Date();
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = h + ':' + m;
}
updateClock();
setInterval(updateClock, 30000);

// Welcome -> Send
document.getElementById('welcomeContinue').addEventListener('click', function () {
  welcome.classList.add('hidden');
  send.classList.remove('hidden');
});

// Send -> Welcome
document.getElementById('backBtn').addEventListener('click', function () {
  send.classList.add('hidden');
  welcome.classList.remove('hidden');
});

function clean(value) {
  return value.replace(/[^0-9.]/g, '');
}

function format(n) {
  return String(Math.round(n * 100) / 100);
}

function updateButton() {
  const hasValue = parseFloat(usd.value) > 0 || parseFloat(php.value) > 0;
  btn.disabled = !hasValue;
}

usd.addEventListener('input', function () {
  usd.value = clean(usd.value);
  const v = parseFloat(usd.value);
  php.value = isNaN(v) ? '' : format(v * RATE);
  updateButton();
});

php.addEventListener('input', function () {
  php.value = clean(php.value);
  const v = parseFloat(php.value);
  usd.value = isNaN(v) ? '' : format(v / RATE);
  updateButton();
});

btn.addEventListener('click', function () {
  if (btn.disabled) return;
  window.location.href = 'index2.html';
});
