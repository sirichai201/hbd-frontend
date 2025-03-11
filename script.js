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

// Popup steps
let currentStep = 0;
let currentImage = 0;

function nextStep() {
  const popup = document.getElementById('wishPopup');
  const steps = document.querySelectorAll('.step');
  const nextBtn = document.getElementById('nextBtn');
  const images = document.querySelectorAll('.image-item');

  if (currentStep === 0) {
    popup.style.display = 'flex';
  }

  if (currentStep < steps.length) {
    steps.forEach(step => step.classList.remove('active'));
    steps[currentStep].classList.add('active');
    currentStep++;
  }

  if (currentStep === steps.length) {
    nextBtn.style.display = 'none'; // ซ่อนปุ่ม "ถัดไป" เมื่อถึงขั้นสุดท้าย
  }
}

function nextImage() {
  const images = document.querySelectorAll('.image-item');
  images.forEach(img => img.classList.remove('active'));
  currentImage++;
  if (currentImage >= images.length) {
    currentImage = 0;
  }
  images[currentImage].classList.add('active');
}

function prevImage() {
  const images = document.querySelectorAll('.image-item');
  images.forEach(img => img.classList.remove('active'));
  currentImage--;
  if (currentImage < 0) {
    currentImage = images.length - 1;
  }
  images[currentImage].classList.add('active');
}

// Close popup
function closeWish() {
  document.getElementById('wishPopup').style.display = 'none';
  currentStep = 0;
  currentImage = 0;
  const steps = document.querySelectorAll('.step');
  const images = document.querySelectorAll('.image-item');
  steps.forEach(step => step.classList.remove('active'));
  images.forEach(img => img.classList.remove('active'));
  document.getElementById('nextBtn').style.display = 'block';
}

// Confetti and Hearts
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const heartBackground = document.querySelector('.heart-background');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle() {
  const isHeart = Math.random() > 0.7;
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 5 + 5,
    speed: Math.random() * 3 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    isHeart: isHeart
  };
}

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '💕';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 5 + 3 + 's';
  heartBackground.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
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
  setInterval(createHeart, 500);

  // เพิ่ม Sweet Alert
  Swal.fire({
    title: '🎂 สุขสันต์วันเกิดที่รัก! 🎂',
    text: 'วันนี้เป็นวันพิเศษของเธอนะ รักเธอที่สุดเลย 💕',
    icon: 'success',
    confirmButtonText: 'เริ่มเลย!',
    confirmButtonColor: '#ff85a1'
  });
}

initParticles();