// typewriter efekt — prochází slova, simuluje lidský rytmus psaní
(function () {
  const el = document.getElementById('heroArg');
  if (!el) return;

  const words = ['toto', 'je', 'initial commit', 'Míša<3'];
  let wi = 0, ci = 0, phase = 'type';

  const cursor = el.nextElementSibling;

  function tick() {
    const word = words[wi];
    if (phase === 'type') {
      if (cursor) cursor.style.animation = 'none'; // kurzor se nehýbe při psaní
      ci++;
      el.textContent = word.slice(0, ci);
      if (ci >= word.length) {
        phase = 'pause';
        if (cursor) cursor.style.animation = ''; // blikání se obnoví při pauze
        setTimeout(tick, 2400);
        return;
      }
      setTimeout(tick, 80 + Math.random() * 60);
    } else if (phase === 'pause') {
      phase = 'delete';
      if (cursor) cursor.style.animation = 'none';
      setTimeout(tick, 60);
    } else if (phase === 'delete') {
      ci--;
      el.textContent = word.slice(0, ci);
      if (ci <= 0) {
        phase = 'type';
        wi = (wi + 1) % words.length;
        setTimeout(tick, 700);
        return;
      }
      setTimeout(tick, 55 + Math.random() * 35);
    }
  }

  setTimeout(tick, 1000);
})();

// téma — ukládá volbu do localStorage, fallback na prefers-color-scheme
const root = document.documentElement;
const btn = document.getElementById('themeToggle');
const sysDark = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(dark) {
  root.classList.toggle('dark', dark);
  root.classList.toggle('light', !dark);
}

const stored = localStorage.getItem('theme');
if (stored === 'dark') applyTheme(true);
else if (stored === 'light') applyTheme(false);

btn.addEventListener('click', () => {
  const isDark = root.classList.contains('dark') ||
    (!root.classList.contains('light') && sysDark.matches);
  applyTheme(!isDark);
  localStorage.setItem('theme', !isDark ? 'dark' : 'light');
});
