// Cursor-following bat animation.
// Uses an inline SVG silhouette so there is no external sprite dependency.

(function batFollower() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || document.getElementById("cursor-bat")) return;

  const STYLE_ID = "cursor-bat-style";
  const BAT_ID = "cursor-bat";

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    #${BAT_ID} {
      width: 78px;
      height: 52px;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 2147483647;
      pointer-events: none;
      will-change: transform;
      filter: drop-shadow(0 5px 4px rgba(0, 0, 0, 0.28));
      transform-origin: 50% 50%;
    }

    #${BAT_ID} svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    #${BAT_ID} .bat-wing-left,
    #${BAT_ID} .bat-wing-right {
      transform-box: fill-box;
      animation-duration: 180ms;
      animation-timing-function: ease-in-out;
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }

    #${BAT_ID} .bat-wing-left {
      transform-origin: 100% 52%;
      animation-name: bat-flap-left;
    }

    #${BAT_ID} .bat-wing-right {
      transform-origin: 0% 52%;
      animation-name: bat-flap-right;
    }

    #${BAT_ID}.gliding .bat-wing-left,
    #${BAT_ID}.gliding .bat-wing-right {
      animation-duration: 540ms;
    }

    #${BAT_ID} .bat-body {
      animation: bat-body-bob 360ms ease-in-out infinite alternate;
      transform-origin: center;
      transform-box: fill-box;
    }

    @keyframes bat-flap-left {
      from { transform: rotate(15deg) scaleY(0.92); }
      to   { transform: rotate(-22deg) scaleY(0.66); }
    }

    @keyframes bat-flap-right {
      from { transform: rotate(-15deg) scaleY(0.92); }
      to   { transform: rotate(22deg) scaleY(0.66); }
    }

    @keyframes bat-body-bob {
      from { transform: translateY(-0.5px); }
      to   { transform: translateY(1.5px); }
    }
  `;
  document.head.appendChild(style);

  const bat = document.createElement("div");
  bat.id = BAT_ID;
  bat.setAttribute("aria-hidden", "true");
  bat.innerHTML = `
    <svg viewBox="0 0 120 78" xmlns="http://www.w3.org/2000/svg" role="presentation">
      <g fill="#111111">
        <g class="bat-wing-left">
          <path d="M57 35 C49 27 42 20 31 17 C19 13 8 14 2 20 C13 22 17 27 18 34 C11 31 6 32 3 36 C13 37 18 41 21 47 C14 45 10 47 8 51 C19 50 27 53 34 59 C35 51 40 45 47 42 C50 40 54 38 57 35 Z"/>
          <path d="M54 38 C44 36 35 37 27 42 C37 41 43 44 48 50 C49 45 51 41 54 38 Z" opacity="0.72"/>
        </g>

        <g class="bat-wing-right">
          <path d="M63 35 C71 27 78 20 89 17 C101 13 112 14 118 20 C107 22 103 27 102 34 C109 31 114 32 117 36 C107 37 102 41 99 47 C106 45 110 47 112 51 C101 50 93 53 86 59 C85 51 80 45 73 42 C70 40 66 38 63 35 Z"/>
          <path d="M66 38 C76 36 85 37 93 42 C83 41 77 44 72 50 C71 45 69 41 66 38 Z" opacity="0.72"/>
        </g>

        <g class="bat-body">
          <path d="M52 31 L55 19 L60 25 L65 19 L68 31 C72 35 73 43 69 51 L64 62 L60 71 L56 62 L51 51 C47 43 48 35 52 31 Z"/>
          <path d="M55 25 L57 12 L61 21 L65 12 L65 27 Z"/>
          <ellipse cx="60" cy="40" rx="7.5" ry="12"/>
          <circle cx="56.8" cy="31.5" r="1.15" fill="#f3f3f3" opacity="0.92"/>
          <circle cx="63.2" cy="31.5" r="1.15" fill="#f3f3f3" opacity="0.92"/>
        </g>
      </g>
    </svg>
  `;
  document.body.appendChild(bat);

  let x = Math.max(50, window.innerWidth * 0.25);
  let y = Math.max(50, window.innerHeight * 0.25);
  let vx = 0;
  let vy = 0;
  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.5;
  let pointerSeen = false;
  let lastPointerMove = performance.now();
  let rafId = 0;
  let phase = Math.random() * Math.PI * 2;

  function onPointerMove(event) {
    targetX = event.clientX;
    targetY = event.clientY;
    pointerSeen = true;
    lastPointerMove = performance.now();
  }

  function onResize() {
    x = Math.min(Math.max(30, x), Math.max(30, window.innerWidth - 30));
    y = Math.min(Math.max(24, y), Math.max(24, window.innerHeight - 24));
  }

  document.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });

  function animate(now) {
    if (!bat.isConnected) return;

    phase += 0.035;

    const idleFor = now - lastPointerMove;
    const orbitRadius = idleFor > 1200 ? 34 : 18;
    const orbitSpeed = idleFor > 1200 ? 0.9 : 1.6;

    let desiredX;
    let desiredY;

    if (pointerSeen) {
      desiredX = targetX + Math.cos(phase * orbitSpeed) * orbitRadius;
      desiredY = targetY + Math.sin(phase * orbitSpeed * 1.15) * orbitRadius - 26;
    } else {
      desiredX = window.innerWidth * 0.5 + Math.cos(phase * 0.7) * Math.min(180, window.innerWidth * 0.22);
      desiredY = window.innerHeight * 0.42 + Math.sin(phase * 0.95) * Math.min(110, window.innerHeight * 0.18);
    }

    const dx = desiredX - x;
    const dy = desiredY - y;
    const distance = Math.hypot(dx, dy);

    // Spring-like pursuit gives the bat a natural swooping flight path.
    const acceleration = distance > 220 ? 0.032 : 0.022;
    vx += dx * acceleration;
    vy += dy * acceleration;

    const drag = distance < 70 ? 0.82 : 0.88;
    vx *= drag;
    vy *= drag;

    const maxSpeed = distance > 260 ? 17 : 12;
    const speed = Math.hypot(vx, vy);
    if (speed > maxSpeed) {
      vx = (vx / speed) * maxSpeed;
      vy = (vy / speed) * maxSpeed;
    }

    x += vx;
    y += vy;

    x = Math.min(Math.max(26, x), Math.max(26, window.innerWidth - 26));
    y = Math.min(Math.max(20, y), Math.max(20, window.innerHeight - 20));

    const heading = Math.atan2(vy, vx) * (180 / Math.PI);
    const bank = Math.max(-18, Math.min(18, vy * 1.7));
    const scale = 0.93 + Math.min(0.13, speed / 100);

    bat.classList.toggle("gliding", speed < 3.2);
    bat.style.transform = `translate3d(${x - 39}px, ${y - 26}px, 0) rotate(${heading + bank * 0.18}deg) scale(${scale})`;

    rafId = window.requestAnimationFrame(animate);
  }

  window.__batFollowerCleanup = function cleanupBatFollower() {
    window.cancelAnimationFrame(rafId);
    document.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("resize", onResize);
    bat.remove();
    style.remove();
  };

  rafId = window.requestAnimationFrame(animate);
})();
