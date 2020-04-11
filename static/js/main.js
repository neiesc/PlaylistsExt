var player,
  currentVideoId = 0;
var videoIDs = [];

function onYouTubePlayerAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: null,
    events: {
      onStateChange: onPlayStateChange,
    },
  });
}

function onPlayStateChange(event) {
  if (event.data === 0) {
    console.log("done", videoIDs[currentVideoId]);
    currentVideoId++;
    if (currentVideoId < videoIDs.length) {
      player.loadVideoById(videoIDs[currentVideoId]);
    }
  }
}

/* Controls */
function addVideoID() {
  var el = document.getElementById("videoID");
  if (el.value != "") {
    const apiKey = "AIzaSyBnQHY8ixR1H9rn8OdbM1O9KUFuCXxMZ6Q";
    const video_url = `https://www.googleapis.com/youtube/v3/videos?id=${el.value}&part=snippet,contentDetails&key=${apiKey}&part=snippet`;
    $.ajax({
      url: video_url,
      dataType: "jsonp",
      success: function (data) {
        console.log(data);
        var video_title = data.items[0].snippet.title;

        let duration = data.items[0].contentDetails.duration;
        duration = convertDuretion(duration);

        videoIDs.push(el.value);
        let videoLists = document.getElementById("videoLists");
        let totalDuration = document.getElementById("totalDuration");

        var btn_remove =
          '<a class="uk-button btn_remover" title="Remove" onclick="btnRemove(this,\'' +
          el.value +
          '\')" ><i class="uk-icon-remove"></i></a>';

        videoLists.innerHTML +=
          `<li>${video_title} (${el.value}) 
            - ${padLeft(duration.hours, 2)}:${padLeft(duration.minutes, 2)}:${padLeft(duration.seconds, 2)}
            ${btn_remove}
          </li>`;

        totalDurationNew = parseInt(totalDuration.dataset.totalDuration, 10) + duration.totalseconds;
        totalDuration.innerHTML = `Total Seconds: ${totalDurationNew}`;
        totalDuration.dataset.totalDuration = totalDurationNew;
        el.value = "";
        document.getElementById("addVideoID").focus();
      },
      error: function (err) {
        alert(err);
      },
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
  } else {
    currentVideoId = 0;
  }
}
var el = document.getElementById("prev");
el.addEventListener("click", prev, false);

function next() {
  currentVideoId++;
  if (currentVideoId < videoIDs.length) {
    player.loadVideoById(videoIDs[currentVideoId]);
  } else {
    currentVideoId--;
  }
}
var el = document.getElementById("next");
el.addEventListener("click", next, false);

function btnRemove(element, video_id) {
  var index = videoIDs.indexOf(video_id);
  if (index > -1) {
    videoIDs.splice(index, 1);
    $(element).parent().remove();
  }
}

function convertDuretion(input) {
  var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  var hours = 0,
    minutes = 0,
    seconds = 0,
    totalseconds;

  if (reptms.test(input)) {
    var matches = reptms.exec(input);
    if (matches[1]) hours = Number(matches[1]);
    if (matches[2]) minutes = Number(matches[2]);
    if (matches[3]) seconds = Number(matches[3]);
    totalseconds = hours * 3600 + minutes * 60 + seconds;
  }

  return { hours, minutes, seconds, totalseconds};
}

function padLeft(nr, n, str){
  return Array(n-String(nr).length+1).join(str||'0')+nr;
}