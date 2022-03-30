
class cue {
    constructor(id, inici, final, info) {
        this.id = id;
        this.inici = inici;
        this.final = final;
        this.info = info;
    }

    setTempsFinal(final) {
        this.final = final;
    }

    toVttFormat() {
        if (
            this.id == null ||
            this.inici == null ||
            this.final == null ||
            this.info == null
        )
            return null;
        return (
            this.id +
            "\n" +
            this.toHHMMSSttt(this.inici) +
            " --> " +
            this.toHHMMSSttt(this.final) +
            "\n" +
            this.info +
            "\n"
        );
    }

    toHHMMSSttt(sec_num) {
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - hours * 3600) / 60);
        var seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);
        var miliseconds = Math.floor(
            (sec_num - hours * 3600 - minutes * 60 - seconds) * 1000
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
}
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

var numSubtitles = 1;

var currentAgent;
var OldAgent;

var currentWeapon;
var OldWeapon;

var currentMap;
var OldMap;

var videoName;

$("#delete-tracks").click(function () {
    var vid = document.getElementById("editor-video");
    for (var i = 0; i < vid.textTracks.length; i++) {
        vid.textTracks[i].cues.remove();
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
        `Ult-${numUlt}`);
    vid.textTracks[0].addCue(cue);
    numUlt++;

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
        OldAgent = currentAgent;
        numAgents++;
    } else {
        var cue = new VTTcue(
            timeAgent,
            vid.currentTime,
            `Agent-${OldAgent}`);
        vid.textTracks[1].addCue(cue);
        timeAgent = vid.currentTime;
        OldAgent = currentAgent;
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
        OldWeapon = currentWeapon;
        numWeapon++;
    } else {
        var cue = new VTTcue(
            timeWeapon,
            vid.currentTime,
            `Weapon-${OldWeapon}`);
        vid.textTracks[2].addCue(cue);
        timeWeapon = vid.currentTime;
        OldWeapon = currentWeapon;
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
        OldMap = currentMap;
        numMap++;
    } else {
        var cue = new VTTcue(
            timeMap,
            vid.currentTime,
            `Map-${OldMap}`);
        vid.textTracks[3].addCue(cue);
        timeMap = vid.currentTime;
        OldMap = currentMap;
    }
});

function writeVtt(vtt, file) {
    var vname = getFileName(videoName);
    var data = {
        f: `${videoName}-${file}`,
        str: vtt,
    };
    $.post("php/writeVtt.php", data);
    console.log("he posteado");
}

$("addSubtitle").click(function () {
    var vid = document.getElementById("editor-video");
    var initial_time = $("#initial-time").val();
    var final_time = $("#final-time").val();
    var subtitle = $("subtitle").val();
    var cue = new VTTcue(
        initial_time,
        final_time,
        subtitle
    );
    vid.textTracks[3].addCue(cue);
});


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

    video.addEventListener("ended", (event) => {
        cueOldAgent.setTempsFinal(video.currentTime);
        vttAgent = cueOldAgent.toVttFormat();
        if (vttAgent != null) {
            writeVtt(vttAgent, "agent_weapon_map");
        }
        cueOldWeapon.setTempsFinal(video.currentTime);
        vttWeapon = cueOldWeapon.toVttFormat();
        if (vttWeapon != null) {
            writeVtt(vttWeapon, "agent_weapon_map");
        }
        cueOldMap.setTempsFinal(video.currentTime);
        vttMap = cueOldMap.toVttFormat();
        if (vttMap != null) {
            writeVtt(vttMap, "agent_weapon_map");
        }
    });
}