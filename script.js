
const toggle = document.querySelector(".toggle__theme");
const card = document.querySelector(".app");
toggle.addEventListener("click", () => {
    let theme = toggle.querySelector(".fas");
    if (theme.classList.contains("fa-moon")) {
        theme.classList.remove("fa-moon");
        theme.classList.add("fa-sun");
        card.classList.add("dark");
    } else {

        theme.classList.remove("fa-sun");
        theme.classList.add("fa-moon");
        card.classList.remove("dark");

    }
})
var YWPParams =
{
autoplay: true
}
//coppy nội dung và hiện thông báo
  function myFunction() {
    var copyText = document.getElementById("myInput");
    var input=document.createElement("INPUT");
    document.body.appendChild(input);
    input.value=copyText.innerHTML;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert('Mb Bank | 041 014 862 8888\n ______\n"Copy thành công", Gửi nhiều tiền vào nhé');
    document.body.removeChild(input);
    var tooltip = document.getElementById("myTooltip");
    tooltip.style.display='block';
    tooltip.innerHTML = "Đã copy";

  }

  function myFunction2() {
    var copyText = document.getElementById("myInput2");
    var input=document.createElement("INPUT");
    document.body.appendChild(input);
    input.value=copyText.innerHTML;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert('Vietcombank | 102 055 3977\n ______\n"Copy thành công", Gửi nhiều tiền vào nhé');
    document.body.removeChild(input);
    var tooltip = document.getElementById("myTooltip");
    tooltip.style.display='block';
    tooltip.innerHTML = "Đã copy";

  }


    
  
//in thông báo khi nhấn copy



//Chống copy
function killCopy(e){
    return false;
}

function reEnable(){
    return true;
}

document.onselectstart=new Function ("return false");

if (window.sidebar){
    document.onmousedown=killCopy;
    document.onclick=reEnable;
}

function noteOut()
{
    var note = document.querySelector(".note");
    note.style.display = "none";
}


setInterval(noteOut,3000);

//Chống chuột phải 
window.onload = function() {
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    }, false);
    document.addEventListener("keydown", function(e) {
        //document.onkeydown = function(e) {
        // "I" key
        if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
            disabledEvent(e);
        }
        // "J" key
        if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
            disabledEvent(e);
        }
        // "S" key + macOS
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            disabledEvent(e);
        }
        // "U" key
        if (e.ctrlKey && e.keyCode == 85) {
            disabledEvent(e);
        }
        // "F12" key
        if (event.keyCode == 123) {
            disabledEvent(e);
        }
    }, false);

    function disabledEvent(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else if (window.event) {
            window.event.cancelBubble = true;
        }
        e.preventDefault();
        return false;
    }
};

//Chống Ctrl + U
document.onkeydown = function(e) {
    if (e.ctrlKey && 
        (e.keyCode === 67 || 
         e.keyCode === 86 || 
         e.keyCode === 85 || 
         e.keyCode === 117)) {
        return false;
    } else {
        return true;
    }
};
$(document).keypress("u",function(e) {
    if(e.ctrlKey) return false;
    else return true;
});
const list = document.querySelectorAll('b')
var index = 0

setInterval((e) => {
  list.forEach((e) => {
    e.classList.remove('change-properties')
  })
  list[index].classList.add('change-properties')
  index++
  if (index == list.length) {
    index = 0
  }
}, 200)



/*
ấn bất kỳ trên web sẽ phát nhạc ==================
document.addEventListener('click', musicPlay);
function musicPlay() {
    document.getElementById('hihi').play();
    document.removeEventListener('click', musicPlay);
}
*/


$(document).ready(function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'music/Everything_At_Once_Lenka.mp3');
    
    audioElement.addEventListener('ended', function() {
        this.play();
    }, false);
    
    
   
    
    
    
    $('#pause').click(function() {
        audioElement.pause();
        $("#status").text("Status: Paused");
    });
    
    $('#restart').click(function() {
        audioElement.currentTime = 0;
    });
});


