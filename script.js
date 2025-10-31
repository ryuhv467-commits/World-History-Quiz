const loginArea = document.getElementById('loginArea');
const quizArea = document.getElementById('quizArea');
const usernameInput = document.getElementById('username');
const levelSelect = document.getElementById('level');
const startBtn = document.getElementById('startBtn');
const submitBtn = document.getElementById('submitBtn');
const quizImage = document.getElementById('quizImage');
const welcomeText = document.getElementById('welcomeText');
const livesEl = document.getElementById('lives');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const answerInput = document.getElementById('answer');
const container = document.querySelector('.container');

let username = "";
let score = 0;
let lives = 3;
let timeLeft = 120;
let timer;
let currentIndex = 0;
let selectedLevel = "mudah";

// Data kuis
const dataKuis = {
  mudah: [
    { img: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Borobudur_Temple.jpg", answer: "candi borobudur" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Eiffel_Tower_in_Paris.jpg", answer: "menara eiffel" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Taj_Mahal_in_India.jpg", answer: "taj mahal" }
  ],
  sedang: [
    { img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Machu_Picchu%2C_Peru.jpg", answer: "machu picchu" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/1/10/Angkor_Wat.jpg", answer: "angkor wat" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Sagrada_Familia_2021.jpg", answer: "sagrada familia" }
  ],
  sulit: [
    { img: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Petra_Jordan_BW_21.JPG", answer: "petra" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Stonehenge2007_07_30.jpg", answer: "stonehenge" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Moai_Rano_raraku.jpg", answer: "pulau paskah" }
  ]
};

// Tombol mulai
startBtn.addEventListener('click', () => {
  username = usernameInput.value.trim();
  selectedLevel = levelSelect.value;

  if (!username) {
    alert("Masukkan nama terlebih dahulu!");
    return;
  }

  loginArea.style.display = "none";
  quizArea.style.display = "block";

  welcomeText.textContent = Selamat datang, ${username}! Level: ${selectedLevel};
  tampilkanSoal();
  mulaiTimer();
});

// Fungsi tampilkan soal
function tampilkanSoal() {
  const soal = dataKuis[selectedLevel][currentIndex];

  if (!soal) {
    return tampilkanHasil();
  }

  quizImage.src = soal.img;
  answerInput.value = "";
}

// Fungsi timer
function mulaiTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      tampilkanHasil();
    }
  }, 1000);
}

// Saat menjawab
submitBtn.addEventListener('click', () => {
  const jawaban = answerInput.value.trim().toLowerCase();
  const benar = dataKuis[selectedLevel][currentIndex].answer;

  if (jawaban === benar) {
    score += 10;
    scoreEl.textContent = score;
  } else {
    lives--;
    livesEl.textContent = lives;
  }

  currentIndex++;

  if (lives <= 0 || currentIndex >= dataKuis[selectedLevel].length) {
    clearInterval(timer);
    tampilkanHasil();
  } else {
    tampilkanSoal();
  }
});

// Fungsi hasil (dibuat langsung oleh JS)
function tampilkanHasil() {
  quizArea.remove();

  const resultDiv = document.createElement('div');
  resultDiv.id = "result";
  resultDiv.innerHTML = `
    <h2>🎉 Kuis Selesai!</h2>
    <p>Skor akhir kamu: <b>${score}</b></p>
    <p>Terima kasih sudah bermain, ${username}!</p>
    <button id="restartBtn">Main Lagi</button>
  `;
  container.appendChild(resultDiv);

  document.getElementById('restartBtn').addEventListener('click', () => {
    location.reload();
  });
}
