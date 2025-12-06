// -------------------------
// CEK STATUS PROGRESS
// -------------------------
let materiDibaca = localStorage.getItem("lesson1_materi") === "true";
let videoSelesai = localStorage.getItem("lesson1_video") === "true";

const quizButton = document.querySelector(".link-quiz");

// Update tombol quiz
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
// DETEKSI SCROLL
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
                    localStorage.setItem("lesson2_video", "true");
                    updateQuizButton();
                }
            }
        }
    });
}


// -------------------------
// TOMBOL SELESAI
// -------------------------
const btnSelesai = document.getElementById("btnSelesai");

btnSelesai.addEventListener("click", function () {
    localStorage.setItem("lesson1_done", "true");
    btnSelesai.disabled = true;
    btnSelesai.innerText = "Pertemuan Telah Ditandai";
    alert("Pertemuan 1 telah ditandai selesai!");
});


// -------------------------
// PANEL DEV (Rahasia)
// -------------------------
document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.altKey && e.key === 'd') {
        const panel = document.getElementById("devPanel");
        panel.style.display = panel.style.display === "none" ? "block" : "none";
    }
});


// -------------------------
// RESET PROGRESS DEV
// -------------------------
const btnReset = document.getElementById("btnResetDev");

btnReset.addEventListener("click", function () {
    if (confirm("Yakin reset semua progres siswa?")) {

        localStorage.removeItem("lesson1_done");
        localStorage.removeItem("lesson1_materi");
        localStorage.removeItem("lesson1_video");

        alert("Progress berhasil direset!");
        location.reload();
    }
});


// -------------------------
// LOAD STATUS TOMBOL SELESAI
// -------------------------
document.addEventListener("DOMContentLoaded", function () {
    const lessonDone = localStorage.getItem("lesson1_done");
    const btn = document.getElementById("btnSelesai");

    if (lessonDone === "true") {
        btn.disabled = true;
        btn.innerText = "Pertemuan Telah Ditandai";
    } else {
        btn.disabled = false;
        btn.innerText = "Selesai & Tandai Pertemuan";
    }
});
// =======================
// Developer Panel Shortcut
// =======================
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.key === 'd') {
        const panel = document.getElementById("devPanel");
        panel.style.display = (panel.style.display === "none" || panel.style.display === "") 
            ? "block" 
            : "none";
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const btnReset = document.getElementById("btnResetDev");

    if (btnReset) {
        btnReset.addEventListener("click", function () {
            if (confirm("Yakin reset semua progress siswa?")) {
                localStorage.clear();    // Hapus semua progres
                alert("Progress telah direset!");
                location.reload();       // Reload agar tombol kembali normal
            }
        });
    }
});
