//https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

// Grab DOM elements
const video = document.querySelector(".video");
const playButton = document.querySelector(".play");
const playButtonIcon = playButton.querySelector("i");
const volumeIcon = document.querySelector("#volume-icon");
const volumeSlider = document.querySelector(".volume")
const progressBar = document.querySelector(".progress")
const timestamp = document.querySelector(".timestamp")
const fullButton = document.querySelector(".full");

// Listen for events
video.addEventListener("click", playPauseVideo);
progressBar.addEventListener("change", setVideoProgress)
playButton.addEventListener("click", playPauseVideo);
volumeSlider.addEventListener("change", changeVolume);
video.addEventListener("timeupdate", updateVideoProgress)
fullButton.addEventListener("click", fullScreen)

// init texttrack
for (var i = 0; i < video.textTracks.length; i++) {
    if (video.textTracks[i].label == "kda") {
        kda = video.textTracks[i]
        console.log(video.textTracks[i].cues)
    }
}
for (var i = 0; i < kda.cues.length; i++) {
    console.log(kda.cues[i].startTime)
}


// Utility functions
function playPauseVideo() {
    //   if (video.paused) {
    //     video.play();
    //   } else {
    //     video.pause();
    //   }
    video[video.paused ? "play" : "pause"]()
    playButtonToggleIcon()
}

function playButtonToggleIcon() {
    if (video.paused) {
        playButtonIcon.classList.remove("fa-pause")
        playButtonIcon.classList.add("fa-play")
    } else {
        playButtonIcon.classList.remove("fa-play")
        playButtonIcon.classList.add("fa-pause")
    }
}

function stopVideo() {
    video.pause()
    video.currentTime = 0
    playButtonToggleIcon()
    progressBar.value = 0
}

function setVideoProgress() {
    video.currentTime = Number((progressBar.value * video.duration) / 100)
}

function updateVideoProgress() {
    progressBar.value = Number((video.currentTime / video.duration) * 100)
    let minutes = Math.floor(video.currentTime / 60)
    let seconds = Math.floor(video.currentTime % 60)
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    timestamp.textContent = `${minutes}:${seconds}`
}

function changeVolume() {
    console.log(volumeIcon)
    if (volumeSlider.value == 0) {
        volumeIcon.classList.remove("fa-volume-up")
        volumeIcon.classList.remove("fa-volume-down")
        volumeIcon.classList.add("fa-volume-mute")
    } else if (volumeSlider.value < 50) {
        volumeIcon.classList.remove("fa-volume-up")
        volumeIcon.classList.remove("fa-volume-mute")
        volumeIcon.classList.add("fa-volume-down")
    } else {
        volumeIcon.classList.remove("fa-volume-mute")
        volumeIcon.classList.remove("fa-volume-down")
        volumeIcon.classList.add("fa-volume-up")
    }
    video.volume = volumeSlider.value / 100;
}

function fullScreen() {
    if (video.requestFullscreen) { // Principal
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { // Segun Navegador
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

