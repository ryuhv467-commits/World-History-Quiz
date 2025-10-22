const name = localStorage.getItem("username");
document.querySelector("h2").innerText = "Selamat bermain, " + name + "!";
const questions = [
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
    answer: "Menara Eiffel",
    options: ["Menara Eiffel", "Menara Pisa", "Big Ben", "Tokyo Tower"]
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Taj_Mahal%2C_Agra%2C_India_edit3.jpg",
    answer: "Taj Mahal",
    options: ["Candi Borobudur", "Taj Mahal", "Angkor Wat", "Petra"]
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Borobudur-Nothwest-view.jpg",
    answer: "Candi Borobudur",
    options: ["Candi Borobudur", "Prambanan", "Angkor Wat", "Taj Mahal"]
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Colosseo_2020.jpg",
    answer: "Colosseum",
    options: ["Pantheon", "Colosseum", "Acropolis", "Petra"]
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
    answer: "Piramida Giza",
    options: ["Stonehenge", "Piramida Giza", "Machu Picchu", "Taj Mahal"]
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg",
    answer: "Machu Picchu",
    options: ["Chichen Itza", "Machu Picchu", "Petra", "Tembok Besar China"]
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/1/10/Great_Wall_of_China_July_2006.JPG",
    answer: "Tembok Besar China",
    options: ["Tembok Besar China", "Angkor Wat", "Borobudur", "Piramida Giza"]
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Stonehenge2007_07_30.jpg",
    answer: "Stonehenge",
    options: ["Petra", "Colosseum", "Stonehenge", "Taj Mahal"]
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg",
    answer: "Patung Liberty",
    options: ["Patung Liberty", "Christ the Redeemer", "Big Ben", "Sydney Opera House"]
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Angkor_Wat_temple.jpg",
    answer: "Angkor Wat",
    options: ["Angkor Wat", "Borobudur", "Acropolis", "Petra"]
  }
];

let current = 0;
let score = 0;
let lives = 3;
let time = 120;

function loadQuestion() {
  if (current >= questions.length) return endGame("🎉 Kuis selesai!");
  document.getElementById("image").src = questions[current].image;
  const opts = document.getElementById("options");
  opts.innerHTML = "";
  questions[current].options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt);
    opts.appendChild(btn);
  });
}

function checkAnswer(choice) {
  if (choice === questions[current].answer) {
    score += 10;
    document.getElementById("score").innerText = score;
    current++;
    loadQuestion();
  } else {
    lives--;
    document.getElementById("lives").innerText = lives;
    if (lives === 0) endGame("😢 Kamu kehabisan nyawa!");
  }
}

function endGame(msg) {
  alert(${msg}\nSkor Akhir: ${score});
  location.reload();
}

function timer() {
  const t = document.getElementById("time");
  const interval = setInterval(() => {
    time--;
    t.innerText = time;
    if (time <= 0) {
      clearInterval(interval);
      endGame("⏰ Waktu habis!");
    }
  }, 1000);
}

loadQuestion();
timer();
