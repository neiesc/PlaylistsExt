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
  event.target.playVideo();
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
    var video_url = "http://gdata.youtube.com/feeds/api/videos/" + el.value + "?v=2&alt=jsonc"; 
    $.getJSON(video_url, function(data) {
      var video_title = data.data.title;
      videoIDs.push(el.value);
      var videoLists = document.getElementById("videoLists");

      var btn_remove = '<a class="uk-button btn_remover" title="Remove" onclick="btnRemove(this,\'' + el.value + '\')" ><i class="uk-icon-remove"></i></a>';

      videoLists.innerHTML += '<li>' + video_title + ' (' + el.value + ')' + btn_remove + '</li>';
      
      el.value = "";
      document.getElementById("addVideoID").focus();
    });
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

function btnRemove(element, video_id){
  var index = videoIDs.indexOf(video_id);
  if (index > -1) {
    videoIDs.splice(index, 1);
    $(element).parent().remove();
  }
}