/* ========*/
var player = document.getElementById('player__source'),
        playLoading = document.querySelectorAll('.player__loading span'),
        playPause = document.getElementById('playPause'),
        playPause2 = document.getElementById('play'),
        currentTime = document.getElementById('currentTime'),
        seek = document.getElementById('seek'),
        durationTime = document.getElementById('durationTime'),
        muted = document.getElementById('muted'),
        timeInterval,
        i, 
        len = playLoading.length;

window.onload = function() {
    playPause.addEventListener('click', playPauseMusic, false);
    playPause2.addEventListener('click', playPauseMusic2, false);
    muted.addEventListener('click', mutedMusic, false);
    player.addEventListener('ended', endedMusic, false);
};

// Play and Pause Music
function playPauseMusic() {
    var i, len = playLoading.length;
    if (player.paused) {
        player.play();
        $("#status").text("Bạn đang nghe bài hát: Everything At Once Lenka");
        timeInterval = setInterval(timeUpdateMusic, 100);
        seek.addEventListener('change', seekMusic, false);
        playPause.classList.remove('icon-play');
        playPause.classList.add('icon-pause');
        for (i = 0; i < len; i++) {
            playLoading[i].classList.add('active');
        }
    } else {
        player.pause();
        $("#status").text("Ơ kìa sao lại dừng rồi.");
        clearInterval(timeInterval);
        playPause.classList.remove('icon-pause');
        playPause.classList.add('icon-play');
        for (i = 0; i < len; i++) {
            playLoading[i].classList.remove('active');
        }
    }

}
function playPauseMusic2() {
    var i, len = playLoading.length;
    if (player.paused) {
        player.play();
        $("#status").text("Bạn đang nghe bài hát: Everything At Once Lenka");
        timeInterval = setInterval(timeUpdateMusic, 100);
        seek.addEventListener('change', seekMusic, false);
        playPause.classList.remove('icon-play');
        playPause.classList.add('icon-pause');
        for (i = 0; i < len; i++) {
            playLoading[i].classList.add('active');
        }
    } else {
        player.pause();
        $("#status").text("Ơ kìa sao lại dừng rồi.");
        clearInterval(timeInterval);
        playPause.classList.remove('icon-pause');
        playPause.classList.add('icon-play');
        for (i = 0; i < len; i++) {
            playLoading[i].classList.remove('active');
        }
    }

}

// Seek Music
function seekMusic() {
    player.currentTime = seek.value;
}

// Muted Music
function mutedMusic() {
    if (player.muted) {
        player.muted = false;
        muted.classList.remove('icon-volume-mute');
        muted.classList.add('icon-volume-high');
    } else {
        player.muted = true;
        muted.classList.remove('icon-volume-high');
        muted.classList.add('icon-volume-mute');
    }
}

// Time Update
function timeUpdateMusic() {
    durationTime.innerHTML = secondToMinutes(player.duration);
    currentTime.innerHTML = secondToMinutes(player.currentTime);
    seek.max = player.duration;
    seek.value = player.currentTime;
}

// Convert Seconds to Minutes
function secondToMinutes(seconds) {
    var numMinutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60),
            numSeconds = (((seconds % 3153600) % 86400) % 3600) % 60;

    numMinutes = numMinutes >= 10 ? numMinutes : ('0' + numMinutes);
                
    if (numSeconds >= 10) {
        return numMinutes + ':' + Math.round(numSeconds);
    } else {
        return numMinutes + ':0' + Math.round(numSeconds);
    }
}

// Ended Music
function endedMusic() {
    player.pause();
    player.currentTime = 0;
    playPause.classList.remove('icon-pause');
    playPause.classList.add('icon-play');
    for (i = 0; i < len; i++) {
        playLoading[i].classList.remove('active');
    }
}

// loadding âm nhạ

