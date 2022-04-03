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


// Funciones iniciales

function sendLocation() {
  var inputElement = document.getElementById("video-location");
  var location = inputElement.value;
  setVideoOnEditor(location);
  inputElement.hidden = true;
  document.getElementById("send-location").hidden = true;
}

function setVideoOnEditor(location) {
  var video = document.getElementById("editor-video");
  video.src = videoName = location;
  video.hidden = false;
  document.getElementById("kills-container").style.visibility = "visible";
  document.getElementById("selector-container-agent").style.visibility = "visible";
  document.getElementById("selector-container-weapon").style.visibility = "visible";
  document.getElementById("selector-container-map").style.visibility = "visible";
  document.getElementById("subtitles-container").style.visibility = "visible";
  document.getElementById("delete-tracks").style.visibility = "visible";
  document.getElementById("save-tracks").style.visibility = "visible";
  document.getElementById("cues-selector").style.visibility = "visible";
  document.getElementById("player").style.visibility = "visible";

  //if video is mp4 then replace .mp4 with varPaths
  if (videoName.includes(".mp4")) {
    pathMetadata[0] = location.replace(".mp4", "-metadataKills.vtt");
    pathMetadata[1] = location.replace(".mp4", "-metadataAgents.vtt");
    pathMetadata[2] = location.replace(".mp4", "-metadataSubtitles.vtt");
  } else {
    pathMetadata[0] = location.replace(".webm", "-metadataKills.vtt");
    pathMetadata[1] = location.replace(".webm", "-metadataAgents.vtt");
    pathMetadata[2] = location.replace(".webm", "-metadataSubtitles.vtt");
  }

  var track1 = video.textTracks[0];
  var track2 = video.textTracks[1];
  var track3 = video.textTracks[2];

  video.textTracks[0].src = "/data/kills.vtt";

  track1.mode = "showing";
  track2.mode = "showing";
  track3.mode = "showing";
  // console.log(video.textTracks[0]);
  //Print all cues from track1
  for (var i = 0; i < video.textTracks[0].cues.length; i++) {
    console.log(video.textTracks[0].cues[i]);
  }
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
  var cues_selector = document.getElementById("cues-selector");
  var vtt = "WEBVTT\n\n";
  for (var i = 0; i < vid.textTracks.length; i++) {
    if (vid.textTracks[i].cues != null) {
      for (var j = 0; j < vid.textTracks[i].cues.length; j++) {
        var cue = vid.textTracks[i].cues[j];
        vtt += `${reconvertTime(cue.startTime.toFixed(3))}  -->  ${reconvertTime(cue.endTime.toFixed(3))}\n${cue.text}\n`;
      }
      console.log(vtt);
      console.log(pathMetadata[i]);
      var fileName = getFileName(pathMetadata[i]);
      writeVtt(vtt, fileName);
      vtt = "WEBVTT\n\n";
    }
  }
  cues_selector.replaceChildren();
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
  var text = document.createTextNode(`${reconvertTime(cue.startTime.toFixed(3))}\t${reconvertTime(cue.endTime.toFixed(3))}\t${cue.text
    }\n`);

  var button = document.createElement("button");
  button.class = "btn btn-solid-reg";
  button.innerText = "Elimina Cue";
  button.visibility = "visible";
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
  var minutes = Math.floor((time - (hours * 3600)) / 60);
  var seconds = Math.floor(time - (hours * 3600) - (minutes * 60));
  var miliseconds = Math.floor((time - (hours * 3600) - (minutes * 60) - seconds) * 1000);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  if (miliseconds < 10) { miliseconds = "00" + miliseconds; }
  else if (miliseconds < 10) { miliseconds = "0" + miliseconds; }

  return hours + ':' + minutes + ':' + seconds + '.' + miliseconds;
}