var player, currentVideoId = 0;
var videoIDs = [];

function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: null,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayStateChange
    }
  });
}

function onPlayerReady(event) {
  console.log(event);
  //event.target.playVideo();
}

function onPlayStateChange(event) {
  if (event.data === 0) {
    console.log('done', videoIDs[currentVideoId]);
    currentVideoId++;
    if (currentVideoId < videoIDs.length)
    {
        player.loadVideoById(videoIDs[currentVideoId]);
    }
  }
}

/* Controls */
function addVideoID() {
  var el = document.getElementById("videoID");
  if (el.value != '') {
    console.log('add', el.value);
    videoIDs.push(el.value);

    var videoLists = document.getElementById("videoLists");
    videoLists.innerHTML += '<li>' +  el.value + '</li>';

    el.value = "";
    document.getElementById("addVideoID").focus();
  }
}
var el = document.getElementById("addVideoID");
el.addEventListener("click", addVideoID, false);

function playAll() {
  currentVideoId = 0;
  player.loadVideoById(videoIDs[currentVideoId]);
}
var el = document.getElementById("playAll");
el.addEventListener("click", playAll, false);

function removeAll() {
  videoIDs.length = 0;
  
  var videoLists = document.getElementById("videoLists");
  videoLists.innerHTML = "";
}
var el = document.getElementById("removeAll");
el.addEventListener("click", removeAll, false);

function prev() {
  currentVideoId--;
  if (currentVideoId > 0) {
    player.loadVideoById(videoIDs[currentVideoId]);
  }
  else
  {
    currentVideoId = 0;
  }
}
var el = document.getElementById("prev");
el.addEventListener("click", prev, false);

function next() {
  currentVideoId++;
  if (currentVideoId < videoIDs.length) {
    player.loadVideoById(videoIDs[currentVideoId]);
  }
  else
  {
    currentVideoId--;
  }
}
var el = document.getElementById("next");
el.addEventListener("click", next, false);