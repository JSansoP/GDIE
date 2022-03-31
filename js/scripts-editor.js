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

var currentAgent;
var oldAgent;

var currentWeapon;
var oldWeapon;

var currentMap;
var oldMap;

var videoName;
var pathMetadata = [];


$("#delete-tracks").click(function () {
    var vid = document.getElementById("editor-video");
    for (var i = 0; i < vid.textTracks.length; i++) {
        for (var j = 0; j < vid.textTracks[i].cues.length; j++) {
            var cue = vid.textTracks[i].cues[j];
            vid.textTracks[i].removeCue(cue);
        }
    }
});

$("#AddKill").click(function () {
    var vid = document.getElementById("editor-video");
    var cue = new VTTCue(
        vid.currentTime - 1,
        vid.currentTime + 1,
        `Kill-${numKill}`);
    vid.textTracks[0].addCue(cue);
    numKill++;
});

$("#AddSpike").click(function () {
    var vid = document.getElementById("editor-video");
    var cue = new VTTCue(
        vid.currentTime - 1,
        vid.currentTime + 1,
        `Spike-${numSpike}`);
    vid.textTracks[0].addCue(cue);
    numSpike++;
});

$("#AddUltimate").click(function () {
    var vid = document.getElementById("editor-video");
    var cue = new VTTCue(
        vid.currentTime - 1,
        vid.currentTime + 1,
        `Ult-${numUlti}`);
    vid.textTracks[0].addCue(cue);
    numUlti++;
});

$("#AddAssist").click(function () {
    var vid = document.getElementById("editor-video");
    var cue = new VTTCue(
        vid.currentTime - 1,
        vid.currentTime + 1,
        `Assist-${numAssist}`);
    vid.textTracks[0].addCue(cue);
    numAssist++;
});

$("#AddAce").click(function () {
    var vid = document.getElementById("editor-video");
    var cue = new VTTCue(
        vid.currentTime - 1,
        vid.currentTime + 1,
        `Ace-${numAce}`);
    vid.textTracks[0].addCue(cue);
    numAce++;
});

// Falta posar a info quin agent és i canviar sa variable global currentAgent a nes que sigui
$("#changeAgent").change(function () {
    var vid = document.getElementById("editor-video");
    currentAgent = $("#changeAgent option:selected").val();
    if (currentAgent.localeCompare("None") == 0) return;
    console.log(currentAgent);
    if (numAgents == 1) {
        timeAgent = vid.currentTime;
        oldAgent = currentAgent;
        numAgents++;
    } else {
        var cue = new VTTCue(
            timeAgent,
            vid.currentTime,
            `Agent-${oldAgent}`);
        vid.textTracks[1].addCue(cue);
        timeAgent = vid.currentTime;
        oldAgent = currentAgent;
    }
});

// Falta posar a info quina weapona és
$("#changeWeapon").change(function () {
    var vid = document.getElementById("editor-video");
    currentWeapon = $("#changeWeapon option:selected").val();
    if (currentWeapon.localeCompare("None") == 0) return;
    console.log(currentWeapon);
    if (numWeapon == 1) {
        timeWeapon = vid.currentTime;
        oldWeapon = currentWeapon;
        numWeapon++;
    } else {
        var cue = new VTTCue(
            timeWeapon,
            vid.currentTime,
            `Weapon-${oldWeapon}`);
        vid.textTracks[1].addCue(cue);
        timeWeapon = vid.currentTime;
        oldWeapon = currentWeapon;
    }
});

// Falta posar a info quin mapa és
$("#changeMap").change(function () {
    var vid = document.getElementById("editor-video");
    currentMap = $("#changeMap option:selected").val();
    if (currentMap.localeCompare("None") == 0) return;
    console.log(currentMap);
    if (numMap == 1) {
        timeMap = vid.currentTime;
        oldMap = currentMap;
        numMap++;
    } else {
        var cue = new VTTCue(
            timeMap,
            vid.currentTime,
            `Map-${oldMap}`);
        vid.textTracks[1].addCue(cue);
        timeMap = vid.currentTime;
        oldMap = currentMap;
    }
});



