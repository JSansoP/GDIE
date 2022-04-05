// Variables
var numKill = 1;
var numAssist = 1;
var numAce = 1;
var numUlti = 1;
var numSpike = 1;

var numAgents = 1;
var timeAgent;
var numWeapon = 1;
var timeWeapon;
var numMap = 1;
var timeMap;

var videoName;
var pathMetadata = [];

$("document").ready(function () {
  //call php/getFiles.php to get all the files in the folder and put them in the select element
  $.get("php/getFiles.php", function (data) {
    var files = JSON.parse(data);
    var video_selector = document.getElementById("video-selector");

    //add files to video-selector
    for (var i = 0; i < files.length; i++) {
      var div = document.createElement("div");
      var img = document.createElement("img");
      var bold = document.createElement("strong");
      var text = document.createTextNode(files[i]);

      div.className = "gallery";
      bold.className = "desc;";

      img.src = "videos/" + files[i] + "/" + files[i] + ".jpg";

      console.log("File[i] " + files[i]);
      addListenerToImg(img, files[i]);

      bold.appendChild(text);
      div.appendChild(img);
      div.appendChild(bold);
      video_selector.appendChild(div);
    }
    addListeners();
  });
});

function addListenerToImg(img, vid) {
  var video_selector = document.getElementById("video-selector");
  img.addEventListener("click", function () {
    setVideoOnEditor(vid);
    video_selector.hidden = true;
  });
}

// Funciones iniciales

function setVideoOnEditor(location) {
  var video = document.getElementById("editor-video");

  //Posible subfuncion
  if (video.canPlayType) {
    console.log("canPlay");
    if (video.canPlayType("video/mp4")) {
      video.src = "videos/" + location + "/" + location + ".mp4";
      video.type = "video/mp4";
    } else if (video.canPlayType("video/mkv")) {
      video.src = "videos/" + location + "/" + location + ".mkv";
      video.type = "video/mkv";
    } else if (video.canPlayType("video/avi")) {
      video.src = "videos/" + location + "/" + location + ".avi";
      video.type = "video/avi";
    }
  }

  video.hidden = false;
  //Possible subfuncion para poner visible las cosas
  document.getElementById("kills-container").style.visibility = "visible";
  document.getElementById("selector-container-agent").style.visibility =
    "visible";
  document.getElementById("selector-container-weapon").style.visibility =
    "visible";
  document.getElementById("selector-container-map").style.visibility =
    "visible";
  document.getElementById("subtitles-container").style.visibility = "visible";
  document.getElementById("delete-tracks").style.visibility = "visible";
  document.getElementById("save-tracks").style.visibility = "visible";
  document.getElementById("cues-selector").style.visibility = "visible";
  document.getElementById("player").style.visibility = "visible";
  //PORQUE NO SE GUARDAA EN LA SUBCARPETA???? JONATHAN
  pathMetadata[0] = "videos/" + location + "/instant_info.vtt";
  pathMetadata[1] = "videos/" + location + "/constant_info.vtt";
  pathMetadata[2] = "videos/" + location + "/subtitles.vtt";

  const instantInfo = document.getElementById("instant-info");
  instantInfo.src = pathMetadata[0];

  const constantInfo = document.getElementById("constant-info");
  constantInfo.src = pathMetadata[1];

  const subtitlesInfo = document.getElementById("subtitles-info");
  subtitlesInfo.src = pathMetadata[2];

  video.load();

  for (var i = 0; i < video.textTracks.length; i++) {
    video.textTracks[i].mode = "showing";
  }

  console.log(video.textTracks);
  video.addEventListener("loadedmetadata", function () {
    //Loop through all cues in all tracks
    for (var i = 0; i < video.textTracks.length; i++) {
      for (var j = 0; j < video.textTracks[i].cues.length; j++) {
        addCueToDiv(video.textTracks[i].cues[j], i);
      }
    }
  });
}

