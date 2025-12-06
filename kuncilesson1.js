// -------------------------
// 1. CEK STATUS PROGRESS
// -------------------------
let materiDibaca = localStorage.getItem("lesson1_materi") === "true";
let videoSelesai = localStorage.getItem("lesson1_video") === "true";

// Button quiz
const quizButton = document.querySelector(".link-quiz");

// Atur tombol quiz berdasarkan progress
function updateQuizButton() {
  if (materiDibaca && videoSelesai) {
    quizButton.style.pointerEvents = "auto";
    quizButton.style.opacity = "1";
    quizButton.innerText = "Mulai Quiz →";
  } else {
    quizButton.style.pointerEvents = "none";
    quizButton.style.opacity = "0.5";
    quizButton.innerText = "Selesaikan Materi & Video untuk Mulai Quiz";
  }
}

updateQuizButton();

// -------------------------
// 2. DETEKSI SCROLL SAMPAI BAWAH
// -------------------------
window.addEventListener("scroll", () => {
  const contentHeight = document.body.scrollHeight;
  const scrollPos = window.innerHeight + window.scrollY;

  if (scrollPos >= contentHeight - 20) {
    materiDibaca = true;
    localStorage.setItem("lesson1_materi", "true");
    updateQuizButton();
  }
});

// -------------------------
// 3. DETEKSI VIDEO SELESAI
// -------------------------
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("videoAI", {
    events: {
      onStateChange: function (event) {
        if (event.data === YT.PlayerState.ENDED) {
          videoSelesai = true;
          localStorage.setItem("lesson1_video", "true");
          updateQuizButton();
        }
      }
    }
  });
}
// Ketika tombol selesai ditekan → simpan progress
const btnSelesai = document.getElementById("btnSelesai");

btnSelesai.addEventListener("click", function () {
    localStorage.setItem("lesson1_done", "true");
    alert("Pertemuan 1 telah ditandai selesai!");
});
// ===============================
// PANEL DEV - Shortcut Rahasia
// ===============================

// Tekan CTRL + ALT + D untuk membuka panel developer
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.key === 'd') {
        const panel = document.getElementById("devPanel");
        panel.style.display = panel.style.display === "none" ? "block" : "none";
    }
});

// Action tombol reset progres
document.addEventListener("DOMContentLoaded", function() {
    const btnReset = document.getElementById("btnResetDev");

    if (btnReset) {
        btnReset.addEventListener("click", function() {
            if (confirm("Yakin reset semua progres siswa?")) {
                // hapus semua progres
                localStorage.removeItem("lesson1_done");
                localStorage.removeItem("lesson2_done");
                localStorage.removeItem("lesson3_done");

                alert("Progress berhasil direset!");
                location.reload();
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const lessonDone = localStorage.getItem("lesson1_done");

    const finishBtn = document.getElementById("btnFinish");
    
    if (lessonDone) {
        finishBtn.disabled = true;
        finishBtn.innerText = "Pertemuan Telah Ditandai";
    } else {
        finishBtn.disabled = false;
        finishBtn.innerText = "Selesai & Tandai Pertemuan";
    }
});

