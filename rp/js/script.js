$(window).on('load', function(event) {
	$('body').removeClass('preloading');
	// $('.load').delay(1000).fadeOut('fast');
	$('.loader').delay(1000).fadeOut('fast');
});
// Popup open
function popupOpen() {
  
if ($("#hoten").val() == ""){
	$("#hoten").css('box-shadow', '3px 0px red');

} else if ($("#Reason").val() == ""){
	$("#Reason").css('box-shadow', '3px 0px red');  }
	else if ($("#day-w").val() == ""){
	$("#day-w").css('box-shadow', '3px 0px red');  }
	else





{
	$("#hoten").css('box-shadow', 'none');
	$("#Reason").css('box-shadow', 'none');
	$("#day-w").css('box-shadow', 'none');
document.getElementById("popup").style.display = "block";
document.getElementById("loader").style.display = "block";
const rocks = who => {
  document.getElementById("loader").style.display = "none";
};
setTimeout(rocks, 2 * 1000, 'Node.js');
document.getElementById("overlay").style.display = "block";

  }
}




  
// Popup Close
  
function popupClose() {
  
document.getElementById("popup").style.display = "none";
  
document.getElementById("overlay").style.display = "none";
  
}


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



function buttonLoad(e) {
    e = $(e);
    e.text("");
    e.children().remove();
    e.append("<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>");
}




$(window).on('load', function(event) {
  $('body').removeClass('preloading');
  // $('.load').delay(1000).fadeOut('fast');
  $('.loader').delay(1000).fadeOut('fast');
});









  // dấu phân cách cho đơn vị tiền tệ


(function($, undefined) {

  "use strict";

  // When ready.
  $(function() {
    
    var $form = $( ".group2" );
    var $input = $form.find( "input" );

    $input.on( "keyup", function( event ) {
      
      
      // When user select text in the document, also abort.
      var selection = window.getSelection().toString();
      if ( selection !== '' ) {
        return;
      }
      
      // When the arrow keys are pressed, abort.
      if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
        return;
      }
     
      
      var $this = $( this );
      
      // Get the value.
      var input = $this.val();
      
      var input = input.replace(/[\D\s\._\-]+/g, "");
          input = input ? parseInt( input, 10 ) : 0;

          $this.val( function() {
            return ( input === 0 ) ? "" : input.toLocaleString( "VI" );
          } );

    } );
    
    /**
     * ==================================
     * When Form Submitted
     * ==================================
     */
    $form.on( "submit", function( event ) {
      
      var $this = $( this );
      var arr = $this.serializeArray();
    
      for (var i = 0; i < arr.length; i++) {
          arr[i].value = arr[i].value.replace(/[]+/g, ''); // Sanitize the values.
      };
      
      console.log( arr );
      
      event.preventDefault();
    });
    
  });
})(jQuery);