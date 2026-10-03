/* ==========================================
   BIRTHDAY SURPRISE WEBSITE
========================================== */


/* ================= MUSIC SETTINGS ================= */

/*
   Change these two values if you want.

   SONG_START = where the song starts, in seconds
   SONG_DURATION = how many seconds it should play
*/

const SONG_START = 0;
const SONG_DURATION = 45;


/* ================= GLOBAL VARIABLES ================= */

let songStarted = false;
let songTimer = null;


/* ================= SCREEN NAVIGATION ================= */

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


/* ================= START STORY ================= */

function startStory() {

    showScreen("photos");

    startSong();
}


/* ================= START SONG ================= */

function startSong() {

    const song = document.getElementById("loveSong");

    if (!song) {
        return;
    }

    clearTimeout(songTimer);

    song.currentTime = SONG_START;

    song.volume = 0.45;

    song.play()
        .then(() => {

            songStarted = true;

            updateMusicButton();

            /*
                Stop the selected part after
                SONG_DURATION seconds.
            */

            songTimer = setTimeout(() => {

                song.pause();

                song.currentTime = SONG_START;

                songStarted = false;

                updateMusicButton();

            }, SONG_DURATION * 1000);

        })
        .catch(() => {

            songStarted = false;

            updateMusicButton();

        });
}


/* ================= PLAY / PAUSE SONG ================= */

function playSong() {

    const song = document.getElementById("loveSong");

    if (!song) {
        return;
    }


    if (song.paused) {

        clearTimeout(songTimer);

        song.currentTime = SONG_START;

        song.volume = 0.45;

        song.play()
            .then(() => {

                songStarted = true;

                updateMusicButton();


                songTimer = setTimeout(() => {

                    song.pause();

                    song.currentTime = SONG_START;

                    songStarted = false;

                    updateMusicButton();

                }, SONG_DURATION * 1000);

            })
            .catch(() => {

                alert("Please click the button again to start the song ❤️");

            });

    } else {

        song.pause();

        clearTimeout(songTimer);

        songStarted = false;

        updateMusicButton();

    }

}


/* ================= MUSIC BUTTON ================= */

function updateMusicButton() {

    const button = document.getElementById("musicButton");

    const song = document.getElementById("loveSong");

    if (!button || !song) {
        return;
    }

    if (song.paused) {

        button.innerHTML = "🎵 Play Our Song";

    } else {

        button.innerHTML = "⏸️ Pause Our Song";

    }

}


/* ================= REASONS ================= */

function showReason(number) {

    const box = document.getElementById("reasonBox");

    const reasons = {

        1:
            "Because you make even my ordinary days feel special. ❤️",

        2:
            "Because your smile can instantly make my day better. 🥺",

        3:
            "Because I can completely be myself when I'm with you. 💕",

        4:
            "Because you make me laugh even when I don't feel like smiling. 😂❤️",

        5:
            "Because life feels a little more beautiful with you in it. ♾️❤️"

    };


    if (box) {

        box.innerHTML = `
            <p>${reasons[number]}</p>
        `;

        box.style.animation = "none";

        setTimeout(() => {
            box.style.animation = "cardAppear 0.5s ease";
        }, 10);

    }

}


/* ================= BLOW CANDLE ================= */

function blowCandle() {

    const flame = document.getElementById("flame");

    const button = document.getElementById("blowButton");

    const message = document.getElementById("birthdayMessage");


    if (flame) {
        flame.style.display = "none";
    }

    if (button) {
        button.style.display = "none";
    }

    if (message) {
        message.style.display = "block";
    }


    createConfetti();

}


/* ================= CONFETTI ================= */

function createConfetti() {

    const container =
        document.getElementById("confetti-container");

    if (!container) {
        return;
    }


    const emojis = [
        "🎉",
        "🎊",
        "❤️",
        "💕",
        "✨",
        "🥳",
        "💖"
    ];


    for (let i = 0; i < 50; i++) {

        const piece = document.createElement("div");

        piece.classList.add("confetti");

        piece.innerHTML =
            emojis[
                Math.floor(Math.random() * emojis.length)
            ];


        piece.style.left =
            Math.random() * 100 + "vw";


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


/* ================= RESTART ================= */

function restart() {

    const song =
        document.getElementById("loveSong");


    if (song) {

        song.pause();

        song.currentTime = SONG_START;

    }


    clearTimeout(songTimer);

    songStarted = false;

    updateMusicButton();


    /* Reset candle */

    const flame =
        document.getElementById("flame");

    const blowButton =
        document.getElementById("blowButton");

    const birthdayMessage =
        document.getElementById("birthdayMessage");


    if (flame) {

        flame.style.display = "block";

    }


    if (blowButton) {

        blowButton.style.display = "inline-block";

    }


    if (birthdayMessage) {

        birthdayMessage.style.display = "none";

    }


    /* Reset reason */

    const reasonBox =
        document.getElementById("reasonBox");


    if (reasonBox) {

        reasonBox.innerHTML = `
            <p>
                Click a heart to discover a little reason... 🥺
            </p>
        `;

    }


    /* Remove confetti */

    document
        .querySelectorAll(".confetti")
        .forEach(piece => piece.remove());


    /* Back to beginning */

    showScreen("welcome");

}