//JQuery track 0
$("#AddKill").click(function () {
  var vid = document.getElementById("editor-video");
  var cue = new VTTCue(vid.currentTime, vid.currentTime + 1, `Kill-${numKill}`);
  vid.textTracks[0].addCue(cue);
  console.log(cue);
  addCueToDiv(cue, 0);
  numKill++;
});

$("#AddSpike").click(function () {
  var vid = document.getElementById("editor-video");
  var cue = new VTTCue(
    vid.currentTime,
    vid.currentTime + 1,
    `Spike-${numSpike}`
  );
  vid.textTracks[0].addCue(cue);
  addCueToDiv(cue, 0);
  numSpike++;
});

$("#AddUltimate").click(function () {
  var vid = document.getElementById("editor-video");
  var cue = new VTTCue(vid.currentTime, vid.currentTime + 1, `Ult-${numUlti}`);
  vid.textTracks[0].addCue(cue);
  addCueToDiv(cue, 0);
  numUlti++;
});

$("#AddAssist").click(function () {
  var vid = document.getElementById("editor-video");
  var cue = new VTTCue(
    vid.currentTime,
    vid.currentTime + 1,
    `Assist-${numAssist}`
  );
  vid.textTracks[0].addCue(cue);
  addCueToDiv(cue, 0);
  numAssist++;
});

$("#AddAce").click(function () {
  var vid = document.getElementById("editor-video");
  var cue = new VTTCue(vid.currentTime, vid.currentTime + 1, `Ace-${numAce}`);
  vid.textTracks[0].addCue(cue);
  addCueToDiv(cue, 0);
  numAce++;
});

//JQuery track 1
$("#add-weapon").click(function () {
  var vid = document.getElementById("editor-video");
  var initial_time = convertTime($("#initial-time-weapon").val());
  var final_time = convertTime($("#final-time-weapon").val());
  var weapon = $("#changeWeapon option:selected").val();
  var cue = new VTTCue(initial_time, final_time, weapon);
  vid.textTracks[1].addCue(cue);
  addCueToDiv(cue, 1);
});

$("#add-agent").click(function () {
  var vid = document.getElementById("editor-video");
  var initial_time = convertTime($("#initial-time-agent").val());
  console.log("a");
  console.log($("#initial-time-agent").val());
  console.log(initial_time);
  var final_time = convertTime($("#final-time-agent").val());
  var agent = $("#changeAgent option:selected").val();
  var cue = new VTTCue(initial_time, final_time, agent);
  vid.textTracks[1].addCue(cue);
  addCueToDiv(cue, 1);
});

$("#add-map").click(function () {
  var vid = document.getElementById("editor-video");
  var initial_time = convertTime($("#initial-time-map").val());
  var final_time = convertTime($("#final-time-map").val());
  var map = $("#changeMap option:selected").val();
  var cue = new VTTCue(initial_time, final_time, map);
  vid.textTracks[1].addCue(cue);
  addCueToDiv(cue, 1);
});

//JQuery track 2
$("#add-subtitle").click(function () {
  var vid = document.getElementById("editor-video");
  var initial_time = convertTime($("#initial-time-subtitle").val());
  var final_time = convertTime($("#final-time-subtitle").val());
  var subtitle = $("subtitle").val();
  var cue = new VTTCue(initial_time, final_time, subtitle);
  vid.textTracks[2].addCue(cue);
  addCueToDiv(cue, 2);
});

//get filename from path
function getFileName(path) {
  var fileName = path.split("/");
  fileName = fileName[fileName.length - 1];
  return fileName;
}

//JQuery guardar y borrar tracks
$("#save-tracks").click(function () {
  var vid = document.getElementById("editor-video");
  var vtt = "WEBVTT\n\n";
  for (var i = 0; i < vid.textTracks.length; i++) {
    if (vid.textTracks[i].cues != null) {
      for (var j = 0; j < vid.textTracks[i].cues.length; j++) {
        var cue = vid.textTracks[i].cues[j];
        vtt += `${reconvertTime(
          cue.startTime.toFixed(3)
        )}  -->  ${reconvertTime(cue.endTime.toFixed(3))}\n${cue.text}\n\n`;
      }
      writeVtt(vtt, pathMetadata[i]);
      vtt = "WEBVTT\n\n";
    }
  }
});

