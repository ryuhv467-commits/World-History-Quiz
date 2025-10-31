// ===============================
// Kuis Tempat Bersejarah Dunia 🌍
// ===============================

// Cek koneksi file JS
console.log("✅ script.js aktif!");

// Ambil elemen HTML
const loginSection = document.getElementById("login-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

const usernameInput = document.getElementById("username");
const levelSelect = document.getElementById("level");
const startBtn = document.getElementById("startBtn");

const questionImage = document.getElementById("question-image");
const optionsContainer = document.getElementById("options");
const timerDisplay = document.getElementById("timer");
const lifeDisplay = document.getElementById("lives");
const scoreDisplay = document.getElementById("score");

const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restartBtn");

// Data kuis
const questions = [
  // Level MUDAH
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Eiffel_Tower_Paris.jpg",
    answer: "Menara Eiffel",
    options: ["Menara Pisa", "Menara Eiffel", "Big Ben", "Arc de Triomphe"],
    level: "mudah"
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Great_Wall_of_China_July_2006.JPG",
    answer: "Tembok Besar China",
    options: ["Tembok Besar China", "Angkor Wat", "Borobudur", "Petra"],
    level: "mudah"
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Statue_of_Liberty_7.jpg",
    answer: "Patung Liberty",
    options: ["Patung Liberty", "Big Ben", "Colosseum", "Taj Mahal"],
    level: "mudah"
  },

  // Level SEDANG
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Taj_Mahal_in_March_2004.jpg",
    answer: "Taj Mahal",
    options: ["Taj Mahal", "Machu Picchu", "Colosseum", "Candi Prambanan"],
    level: "sedang"
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
    answer: "Colosseum",
    options: ["Colosseum", "Petra", "Stonehenge", "Menara Pisa"],
    level: "sedang"
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/5/57/Angkor_Wat_temple.jpg",
    answer: "Angkor Wat",
    options: ["Borobudur", "Angkor Wat", "Petra", "Taj Mahal"],
    level: "sedang"
  },

  // Level SULIT
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg",
    answer: "Machu Picchu",
    options: ["Machu Picchu", "Borobudur", "Angkor Wat", "Petra"],
    level: "sulit"
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Borobudur-Nothwest-view.jpg",
    answer: "Candi Borobudur",
    options: ["Candi Prambanan", "Candi Borobudur", "Taj Mahal", "Angkor Wat"],
    level: "sulit"
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Petra_Jordan_BW_21.JPG",
    answer: "Petra",
    options: ["Petra", "Colosseum", "Angkor Wat", "Tembok Besar China"],
    level: "sulit"
  }
];

let currentQuestion = 0;
let score = 0;
let lives = 3;
let timeLeft = 120;
let timer;
let playerName = "";
let playerLevel = "";
let selectedQuestions = [];

// -----------------------------
// Mulai Kuis
// -----------------------------
startBtn.addEventListener("click", () => {
  playerName = usernameInput.value.trim();
  playerLevel = levelSelect.value;

  if (playerName === "") {
    alert("Masukkan nama terlebih dahulu!");
    return;
  }

  // Sembunyikan login, tampilkan kuis
  loginSection.style.display = "none";
  quizSection.style.display = "block";

  startQuiz();
});

// -----------------------------
// Fungsi Menjalankan Kuis
// -----------------------------
function startQuiz() {
  // Filter dan acak pertanyaan sesuai level
  const filteredQuestions = questions.filter(q => q.level === playerLevel);
  selectedQuestions = shuffleArray(filteredQuestions).slice(0, 3);

  currentQuestion = 0;
  score = 0;
  lives = 3;

  showQuestion();
  startTimer();
}

// -----------------------------
// Tampilkan Pertanyaan
// -----------------------------
function showQuestion() {
  if (currentQuestion >= selectedQuestions.length || lives <= 0) {
    showResult();
    return;
  }

  const q = selectedQuestions[currentQuestion];
  questionImage.src = q.img;
  optionsContainer.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => checkAnswer(opt, q.answer));
    optionsContainer.appendChild(btn);
  });

  updateStatus();
}

// -----------------------------
// Cek Jawaban
// -----------------------------
function checkAnswer(selected, correct) {
  if (selected === correct) {
    score += 10;
  } else {
    lives -= 1;
  }
  currentQuestion++;
  showQuestion();
}

// -----------------------------
// Update Status
// -----------------------------
function updateStatus() {
  scoreDisplay.textContent = Skor: ${score};
  lifeDisplay.textContent = ❤️ ${lives};
}

// -----------------------------
// Timer
// -----------------------------
function startTimer() {
  timeLeft = 120;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = ${minutes}:${seconds < 10 ? "0" + seconds : seconds};

    if (timeLeft <= 0 || lives <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

// -----------------------------
// Hasil Akhir
// -----------------------------
function showResult() {
  quizSection.style.display = "none";
  resultSection.style.display = "block";
  resultText.textContent = `Nama: ${playerName
