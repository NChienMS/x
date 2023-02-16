/*
* countdown script
*/

"use strict";

function cdtime(container, targetdate){
if (!document.getElementById || !document.getElementById(container)) return
this.container=document.getElementById(container)
this.currentTime=new Date()
this.targetdate=new Date(targetdate)
this.timesup=false
this.updateTime()
}

cdtime.prototype.updateTime=function(){
var thisobj=this
this.currentTime.setSeconds(this.currentTime.getSeconds()+1)
setTimeout(function(){thisobj.updateTime()}, 1000) //update time every second
}

cdtime.prototype.displaycountdown=function(baseunit, functionref){
this.baseunit=baseunit
this.formatresults=functionref
this.showresults()
}

cdtime.prototype.showresults=function(){
var thisobj=this


var timediff=(this.targetdate-this.currentTime)/1000 //difference btw target date and current date, in seconds

if (timediff<0){ //if time is up
this.timesup=true
this.container.innerHTML=this.formatresults()
return
}
var oneMinute=60 //minute unit in seconds
var oneHour=60*60 //hour unit in seconds
var oneDay=60*60*24 //day unit in seconds
var dayfield=Math.floor(timediff/oneDay)
var hourfield=Math.floor((timediff-dayfield*oneDay)/oneHour)
var minutefield=Math.floor((timediff-dayfield*oneDay-hourfield*oneHour)/oneMinute)
var secondfield=Math.floor((timediff-dayfield*oneDay-hourfield*oneHour-minutefield*oneMinute))
if (this.baseunit=="hours"){ //if base unit is hours, set "hourfield" to be topmost level
hourfield=dayfield*24+hourfield
dayfield="n/a"
}
else if (this.baseunit=="minutes"){ //if base unit is minutes, set "minutefield" to be topmost level
minutefield=dayfield*24*60+hourfield*60+minutefield
dayfield=hourfield="n/a"
}
else if (this.baseunit=="seconds"){ //if base unit is seconds, set "secondfield" to be topmost level
var secondfield=timediff
dayfield=hourfield=minutefield="n/a"
}
this.container.innerHTML=this.formatresults(dayfield, hourfield, minutefield, secondfield)
setTimeout(function(){thisobj.showresults()}, 1000) //update results every second
}



function formatresults(){
if (this.timesup==false){//if target date/time not yet met;

	//adding extra 0 before the time value;
	if(arguments[0] < 10) {
		arguments[0] = '0' + arguments[0];
	}
	if(arguments[1] < 10) {
		arguments[1] = '0' + arguments[1];
	}
	if(arguments[2] < 10) {
		arguments[2] = '0' + arguments[2];
	}
	if(arguments[3] < 10) {
		arguments[3] = '0' + arguments[3];
	}

var displaystring = '<li class="days"> '+ arguments[0] +' <br> days </li> <li class="hours"> '+ arguments[1] +' <br> hours </li> <li class="minutes"> '+ arguments[2] +' <br> minutes </li> <li class="seconds"> '+ arguments[3] +' <br> seconds </li> ';


}
else{ //else if target date/time met
var displaystring="<h2>The Party is Over!!</h2>";

}
return displaystring;
}