$("#delete-tracks").click(function () {
  var vid = document.getElementById("editor-video");
  var cues_selector = document.getElementById("cues-selector");
  for (var i = 0; i < vid.textTracks.length; i++) {
    if (vid.textTracks[i].cues != null) {
      for (var j = 0; j < vid.textTracks[i].cues.length; j++) {
        var cue = vid.textTracks[i].cues[j];
        vid.textTracks[i].removeCue(cue);
      }
    }
  }
  cues_selector.replaceChildren();
});

// Funciones auxiliares
function addCueToDiv(cue, num_track) {
  var video = document.getElementById("editor-video");
  var cues_selector = document.getElementById("cues-selector");
  var div = document.createElement("div");
  var text = document.createTextNode(
    `${reconvertTime(cue.startTime.toFixed(3))}\t${reconvertTime(
      cue.endTime.toFixed(3)
    )}\t${cue.text}\n`
  );

  var button = document.createElement("button");
  button.className = "btn-solid-reg";
  button.innerText = "Elimina Cue";
  button.visibility = "visible";
  //add left and top padding to button
  button.style.margin = "0.25rem";

  text.visibility = "visible";
  button.addEventListener("click", function () {
    video.textTracks[num_track].removeCue(cue);
    div.remove();
  });

  div.appendChild(text);
  div.appendChild(button);

  cues_selector.appendChild(div);
}

function writeVtt(vtt, file) {
  var data = {
    f: `${file}`,
    str: vtt,
  };
  console.log(file);
  $.post("php/writeVtt.php", data);
  console.log("he posteado");
}

// convert from hh:mm:ss to seconds
function convertTime(time) {
  var a = time.split(":");
  var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  return seconds;
}

// Convert from seconds to hh:mm:ss.ttt
function reconvertTime(time) {
  var hours = Math.floor(time / 3600);
  var minutes = Math.floor((time - hours * 3600) / 60);
  var seconds = Math.floor(time - hours * 3600 - minutes * 60);
  var miliseconds = Math.floor(
    (time - hours * 3600 - minutes * 60 - seconds) * 1000
  );

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (miliseconds < 10) {
    miliseconds = "00" + miliseconds;
  } else if (miliseconds < 10) {
    miliseconds = "0" + miliseconds;
  }

  return hours + ":" + minutes + ":" + seconds + "." + miliseconds;
}

const video = document.querySelector("#editor-video");
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

function addListeners() {
  video.addEventListener("timeupdate", updateVideoProgress);
  video.addEventListener("click", playPauseVideo);
  playButton.addEventListener("click", playPauseVideo);
  forwardButton.addEventListener("click", forwardVideo);
  muteButton.addEventListener("click", muteVideoAudio);
  volumeSlider.addEventListener("mousemove", changeVolume);
  progressBar.addEventListener("change", setVideoProgress);
  fullButton.addEventListener("click", fullScreen);
}

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
  cues = video.textTracks[instantInfo].cues;
  div = document.createElement("div");
  div.classList.add("breakpoint");
  div.style.width = `${
    (cues[0].startTime / video.duration) * progressBar.offsetWidth + 5
  }px`;
  div.style.zIndex = "1";
  bpWrapper.appendChild(div);
  console.log(cues.length);
  for (let i = 0; i < cues.length; i++) {
    if (i == cues.length - 1) {
      duration = video.duration - cues[i].startTime;
    } else {
      duration = cues[i + 1].startTime - cues[i].startTime;
    }
    div = document.createElement("div");
    div.classList.add("breakpoint");
    div.style.width = `${
      (duration / video.duration) * progressBar.offsetWidth
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
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
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
  video.currentTime = cues[currCue].startTime;
  //video.currentTime += 10;
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
