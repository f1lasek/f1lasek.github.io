// typewriter efekt
(function () {
  const el = document.getElementById('heroArg');
  if (!el) return;

  const words = ['UX/UI', 'vibecoder', 'builder', 'designer'];
  let wi = 0, ci = 0, phase = 'type';

  const cursor = el.nextElementSibling;

  function tick() {
    const word = words[wi];
    if (phase === 'type') {
      if (cursor) cursor.style.animation = 'none';
      ci++;
      el.textContent = word.slice(0, ci);
      if (ci >= word.length) {
        phase = 'pause';
        if (cursor) cursor.style.animation = '';
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
