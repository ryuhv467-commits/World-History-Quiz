// ==========================
// BAGIAN 1: LOGIN / MULAI
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const btnMulai = document.querySelector("#btnMulai");
  if (btnMulai) {
    btnMulai.addEventListener("click", function () {
      const nama = document.getElementById("username").value.trim();
      const level = document.getElementById("level").value;

      if (!nama || !level) {
        alert("Isi nama dan pilih level terlebih dahulu!");
        return;
      }

      // Simpan data ke localStorage
      localStorage.setItem("username", nama);
      localStorage.setItem("level", level);

      // ✅ Langsung pindah ke halaman kuis
      window.location.href = "kuis.html";
    });
  }
});


// ==========================
// BAGIAN 2: DATA KUIS
// ==========================
const dataKuis = {
  mudah: [
    { gambar: "images/piramida.jpg", jawaban: "Piramida Giza" },
    { gambar: "images/colosseum.jpg", jawaban: "Colosseum" },
    { gambar: "images/tembokcina.jpg", jawaban: "Tembok Besar China" },
    { gambar: "images/menaraeiffel.jpg", jawaban: "Menara Eiffel" },
    { gambar: "images/liberty.jpg", jawaban: "Patung Liberty" },
    { gambar: "images/borobudur.jpg", jawaban: "Candi Borobudur" },
    { gambar: "images/prambanan.jpg", jawaban: "Candi Prambanan" },
    { gambar: "images/opera.jpg", jawaban: "Sydney Opera House" },
    { gambar: "images/bigmben.jpg", jawaban: "Big Ben" },
    { gambar: "images/louvre.jpg", jawaban: "Museum Louvre" }
  ],
  sedang: [
    { gambar: "images/tajmahal.jpg", jawaban: "Taj Mahal" },
    { gambar: "images/angkorwat.jpg", jawaban: "Angkor Wat" },
    { gambar: "images/machu.jpg", jawaban: "Machu Picchu" },
    { gambar: "images/sagradafamilia.jpg", jawaban: "Sagrada Familia" },
    { gambar: "images/versailles.jpg", jawaban: "Istana Versailles" },
    { gambar: "images/pisa.jpg", jawaban: "Menara Pisa" },
    { gambar: "images/alhambra.jpg", jawaban: "Alhambra" },
    { gambar: "images/acropolis.jpg", jawaban: "Acropolis Athena" },
    { gambar: "images/sphinx.jpg", jawaban: "Sphinx" },
    { gambar: "images/neuschwanstein.jpg", jawaban: "Neuschwanstein" }
  ],
  sulit: [
    { gambar: "images/petra.jpg", jawaban: "Petra" },
    { gambar: "images/chichen.jpg", jawaban: "Chichen Itza" },
    { gambar: "images/stonehenge.jpg", jawaban: "Stonehenge" },
    { gambar: "images/moai.jpg", jawaban: "Pulau Paskah" },
    { gambar: "images/palmyra.jpg", jawaban: "Palmyra" },
    { gambar: "images/teotihuacan.jpg", jawaban: "Teotihuacan" },
    { gambar: "images/forbidden.jpg", jawaban: "Kota Terlarang" },
    { gambar: "images/alexandria.jpg", jawaban: "Mercusuar Alexandria" },
    { gambar: "images/angkorthom.jpg", jawaban: "Angkor Thom" },
    { gambar: "images/templetod.jpg", jawaban: "Kuil Todai-ji" }
  ]
};


// ==========================
// BAGIAN 3: LOGIKA KUIS
// ==========================
let indexSoal = 0;
let poin = 0;
let nyawa = 3;
let waktu = 120;
let timer;

function mulaiGame() {
  const nama = localStorage.getItem("username");
  const level = localStorage.getItem("level");

  if (!nama || !level) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("namaPlayer").innerText = nama;
  document.getElementById("levelGame").innerText = level.toUpperCase();

  tampilkanSoal();
  mulaiTimer();
}

function tampilkanSoal() {
  const level = localStorage.getItem("level");
  const soalSekarang = dataKuis[level][indexSoal];

  if (!soalSekarang) {
    selesai();
    return;
  }

  document.getElementById("gambarSoal").src = soalSekarang.gambar;
  document.getElementById("jawaban").value = "";
  document.getElementById("status").innerText =
    Soal ${indexSoal + 1} dari ${dataKuis[level].length};
}

function cekJawaban() {
  const level = localStorage.getItem("level");
  const jawabanUser = document.getElementById("jawaban").value.trim().toLowerCase();
  const jawabanBenar = dataKuis[level][indexSoal].jawaban.toLowerCase();

  if (jawabanUser === jawabanBenar) {
    poin += 10;
    document.getElementById("hasil").innerText = "✅ Benar!";
  } else {
    nyawa--;
    document.getElementById("hasil").innerText =
      ❌ Salah! Jawaban benar: ${dataKuis[level][indexSoal].jawaban};
  }

  document.getElementById("poin").innerText = poin;
  document.getElementById("nyawa").innerText = nyawa;

  if (nyawa <= 0) {
    selesai();
    return;
  }

  indexSoal++;
  setTimeout(() => {
    document.getElementById("hasil").innerText = "";
    tampilkanSoal();
  }, 1500);
}

function mulaiTimer() {
  const tampilWaktu = document.getElementById("waktu");
  timer = setInterval(() => {
    waktu--;
    tampilWaktu.innerText = waktu + " detik";
    if (waktu <= 0) {
      clearInterval(timer);
      selesai();
    }
  }, 1000);
}

function selesai() {
  clearInterval(timer);
  document.getElementById("kuisContainer").innerHTML = `
    <h2>Kuis Selesai!</h2>
    <p>Skor akhir kamu: <b>${poin}</b></p>
    <p>Terima kasih sudah bermain!</p>
    <button onclick="ulang()">Main Lagi</button>
  `;
}

function ulang() {
  localStorage.clear();
  window.location.href = "index.html";
}
