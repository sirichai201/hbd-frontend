// Music toggle
let musicPlaying = false;

function toggleMusic() {
  const music = document.getElementById('birthdayMusic');
  const btn = document.getElementById('musicBtn');

  if (!musicPlaying) {
    music.play();
    btn.innerText = '⏸️ ปิดเพลง';
  } else {
    music.pause();
    btn.innerText = '🎵 เปิดเพลง';
  }
  musicPlaying = !musicPlaying;
}

// Show popup wish
function showWish() {
  document.getElementById('wishPopup').style.display = 'flex';
}

// Close popup
function closeWish() {
  document.getElementById('wishPopup').style.display = 'none';
}

// Confetti and Hearts
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle() {
  const isHeart = Math.random() > 0.7; // 30% chance to be a heart
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 5 + 5,
    speed: Math.random() * 3 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    isHeart: isHeart
  };
}

function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.y += p.speed;
    if (p.y > canvas.height) {
      p.y = -p.size;
    }
    ctx.fillStyle = p.color;
    if (p.isHeart) {
      ctx.font = `${p.size * 2}px Arial`;
      ctx.fillText("💖", p.x, p.y);
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  requestAnimationFrame(updateParticles);
}

window.addEventListener('resize', resizeCanvas);

function initParticles() {
  resizeCanvas();
  particles = Array.from({ length: 100 }, createParticle);
  updateParticles();
}

initParticles();