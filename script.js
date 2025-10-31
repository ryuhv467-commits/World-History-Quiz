document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  // Bangun isi HTML-nya setelah DOM siap
  app.innerHTML = `
    <section id="login" class="active">
      <h1>Kuis Tempat Bersejarah Dunia 🌍</h1>
      <p>Masukkan Nama dan Pilih Level</p>
      <input type="text" id="username" placeholder="Masukkan nama kamu" />
      <select id="level">
        <option value="">Pilih Level</option>
        <option value="mudah">Mudah</option>
        <option value="sedang">Sedang</option>
        <option value="sulit">Sulit</option>
      </select>
      <button id="btnMulai">Mulai</button>
    </section>

    <section id="kuis">
      <h2>Selamat Datang, <span id="namaPlayer"></span>!</h2>
      <p>Level: <span id="levelGame"></span></p>
      <p>Nyawa ❤️: <span id="nyawa">3</span> | Poin 💎: <span id="poin">0</span> | Waktu ⏰: <span id="waktu">120</span> detik</p>
      <img id="gambarSoal" src="" alt="Soal Gambar" width="250" />
      <p id="status">Soal 1</p>
      <input type="text" id="jawaban" placeholder="Tulis jawabanmu di sini" />
      <button id="btnJawab">Jawab</button>
      <p id="hasil"></p>
    </section>

    <section id="selesai">
      <h2>Kuis Selesai!</h2>
      <div id="skorAkhir"></div>
      <button id="btnUlang">Main Lagi</button>
    </section>
  `;

  // ==========================
  // DATA TEMPAT BERSEJARAH
  // ==========================
  const dataKuis = {
    mudah: [
      { gambar: "images/borobudur.jpg", jawaban: "Candi Borobudur" },
      { gambar: "images/eiffel.jpg", jawaban: "Menara Eiffel" },
      { gambar: "images/liberty.jpg", jawaban: "Patung Liberty" },
      { gambar: "images/colosseum.jpg", jawaban: "Colosseum" },
      { gambar: "images/tembokcina.jpg", jawaban: "Tembok Besar China" }
    ],
    sedang: [
      { gambar: "images/tajmahal.jpg", jawaban: "Taj Mahal" },
      { gambar: "images/machu.jpg", jawaban: "Machu Picchu" },
      { gambar: "images/angkorwat.jpg", jawaban: "Angkor Wat" },
      { gambar: "images/sagrada.jpg", jawaban: "Sagrada Familia" },
      { gambar: "images/versailles.jpg", jawaban: "Istana Versailles" }
    ],
    sulit: [
      { gambar: "images/petra.jpg", jawaban: "Petra" },
      { gambar: "images/stonehenge.jpg", jawaban: "Stonehenge" },
      { gambar: "images/chichen.jpg", jawaban: "Chichen Itza" },
      { gambar: "images/moai.jpg", jawaban: "Pulau Paskah" },
      { gambar: "images/alhambra.jpg", jawaban: "Alhambra" }
    ]
  };

  let indexSoal = 0;
  let poin = 0;
  let nyawa = 3;
  let waktu = 120;
  let timer;

  const login = document.getElementById("login");
  const kuis = document.getElementById("kuis");
  const selesai = document.getElementById("selesai");

  // ==========================
  // EVENT MULAI
  // ==========================
  document.getElementById("btnMulai").addEventListener("click", () => {
    const nama = document.getElementById("username").value.trim();
    const level = document.getElementById("level").value;

    if (!nama || !level) {
      alert("Isi nama dan pilih level terlebih dahulu!");
      return;
    }

    localStorage.setItem("username", nama);
    localStorage.setItem("level", level);

    login.classList.remove("active");
    kuis.classList.add("active");

    mulaiGame();
  });

  function mulaiGame() {
    const nama = localStorage.getItem("username");
    const level = localStorage.getItem("level");

    document.getElementById("namaPlayer").innerText = nama;
    document.getElementById("levelGame").innerText = level.toUpperCase();

    tampilkanSoal();
    mulaiTimer();
  }

  function tampilkanSoal() {
    const level = localStorage.getItem("level");
    const soal = dataKuis[level][indexSoal];

    if (!soal) {
      selesaiGame();
      return;
    }

    document.getElementById("gambarSoal").src = soal.gambar;
    document.getElementById("jawaban").value = "";
    document.getElementById("status").innerText =
      Soal ${indexSoal + 1} dari ${dataKuis[level].length};
  }

  document.getElementById("btnJawab").addEventListener("click", () => {
    const level = localStorage.getItem("level");
    const jawabanUser = document.getElementById("jawaban").value.trim().toLowerCase();
    const jawabanBenar = dataKuis[level][indexSoal].jawaban.toLowerCase();

    if (jawabanUser === jawabanBenar) {
      poin += 10;
      document.getElementById("hasil").innerText = "✅ Benar!";
    } else {
      nyawa--;
      document.getElementById("hasil").innerText = ❌ Salah! Jawaban benar: ${dataKuis[level][indexSoal].jawaban};
    }

    document.getElementById("poin").innerText = poin;
    document.getElementById("nyawa").innerText = nyawa;

    if (nyawa <= 0) {
      selesaiGame();
      return;
    }

    indexSoal++;
    setTimeout(() => {
      document.getElementById("hasil").innerText = "";
      tampilkanSoal();
    }, 1500);
  });

  function mulaiTimer() {
    const tampilWaktu = document.getElementById("waktu");
    timer = setInterval(() => {
      waktu--;
      tampilWaktu.innerText = waktu;

      if (waktu <= 0) {
        clearInterval(timer);
        selesaiGame();
      }
    }, 1000);
  }

  function selesaiGame() {
    clearInterval(timer);
    kuis.classList.remove("active");
    selesai.classList.add("active");
    document.getElementById("skorAkhir").innerHTML = `
      <p>Skor akhir kamu: <b>${poin}</b></p>
      <p>Terima kasih sudah bermain!</p>
    `;
  }

  document.getElementById("btnUlang").addEventListener("click", () => {
    localStorage.clear();
    indexSoal = 0;
    poin = 0;
    nyawa = 3;
    waktu = 120;
    selesai.classList.remove("active");
    login.classList.add("active");
  });
});
