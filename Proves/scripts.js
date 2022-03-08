function init() {
  var video = document.getElementById("content");
  if (video.canPlayType) {
    if (video.canPlayType("video/ogg")) {
      video.src = "http://techslides.com/demos/sample-videos/small.ogv";
    }
    if (video.canPlayType("video/mp4")) {
      video.src = "../../file_example_MP4_1920_18MG.mp4";
    }
    video.setAttribute("height","500px")
    //video.setAttribute("controls", "controls");
  } else {
    var div = document.getElementById("video-container");
    div.innerHTML = "Video not supported by your browser.";
  }
}

function toggleVideo(){
  var vid = document.getElementById("content"); 
  var but = document.getElementById("toggleButton");
  if(vid.paused){
    but.innerText = "Pause";
    vid.play();
  } else{
    but.innerText = "Play";
    vid.pause();
  }
}

function playVid() {
  var vid = document.getElementById("content");
  vid.play();
}

function pauseVid() {
  var vid = document.getElementById("content");
  vid.pause();
}

function forward5(){
  var vid = document.getElementById("content");
  vid.currentTime = vid.currentTime + 5;
}

function back5(){
  var vid = document.getElementById("video");
  vid.currentTime = vid.currentTime - 5;
}