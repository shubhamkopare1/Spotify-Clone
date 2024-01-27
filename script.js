let songs;
songs = [
  "infinity.mp3",
  "baby.mp3",
  "down slowly.mp3",
  "jeremy black.mp3",
  "mood.mp3",
  "Lat Lag gai.mp3",
  "night changes.mp3",
  "senoritas .mp3",
  "Mast Magan.mp3",
  "Pee Loon.mp3",
  "OMahi.mp3",
  "satranga.mp3",
];

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return ` ${formattedMinutes}:${formattedSeconds}`;
}
var currentSong = new Audio();

const playMusic = (track, pause = false) => {
  currentSong.src = track;
  if (!pause) {
    currentSong.play();
    play.src = "pause.svg";
  }

  // Rest of the code remains unchanged

  document.querySelector(".songinfo").innerHTML = track;
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

playMusic(songs[0], true);

let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
for (let song of songs) {
  songUL.innerHTML =
    songUL.innerHTML +
    ` <li> 
    <img class="invert" src="music.svg" alt="" />
    <div class="info">
      <div class="font">${song}</div>
      <div class="font">Shubham</div>
    </div>
    <div class="playnow">
      <span>Play Now</span>
      <img class="invert" src="play.svg" alt="" />
    </div>
    
     </li>`;
}

Array.from(
  document.querySelector(".songlist").getElementsByTagName("li")
).forEach((e) => {
  e.addEventListener("click", (element) => {
    console.log(e.querySelector(".info").firstElementChild.innerHTML);
    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
  });
});

//attach and event listener to play next and previous

play.addEventListener("click", () => {
  if (currentSong.paused) {
    currentSong.play();
    play.src = "pause.svg";
  } else {
    currentSong.pause();
    play.src = "play.svg";
  }
});

//listen for tineupdate event

currentSong.addEventListener("timeupdate", () => {
  console.log(currentSong.currentTime, currentSong.duration);
  document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(
    currentSong.currentTime
  )} / ${secondsToMinutesSeconds(currentSong.duration)}`;
  document.querySelector(".circle").style.left =
    (currentSong.currentTime / currentSong.duration) * 100 + "%";
});

//add an event listner  to seekbar
document.querySelector(".seekbar").addEventListener("click", (e) => {
  let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
  document.querySelector(".circle").style.left = percent + "%";
  currentSong.currentTime = (currentSong.duration * percent) / 100;
});

// add event listener for handburger
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".left").style.left = "0";
});

// add event listener for close button
document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".left").style.left = "-120%";
});

// Initialize currentSongIndex
let currentSongIndex = 0;

// add event listener to previous
previous.addEventListener("click", () => {
  currentSong.pause();
  console.log("Previous clicked");

  // Decrement the currentSongIndex
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;

  playMusic(songs[currentSongIndex]);
});

// add event listener to next
next.addEventListener("click", () => {
  currentSong.pause();
  console.log("Next clicked");

  // Increment the currentSongIndex
  currentSongIndex = (currentSongIndex + 1) % songs.length;

  playMusic(songs[currentSongIndex]);
});

//add an event to volume
// document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
//   console.log(e);
// })
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("volumeInput").addEventListener("input", (e) => {
    console.log("setting volume to", e.target.value, "/ 100");
    currentSong.volume = parseInt(e.target.value) / 100;
    if (currentSong.volume > 0) {
      document.querySelector(".volume>img").src = document
        .querySelector(".volume>img")
        .src.replace("mute.svg", "volume.svg");
    }
    // Perform actions based on the input value
  });
});

// Assuming you have already created the playlists array as mentioned before
const playlists = [
  {
    name: "Happy Hits",
    songs: [
      "Rockstar.mp3",
      "sarkar.mp3",
      "senoritas .mp3",
      "jeremy black.mp3",
      "mood.mp3",
      "night changes.mp3",

      // Add more songs as needed
    ],
  },
  {
    songs: [
      "mood.mp3",
      "Lat Lag gai.mp3",
      "OMahi.mp3",
      "Pee Loon.mp3",
      "senoritas .mp3",
      "jeremy black.mp3",
    ],
  },
  {
    songs: [
      "Mast Magan.mp3",
      "Pee Loon.mp3",
      "OMahi.mp3",
      "satranga.mp3",
      "Lat Lag gai.mp3",
      "senoritas .mp3",
      "jeremy black.mp3",
      "mood.mp3",
      "night changes.mp3",
    ],
  },
  {
    songs: ["Pee Loon.mp3", "OMahi.mp3", "satranga.mp3", "senoritas .mp3"],
  },
  {
    songs: [
      "Satranga.mp3",
      "senoritas .mp3",
      "OMahi.mp3",
      "satranga.mp3",
      "Lat Lag gai.mp3",
      "senoritas .mp3",
    ],
  },

  // Add more playlists as needed
];

// Add an event listener to each existing card
Array.from(document.querySelectorAll(".card")).forEach((card, index) => {
  card.addEventListener("click", () => {
    // Clear the existing songs
    songUL.innerHTML = "";

    // Load songs from the selected playlist
    for (let song of playlists[index].songs) {
      songUL.innerHTML += `
        <li>
          <!-- ... (existing code for the song) ... -->
          <div class="info">
            <div class="font">${song}</div>
            <div class="font">Shubham</div>
          </div>
          <div class="playnow" onclick="playMusic('${song}')">
            <span>Play Now</span>
            <img class="invert" src="play.svg" alt="" />
          </div>
        </li>`;
    }

    // Play the first song in the playlist
    playMusic(playlists[index].songs[0], true);
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });
});

//add event listenermute the track
document.querySelector(".volume>img").addEventListener("click", (e) => {
  const volumeIcon = document.querySelector(".volume>img");
  const volumeInput = document.getElementById("volumeInput");

  if (volumeIcon.src.includes("volume.svg")) {
    volumeIcon.src = volumeIcon.src.replace("volume.svg", "mute.svg");
    currentSong.volume = 0;
    volumeInput.value = 0;
  } else {
    volumeIcon.src = volumeIcon.src.replace("mute.svg", "volume.svg");
    currentSong.volume = 0.1;
    volumeInput.value = 0.1 * 100; // Setting the volume input value to 10 (assuming the range is 0 to 100)
  }

  // Trigger a click event on the volume input to update its value
  volumeInput.dispatchEvent(new Event("input"));
});