$("#add-subtitle").click(function () {
    var vid = document.getElementById("editor-video");
    var initial_time = $("#initial-time").val();
    var final_time = $("#final-time").val();
    var subtitle = $("subtitle").val();
    var cue = new VTTCue(
        initial_time,
        final_time,
        subtitle
    );
    vid.textTracks[2].addCue(cue);
});

$("#save-tracks").click(function () {
    var vid = document.getElementById("editor-video");
    var vtt = "";
    for (var i = 0; i < vid.textTracks.length; i++) {
        for (var j = 0; j < vid.textTracks[i].cues.length; j++) {
            var cue = vid.textTracks[i].cues[j];
            vtt += `${cue.startTime.toFixed(3)}\t${cue.endTime.toFixed(3)}\t${cue.text}\n`;
        }
        writeVtt(vtt, pathMetadata[i]);
        vtt = "";
    }
});

function writeVtt(vtt, file) {
    var vname = getFileName(videoName);
    var data = {
        f: `${file}`,
        str: vtt,
    };
    $.post("php/writeVtt.php", data);
    console.log("he posteado");
}

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
    document.getElementById("button-container").style.visibility = "visible";
    document.getElementById("kills-container").style.visibility = "visible";
    document.getElementById("selector-container").style.visibility = "visible";
    document.getElementById("subtitles-container").style.visibility = "visible";
    document.getElementById("delete-tracks").style.visibility = "visible";
    document.getElementById("save-tracks").style.visibility = "visible";

    video.addEventListener("ended", (event) => {
        cueoldAgent.setTempsFinal(video.currentTime);
        vttAgent = cueoldAgent.toVttFormat();
        if (vttAgent != null) {
            writeVtt(vttAgent, "agent_weapon_map");
        }
        cueoldWeapon.setTempsFinal(video.currentTime);
        vttWeapon = cueoldWeapon.toVttFormat();
        if (vttWeapon != null) {
            writeVtt(vttWeapon, "agent_weapon_map");
        }
        cueOldMap.setTempsFinal(video.currentTime);
        vttMap = cueOldMap.toVttFormat();
        if (vttMap != null) {
            writeVtt(vttMap, "agent_weapon_map");
        }
    });
    //if video is mp4 then replace .mp4 with varPaths
    if (videoName.includes(".mp4")) {
        pathMetadata[0] = location.replace(".mp4", "-metadataKills.vtt");
        pathMetadata[1] = location.replace(".mp4", "-metadataAgents.vtt");
        pathMetadataSubtitles = location.replace(".mp4", "-metadataSubtitles.vtt");
    }
    else {
        pathMetadata[0] = location.replace(".webm", "-metadataKills.vtt");
        pathMetadata[1] = location.replace(".webm", "-metadataAgents.vtt");
        pathMetadata[2] = location.replace(".webm", "-metadataSubtitles.vtt");
    }
    //create track element for every metadata
    for (var i = 0; i < pathMetadata.length; i++) {
        var track = document.createElement("track");
        track.kind = "metadata";
        track.label = "metadata";
        track.src = pathMetadata[i];
        track.srclang = "en";
        track.default = true;
        video.appendChild(track);
    }

    var track1 = document.createElement("track");
    track1.setAttribute("id", "track-kills");
    track1.setAttribute("kind", "metadata");
    track1.setAttribute("id", "Metadata-Kills");
    track1.setAttribute("src", pathMetadata[0]);

    var track2 = document.createElement("track");
    track2.setAttribute("id", "track-agents");
    track2.setAttribute("kind", "metadata");
    track2.setAttribute("id", "Metadata-Agents");
    track2.setAttribute("src", pathMetadata[1]);

    var track3 = document.createElement("track");
    track3.setAttribute("id", "track-subtitles");
    track3.setAttribute("kind", "subtitles");
    track3.setAttribute("id", "Metadata-Subtitles");
    track3.setAttribute("src", pathMetadata[2]);
}