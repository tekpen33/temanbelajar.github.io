// -------------------------------------
// 1. CEK STATUS PROGRES
// -------------------------------------
let materiDibaca = localStorage.getItem("lesson2_materi") === "true";
let videoSelesai = localStorage.getItem("lesson2_video") === "true";
let lessonDone   = localStorage.getItem("lesson2_done") === "true";

const quizButton = document.querySelector(".link-quiz");
const btnSelesai = document.getElementById("btnSelesai");

// Update akses button quiz
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

// Update tombol selesai
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


// -------------------------------------
// 2. DETEKSI SCROLL (Materi Dibaca)
// -------------------------------------
window.addEventListener("scroll", () => {
    const contentHeight = document.body.scrollHeight;
    const scrollPos     = window.innerHeight + window.scrollY;

    if (scrollPos >= contentHeight - 20) {
        materiDibaca = true;
        localStorage.setItem("lesson2_materi", "true");
        updateQuizButton();
    }
});


// -------------------------------------
// 3. DETEKSI VIDEO SELESAI (YouTube API)
// -------------------------------------
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("videoAI3", {
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


// -------------------------------------
// 4. TOMBOL SELESAI
// -------------------------------------
if (btnSelesai) {
    btnSelesai.addEventListener("click", function () {
        lessonDone = true;
        localStorage.setItem("lesson2_done", "true");
        updateFinishButton();
        alert("Pertemuan 2 telah ditandai selesai!");
    });
}


// -------------------------------------
// 5. PANEL DEV (CTRL + ALT + D)
// -------------------------------------
document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.altKey && e.key === "d") {
        const panel = document.getElementById("devPanel");
        if (panel) {
            panel.style.display = panel.style.display === "none" ? "block" : "none";
        }
    }
});


// -------------------------------------
// 6. RESET PROGRES (Panel Dev)
// -------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const btnReset = document.getElementById("btnResetDev");

    if (btnReset) {
        btnReset.addEventListener("click", function () {
            if (confirm("Yakin reset seluruh progres?")) {
                localStorage.removeItem("lesson2_materi");
                localStorage.removeItem("lesson2_video");
                localStorage.removeItem("lesson2_done");
                alert("Progress berhasil direset!");
                location.reload();
            }
        });
    }
});
