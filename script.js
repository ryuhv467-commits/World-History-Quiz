// Ambil elemen penting
const loginSection = document.getElementById("login-section");
const quizSection = document.getElementById("quiz-section");
const hasilSection = document.getElementById("hasil-section");

const mulaiBtn = document.getElementById("mulaiBtn");
const jawabBtn = document.getElementById("jawabBtn");
const mainLagiBtn = document.getElementById("mainLagiBtn");

const namaInput = document.getElementById("nama");
const levelSelect = document.getElementById("level");
const welcomeText = document.getElementById("welcomeText");
const gambarSoal = document.getElementById("gambarSoal");
const jawabanInput = document.getElementById("jawabanInput");
const nyawaEl = document.getElementById("nyawa");
const poinEl = document.getElementById("poin");
const skorAkhir = document.getElementById("skorAkhir");

// Data soal
const dataSoal = {
  mudah: [
    { gambar: "images/borobudur.jpg", jawaban: "borobudur" },
    { gambar: "images/eiffel.jpg", jawaban: "eiffel" },
    { gambar: "images/tajmahal.jpg", jawaban: "tajmahal" },
  ],
  sedang: [
    { gambar: "images/liberty.jpg", jawaban: "liberty" },
    { gambar: "images/angkorwat.jpg", jawaban: "angkor wat" },
    { gambar: "images/tembokcina.jpg", jawaban: "tembok cina" },
  ],
  sulit: [
    { gambar: "images/piramida.jpg", jawaban: "piramida" },
    { gambar: "images/colosseum.jpg", jawaban: "colosseum" },
    { gambar: "images/machu.jpg", jawaban: "machu picchu" },
  ]
};

let soalAktif = [];
let indexSoal = 0;
let poin = 0;
let nyawa = 3;

// Fungsi mulai kuis
mulaiBtn.addEventListener("click", () => {
  const nama = namaInput.value.trim();
  const level = levelSelect.value;

  if (!nama) {
    alert("Masukkan nama dulu!");
    return;
  }

  soalAktif = dataSoal[level];
  indexSoal = 0;
  poin = 0;
  nyawa = 3;

  loginSection.style.display = "none";
  quizSection.style.display = "block";
  hasilSection.style.display = "none";

  welcomeText.textContent = Selamat datang, ${nama}! Level: ${level};
  tampilSoal();
});

function tampilSoal() {
  if (indexSoal < soalAktif.length) {
    const soal = soalAktif[indexSoal];
    gambarSoal.src = soal.gambar;
    jawabanInput.value = "";
  } else {
    selesaiKuis();
  }
}

// Fungsi jawab
jawabBtn.addEventListener("click", () => {
  const jawaban = jawabanInput.value.trim().toLowerCase();
  const kunci = soalAktif[indexSoal].jawaban.toLowerCase();

  if (jawaban === kunci) {
    poin += 10;
    poinEl.textContent = poin;
    alert("Benar! 🎉");
  } else {
    nyawa--;
    nyawaEl.textContent = nyawa;
    alert("Salah 😢");
    if (nyawa <= 0) return selesaiKuis();
  }

  indexSoal++;
  tampilSoal();
});

function selesaiKuis() {
  quizSection.style.display = "none";
  hasilSection.style.display = "block";
  skorAkhir.textContent = poin;
}

mainLagiBtn.addEventListener("click", () => {
  hasilSection.style.display = "none";
  loginSection.style.display = "block";
});
