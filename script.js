let songStarted = false;

function showScreen(screenId) {
    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const selectedScreen = document.getElementById(screenId);

    if (selectedScreen) {
        selectedScreen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function startStory() {
    showScreen("photos");
    startSong();
}

function startSong() {
    const song = document.getElementById("loveSong");

    if (!song) return;

    song.volume = 0.45;

    song.play()
        .then(() => {
            songStarted = true;
            updateMusicButton();
        })
        .catch(() => {
            alert("Please click the button again to start the song ❤️");
        });
}

function playSong() {
    const song = document.getElementById("loveSong");

    if (!song) return;

    if (song.paused) {
        song.volume = 0.45;

        song.play()
            .then(() => {
                songStarted = true;
                updateMusicButton();
            })
            .catch(() => {
                alert("Please click the button again to start the song ❤️");
            });
    } else {
        song.pause();
        songStarted = false;
        updateMusicButton();
    }
}

function updateMusicButton() {
    const button = document.getElementById("musicButton");
    const song = document.getElementById("loveSong");

    if (!button || !song) return;

    if (song.paused) {
        button.innerHTML = "🎵 Play Our Song";
    } else {
        button.innerHTML = "⏸️ Pause Our Song";
    }
}

function showReason(number) {
    const box = document.getElementById("reasonBox");

    const reasons = {
        1: "Because you make even my ordinary days feel special. ❤️",
        2: "Because your smile can instantly make my day better. 🥺",
        3: "Because I can completely be myself when I'm with you. 💕",
        4: "Because you make me laugh even when I don't feel like smiling. 😂❤️",
        5: "Because life feels a little more beautiful with you in it. ♾️❤️"
    };

    if (box) {
        box.innerHTML = `<p>${reasons[number]}</p>`;

        box.style.animation = "none";

        setTimeout(() => {
            box.style.animation = "cardAppear 0.5s ease";
        }, 10);
    }
}

function blowCandle() {
    const flame = document.getElementById("flame");
    const button = document.getElementById("blowButton");
    const message = document.getElementById("birthdayMessage");

    if (flame) flame.style.display = "none";

    if (button) button.style.display = "none";

    if (message) message.style.display = "block";

    createConfetti();
}

function createConfetti() {
    const container = document.getElementById("confetti-container");

    if (!container) return;

    const emojis = ["🎉", "🎊", "❤️", "💕", "✨", "🥳", "💖"];

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement("div");

        piece.classList.add("confetti");

        piece.innerHTML =
            emojis[Math.floor(Math.random() * emojis.length)];

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        piece.style.fontSize =
            15 + Math.random() * 15 + "px";

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 4500);
    }
}

function restart() {
    const song = document.getElementById("loveSong");

    if (song) {
        song.pause();
        song.currentTime = 0;
    }

    songStarted = false;

    updateMusicButton();

    const flame = document.getElementById("flame");
    const blowButton = document.getElementById("blowButton");
    const birthdayMessage = document.getElementById("birthdayMessage");

    if (flame) flame.style.display = "block";

    if (blowButton) blowButton.style.display = "inline-block";

    if (birthdayMessage) birthdayMessage.style.display = "none";

    const reasonBox = document.getElementById("reasonBox");

    if (reasonBox) {
        reasonBox.innerHTML =
            `<p>Click a heart to discover a little reason... 🥺</p>`;
    }

    document.querySelectorAll(".confetti").forEach(piece => {
        piece.remove();
    });

    showScreen("welcome");
}