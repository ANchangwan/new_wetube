const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime")

let volumeValue = 0.5;

video.volume = volumeValue;

const handlePlayClick = (e) =>{
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    playBtn.video.paused ? "Play" : "Pause";
}

const handlePause = () => (playBtn.innerText = "Play");
const handlePlay = () => (playBtn.innerText = "Pause");

const handleMute = (e) =>{
    if(video.muted){
        video.muted = false;
       
    }else{
        video.muted = true;

    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : 0.5;
}

const handleVolumeChange = (event) =>{
    const {target:{value}} = event;
    video.volume = value;
    if (video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;
}

const handleLoadedMetadata = () =>{
    totalTime.innerText = Math.floor(video.duration);
};

const handdleTimeUpdate = () =>{
    currenTime.innerText = Math.floor(video.currentTime);
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handdleTimeUpdate);


if (video.readyState === 4) {
    handleLoadedMetadata();
    }