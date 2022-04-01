//https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

// Grab DOM elements
const video = document.querySelector(".video");
const playButton = document.querySelector("#play");
const playIcon = document.querySelector("#play-icon");
const forwardButton = document.querySelector("#forward");
const muteButton = document.querySelector("#mute");
const volumeIcon = document.querySelector("#volume-icon");
const volumeSlider = document.querySelector("#volume-slider")
const progressBar = document.querySelector("#progress-bar")
const timestamp = document.querySelector("#timestamp")
const fullButton = document.querySelector("#full-screen");


// load json file
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/agents.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

loadJSON(function (response) {
    agentsData = JSON.parse(response).agents;
    console.log(agentsData);
});

const agentImage = document.querySelector("#agent-image")
const agentName = document.querySelector("#agent-name")
const agentBio = document.querySelector("#agent-bio")
const mapImage = document.querySelector("#map-image")

// main
addListeners();
video.textTracks[0].mode = "showing"
video.textTracks[0].addEventListener("cuechange", () => {
    const activeCues = video.textTracks[0].activeCues;
    if (activeCues.length > 0) {
        //agentImage.style = "display: block";
        let agent = activeCues[0].text
        agentImage.src = "resources/agents/" + agent + ".webp";
        agentName.textContent = agent;
        console.log(agentsData[agent])
        agentBio.textContent = agentsData[agent].bio;
    }
})

video.textTracks[1].mode = "showing"
video.textTracks[1].addEventListener("cuechange", () => {
    const activeCues = video.textTracks[1].activeCues;
    if (activeCues.length > 0) {
        //agentImage.style = "display: block";
        let map = activeCues[0].text
        mapImage.src = "resources/maps/" + map + ".webp";
    }
})


// add listeners function
function addListeners() {
    video.addEventListener("timeupdate", updateVideoProgress)
    video.addEventListener("click", playPauseVideo);
    playButton.addEventListener("click", playPauseVideo);
    forwardButton.addEventListener("click", forwardVideo);
    muteButton.addEventListener("click", muteVideoAudio);
    volumeSlider.addEventListener("mousemove", changeVolume);
    progressBar.addEventListener("change", setVideoProgress)
    fullButton.addEventListener("click", fullScreen)
}

// Utility functions
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

function playPauseVideo() {
    video[video.paused ? "play" : "pause"]()
    playButtonToggleIcon()
}

function playButtonToggleIcon() {
    if (video.paused) {
        playIcon.classList.remove("fa-pause")
        playIcon.classList.add("fa-play")
    } else {
        playIcon.classList.remove("fa-play")
        playIcon.classList.add("fa-pause")
    }
}

function forwardVideo() {
    console.log("forward")
    video.currentTime += 10
}

function muteVideoAudio() {
    console.log("mute")
    video.muted = !video.muted
    toggleVolumeIcon()
}

function toggleVolumeIcon() {
    if (video.muted) {
        volumeIcon.classList.remove("fa-volume-down")
        volumeIcon.classList.remove("fa-volume-up")
        volumeIcon.classList.add("fa-volume-mute")
        volumeIcon.classList.remove("fa-volume-off")
    } else if (video.volume == 0) {
        volumeIcon.classList.remove("fa-volume-mute")
        volumeIcon.classList.remove("fa-volume-down")
        volumeIcon.classList.remove("fa-volume-up")
        volumeIcon.classList.add("fa-volume-off")
    } else if (video.volume < 0.5) {
        volumeIcon.classList.add("fa-volume-down")
        volumeIcon.classList.remove("fa-volume-up")
        volumeIcon.classList.remove("fa-volume-mute")
        volumeIcon.classList.remove("fa-volume-off")
    } else {
        volumeIcon.classList.remove("fa-volume-down")
        volumeIcon.classList.add("fa-volume-up")
        volumeIcon.classList.remove("fa-volume-mute")
        volumeIcon.classList.remove("fa-volume-off")
    }
}

function changeVolume() {
    video.volume = volumeSlider.value;
    toggleVolumeIcon()
}

function setVideoProgress() {
    video.currentTime = Number((progressBar.value * video.duration) / 100)
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

