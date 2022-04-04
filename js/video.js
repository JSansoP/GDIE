//https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

// Grab DOM elements
const video = document.querySelector(".video");
const playButton = document.querySelector("#play");
const playIcon = document.querySelector("#play-icon");
const forwardButton = document.querySelector("#forward");
const muteButton = document.querySelector("#mute");
const volumeIcon = document.querySelector("#volume-icon");
const volumeSlider = document.querySelector("#volume-slider");
const progressBar = document.querySelector("#progress-bar");
const timestamp = document.querySelector("#timestamp");
const subtitlesButtton = document.querySelector("#subtitles");
const subtitlesIcon = document.querySelector("#subtitles-icon");
const fullButton = document.querySelector("#full-screen");

const constantInfo = 0;
const instantInfo = 1;
const subtitles = 2;

// load json file
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "data/agents.json", true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

loadJSON(function (response) {
    agentsData = JSON.parse(response).agents;
});

const agentImage = document.querySelector("#agent-image");
const agentName = document.querySelector("#agent-name");
const agentBio = document.querySelector("#agent-bio");
const mapImage = document.querySelector("#map-image");
const weaponImage = document.querySelector("#weapon-image");

// main
$("document").ready(function () {
    if(video.canPlayType){
        console.log("canPlay")
        if(video.canPlayType("video/mp4")){
            video.src = "videos/sample/sample.mp4";
            video.type= "video/mp4";
            console.log("mp4")
            // video.src = "videos/valorant/valorant.mp4";
        } else if(video.canPlayType("video/mkv")){
            video.src = "videos/valorant/valorant.mkv";
            video.type= "video/mkv";
            console.log("mkv")
        } else if(video.canPlayType("video/avi")){
            video.src = "videos/valorant/valorant.avi";
            video.type= "video/avi";
            console.log("avi")
        }
    }
    addListeners();
    video.textTracks[constantInfo].mode = "showing";
    video.textTracks[constantInfo].addEventListener("cuechange", manageConstantInfo);

    video.textTracks[instantInfo].mode = "showing";
    video.addEventListener("loadedmetadata", manageInstantInfo);
});


function manageConstantInfo() {
    const activeCues = video.textTracks[constantInfo].activeCues;
    for (let i = 0; i < activeCues.length; i++) {
        console.log(activeCues[i].id + ", " + activeCues[i].text);
        if (activeCues[i].id.includes("Agent")) {
            let agent = activeCues[0].text;
            agentImage.src = "resources/agents/" + agent + ".webp";
            agentName.textContent = agent;
            agentBio.textContent = agentsData[agent].bio;
        } else if (activeCues[i].id.includes("Map")) {
            let map = activeCues[i].text;
            mapImage.src = "resources/maps/" + map + ".webp";
        } else if (activeCues[i].id.includes("Weapon")) {
            let weapon = activeCues[i].text;
            weaponImage.src = "resources/weapons/" + weapon + ".webp";
        }
    }
}


function manageInstantInfo() {
    const bpWrapper = document.querySelector("#breakpoint-wrapper");
    progressBar.style.zIndex = "2";
    let cues = video.textTracks[instantInfo].cues;
    div = document.createElement("div");
    div.classList.add("breakpoint");
    div.style.width = `${(cues[0].startTime / video.duration) * progressBar.offsetWidth + 5}px`;
    div.style.zIndex = "1";
    bpWrapper.appendChild(div);
    for (let i = 0; i < cues.length; i++) {
        if (i == cues.length - 1) {
            duration = video.duration - cues[i].startTime;
        } else {
            duration = cues[i + 1].startTime - cues[i].startTime;
        }
        div = document.createElement("div");
        div.classList.add("breakpoint");
        div.style.width = `${(duration / video.duration) * progressBar.offsetWidth
            }px`;
        div.style.zIndex = "1";
        if (cues[i].text.includes("Kill")) {
            div.style.borderLeft = "3px solid red";
        } else if (cues[i].text.includes("Ace")) {
            div.style.borderLeft = "3px solid black";
        } else if (cues[i].text.includes("Assist")) {
            div.style.borderLeft = "3px solid blue";
        }
        bpWrapper.appendChild(div);
    }
}

// add listeners function
function addListeners() {
    video.addEventListener("timeupdate", updateVideoProgress);
    video.addEventListener("click", playPauseVideo);
    playButton.addEventListener("click", playPauseVideo);
    forwardButton.addEventListener("click", forwardVideo);
    muteButton.addEventListener("click", muteVideoAudio);
    volumeSlider.addEventListener("mousemove", changeVolume);
    progressBar.addEventListener("change", setVideoProgress);
    subtitlesButtton.addEventListener("click", toggleSubtitles);
    fullButton.addEventListener("click", fullScreen);
}

// Utility functions

function toggleSubtitles() {
    if (video.textTracks[subtitles].mode == "showing") {
        video.textTracks[subtitles].mode = "hidden";
        subtitlesIcon.classList.remove("fas");
        subtitlesIcon.classList.add("far");
    } else {
        video.textTracks[subtitles].mode = "showing";
        subtitlesIcon.classList.remove("far");
        subtitlesIcon.classList.add("fas");
    }
}

function updateVideoProgress() {
    progressBar.value = Number((video.currentTime / video.duration) * 100);
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime % 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    timestamp.textContent = `${minutes}:${seconds}`;
}

function playPauseVideo() {
    video[video.paused ? "play" : "pause"]();
    playButtonToggleIcon();
}

function playButtonToggleIcon() {
    if (video.paused) {
        playIcon.classList.remove("fa-pause");
        playIcon.classList.add("fa-play");
    } else {
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");
    }
}

function forwardVideo() {
    console.log("forward");
    video.currentTime += 10;
}

function muteVideoAudio() {
    console.log("mute");
    video.muted = !video.muted;
    toggleVolumeIcon();
}

function toggleVolumeIcon() {
    if (video.muted) {
        volumeIcon.classList.remove("fa-volume-down");
        volumeIcon.classList.remove("fa-volume-up");
        volumeIcon.classList.add("fa-volume-mute");
        volumeIcon.classList.remove("fa-volume-off");
    } else if (video.volume == 0) {
        volumeIcon.classList.remove("fa-volume-mute");
        volumeIcon.classList.remove("fa-volume-down");
        volumeIcon.classList.remove("fa-volume-up");
        volumeIcon.classList.add("fa-volume-off");
    } else if (video.volume < 0.5) {
        volumeIcon.classList.add("fa-volume-down");
        volumeIcon.classList.remove("fa-volume-up");
        volumeIcon.classList.remove("fa-volume-mute");
        volumeIcon.classList.remove("fa-volume-off");
    } else {
        volumeIcon.classList.remove("fa-volume-down");
        volumeIcon.classList.add("fa-volume-up");
        volumeIcon.classList.remove("fa-volume-mute");
        volumeIcon.classList.remove("fa-volume-off");
    }
}

function changeVolume() {
    video.volume = volumeSlider.value;
    toggleVolumeIcon();
}

function setVideoProgress() {
    video.currentTime = Number((progressBar.value * video.duration) / 100);
}

function fullScreen() {
    if (video.requestFullscreen) {
        // Principal
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        // Segun Navegador
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}
