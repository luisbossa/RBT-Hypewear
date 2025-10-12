const video = document.getElementById("custom-video");
const playBtn = document.getElementById("video-btn");
const iconPlay = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");

const audio = document.createElement("audio");
audio.src = "/audio/wet-wipes.mp3";
audio.preload = "metadata";

let hideTimeout;
let customButtonUsed = false;
let isUserInteracting = false; // Nueva bandera para controlar interacción y evitar conflicto

function showAndAutoHideButton() {
  playBtn.classList.remove("fade-out");
  playBtn.classList.add("fade-in");
  playBtn.style.display = "block";

  clearTimeout(hideTimeout);

  if (!video.paused) {
    hideTimeout = setTimeout(() => {
      playBtn.classList.remove("fade-in");
      playBtn.classList.add("fade-out");
    }, 2000);
  }
}

playBtn.addEventListener("click", () => {
  customButtonUsed = true;
  isUserInteracting = true; // Empieza interacción

  if (video.paused) {
    video.play();
    audio.currentTime = video.currentTime;
    audio.play();

    iconPlay.style.display = "none";
    iconPause.style.display = "block";
  } else {
    video.pause();
    audio.pause();

    iconPlay.style.display = "block";
    iconPause.style.display = "none";
  }
  showAndAutoHideButton();

  // Reseteamos la interacción tras breve delay para evitar conflicto con eventos play/pause
  setTimeout(() => {
    isUserInteracting = false;
  }, 100);
});

video.addEventListener("play", () => {
  if (!isUserInteracting) {
    if (audio.paused) {
      audio.currentTime = video.currentTime;
      audio.play();
    }
    if (!customButtonUsed) {
      playBtn.style.display = "none";
    }
  }
});

video.addEventListener("pause", () => {
  if (!isUserInteracting) {
    if (!audio.paused) {
      audio.pause();
    }
  }
});

video.addEventListener("seeked", () => {
  audio.currentTime = video.currentTime;
});

video.addEventListener("ended", () => {
  video.currentTime = 0;
  audio.pause();
  audio.currentTime = 0;

  iconPlay.style.display = "block";
  iconPause.style.display = "none";

  if (customButtonUsed) {
    playBtn.style.display = "block";
    playBtn.classList.remove("fade-out");
    playBtn.classList.add("fade-in");
  }
});

// Click en el video para pausar/reproducir y mostrar botón central
video.addEventListener("click", () => {
  customButtonUsed = true;
  isUserInteracting = true;

  if (video.paused) {
    video.play();
    audio.currentTime = video.currentTime;
    audio.play();

    iconPlay.style.display = "none";
    iconPause.style.display = "block";

    showAndAutoHideButton();
  } else {
    video.pause();
    audio.pause();

    iconPlay.style.display = "block";
    iconPause.style.display = "none";

    playBtn.classList.remove("fade-out");
    playBtn.classList.add("fade-in");
    playBtn.style.display = "block";
  }

  setTimeout(() => {
    isUserInteracting = false;
  }, 100);
});
