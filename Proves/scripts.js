function init() {
  var video = document.createElement("video");
  video.setAttribute("id", "video");
  if (video.canPlayType) {
    if (video.canPlayType("video/ogg")) {
      video.src = "http://techslides.com/demos/sample-videos/small.ogv";
    }
    if (video.canPlayType("video/mp4")) {
      video.src = "../../file_example_MP4_1920_18MG.mp4";
    }
    video.setAttribute("height","500px")
    //video.setAttribute("controls", "controls");
    document.body.appendChild(video);
  } else {
    var div = document.createElement("div");
    div.innerHTML = "Video not supported by your browser.";
    document.body.appendChild(div);
  }
}

function toggleVideo(){
  var vid = document.getElementById("video"); 
  var but = document.getElementById("toggleButton");
  if(vid.paused){
    console.log("a");
    but.innerText = "Pause";
    vid.play();
  } else{
    console.log("b");
    but.innerText = "Play";
    vid.pause();
  }
}

function playVid() {
  var vid = document.getElementById("video");
  vid.play();
}

function pauseVid() {
  var vid = document.getElementById("video");
  vid.pause();
}

function forward5(){
  var vid = document.getElementById("video");
  vid.currentTime = vid.currentTime + 5;
}

function back5(){
  var vid = document.getElementById("video");
  vid.currentTime = vid.currentTime - 5;
}