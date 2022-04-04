const video_player = document.querySelector('#video_player'),
    mainVideo = video_player.querySelector('#main-video'),
    progressAreaTime = video_player.querySelector('.progressAreaTime'),
    controls = video_player.querySelector('.controls'),
    progressArea = video_player.querySelector('.progress-area'),
    progress_Bar = video_player.querySelector('.progress-bar'),
    play_pause = video_player.querySelector('.play_pause'),

    skip_next = video_player.querySelector('.skip_next'),

    volume = video_player.querySelector('.volume'),
    volume_range = video_player.querySelector('.volume_range'),
    current = video_player.querySelector('.current'),
    totalDuration = video_player.querySelector('.duration'),
    fullscreen = video_player.querySelector('.fullscreen');

function playVideo() {
    play_pause.innerHTML = "pause";
    play_pause.title = "pause";
    video_player.classList.add('paused')
    mainVideo.play();
}

function pauseVideo() {
    play_pause.innerHTML = "play_arrow";
    play_pause.title = "play";
    video_player.classList.remove('paused')
    mainVideo.pause();
}

play_pause.addEventListener('click', () => {
    const isVideoPaused = video_player.classList.contains('paused');
    isVideoPaused ? pauseVideo() : playVideo();
})

// Load video duration
mainVideo.addEventListener("loadeddata", (e) => {
    let videoDuration = e.target.duration;
    let totalMin = Math.floor(videoDuration / 60);
    let totalSec = Math.floor(videoDuration % 60);

    // if seconds are less then 10 then add 0 at the begning
    totalSec < 10 ? totalSec = "0" + totalSec : totalSec;
    totalDuration.innerHTML = `${totalMin} : ${totalSec}`;
})

// Current video duration
mainVideo.addEventListener('timeupdate', (e) => {
    let currentVideoTime = e.target.currentTime;
    let currentMin = Math.floor(currentVideoTime / 60);
    let currentSec = Math.floor(currentVideoTime % 60);
    // if seconds are less then 10 then add 0 at the begning
    currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
    current.innerHTML = `${currentMin} : ${currentSec}`;

    let videoDuration = e.target.duration
    // progressBar width change
    let progressWidth = (currentVideoTime / videoDuration) * 100;
    progress_Bar.style.width = `${progressWidth}%`;
})

progressArea.addEventListener('click', (e) => {
    let videoDuration = mainVideo.duration;
    let progressWidthval = progressArea.clientWidth;
    let ClickOffsetX = e.offsetX;
    mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
})

function changeVolume() {
    mainVideo.volume = volume_range.value / 100;
    if (volume_range.value == 0) {
        volume.innerHTML = "volume_off";
    } else if (volume_range.value < 40) {
        volume.innerHTML = "volume_down";
    } else {
        volume.innerHTML = "volume_up";
    }

}

function muteVolume() {
    if (volume_range.value == 0) {
        volume_range.value = 80;
        mainVideo.volume = 0.8;
        volume.innerHTML = "volume_up";
    } else {
        volume_range.value = 0;
        mainVideo.volume = 0;
        volume.innerHTML = "volume_off";
    }
}


volume_range.addEventListener('change', () => {
    changeVolume();
})

volume.addEventListener('click', () => {
    muteVolume();
})

// Update progress area time and display block on mouse move
progressArea.addEventListener('mousemove', (e) => {
    let progressWidthval = progressArea.clientWidth;
    let x = e.offsetX;
    progressAreaTime.style.setProperty('--x', `${x}px`);
    progressAreaTime.style.display = "block";
    let videoDuration = mainVideo.duration;
    let progressTime = Math.floor((x / progressWidthval) * videoDuration);
    let currentMin = Math.floor(progressTime / 60);
    let currentSec = Math.floor(progressTime % 60);
    // if seconds are less then 10 then add 0 at the begning
    currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
    progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;

})

progressArea.addEventListener('mouseleave', () => {
    progressAreaTime.style.display = "none";
})

mainVideo.addEventListener("ended", () => {

    play_pause.innerHTML = "replay";
    play_pause.title = "Replay";

});

// Full screen function

fullscreen.addEventListener('click',()=>{
    if (!video_player.classList.contains('openFullScreen')) {
        video_player.classList.add('openFullScreen');
        fullscreen.innerHTML = "fullscreen_exit";
        video_player.requestFullscreen();
    }else{
        video_player.classList.remove('openFullScreen');
        fullscreen.innerHTML = "fullscreen";
        document.exitFullscreen();
    }
});