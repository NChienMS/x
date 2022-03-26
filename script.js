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
