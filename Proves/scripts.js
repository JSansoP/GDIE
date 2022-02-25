function init() {
  var video = document.createElement("video");
  video.setAttribute("id", "video");
  if (video.canPlayType) {
    if (video.canPlayType("video/ogg")) {
      video.src = "http://techslides.com/demos/sample-videos/small.ogv";
    }
    if (video.canPlayType("video/mp4")) {
      video.src = "http://techslides.com/demos/sample-videos/small.mp4";
    }
    //video.setAttribute("controls", "controls");
    document.body.appendChild(video);
  } else {
    var div = document.createElement("div");
    div.innerHTML = "Video not supported by your browser.";
    document.body.appendChild(div);
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
