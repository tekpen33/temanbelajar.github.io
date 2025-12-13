// =====================================
// 1. AMBIL STATUS PROGRES
// =====================================
let materiDibaca = localStorage.getItem("lesson1_materi") === "true";
let videoSelesai = localStorage.getItem("lesson1_video") === "true";
let lessonDone = localStorage.getItem("lesson1_done") === "true";

const quizButton = document.querySelector(".link-quiz");
const btnSelesai = document.getElementById("btnSelesai");

// =====================================
// 2. ATUR TOMBOL QUIZ
// =====================================
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

// =====================================
// 3. ATUR TOMBOL SELESAI
// =====================================
function updateFinishButton() {
    if (!btnSelesai) return;

    if (lessonDone) {
        btnSelesai.disabled = true;
        btnSelesai.innerText = "Pertemuan Telah Ditandai";
    } else {
        btnSelesai.disabled = false;
        btnSelesai.innerText = "Selesai & Tandai Pertemuan";
    }
}

updateQuizButton();
updateFinishButton();

// =====================================
// 4. DETEKSI SCROLL (Materi Dibaca)
// =====================================
window.addEventListener("scroll", () => {
    const contentHeight = document.body.scrollHeight;
    const scrollPos = window.innerHeight + window.scrollY;

    if (scrollPos >= contentHeight - 20) {
        materiDibaca = true;
        localStorage.setItem("lesson1_materi", "true");
        updateQuizButton();
    }
});

// =====================================
// 5. DETEKSI VIDEO SELESAI (YouTube API)
// =====================================
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

// =====================================
// 6. TOMBOL SELESAI
// =====================================
if (btnSelesai) {
    btnSelesai.addEventListener("click", function () {
        lessonDone = true;
        localStorage.setItem("lesson1_done", "true");
        updateFinishButton();
        alert("Pertemuan 1 telah ditandai selesai!");
    });
}

// =====================================
// 7. DEVELOPER PANEL (CTRL+ALT+D)
// =====================================
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.key === 'd') {
        const panel = document.getElementById("devPanel");
        if (panel) {
            panel.style.display = panel.style.display === "none" ? "block" : "none";
        }
    }
});

// =====================================
// 8. TOMBOL RESET DEVELOPER
// =====================================
document.addEventListener("DOMContentLoaded", function() {
    const btnReset = document.getElementById("btnResetDev");

    if (btnReset) {
        btnReset.addEventListener("click", function() {
            if (confirm("Yakin reset semua progres siswa?")) {
                localStorage.clear();
                alert("Progress berhasil direset!");
                location.reload();
            }
        });
    }
});
