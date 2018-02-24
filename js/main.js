var sessionLength=25;
var breakLength = 5;
var bool = false;
function minToMilliSec(min) {
    var sec = min * 60;
    sec = sec * 1000;
    return sec;
}

function milliSecTomin(milliSec) {
    var sec = milliSec / 1000;
    var min = parseInt("" + (sec / 60));
    sec = sec - min * 60 ;
    sec = parseInt("" + sec);
  //  console.log((""+sec).length);
    if (("" + sec).length === 1) sec = "0"+sec;
    if (("" + min).length === 1) min = "0" + min;
    return "" + min + ":" + sec;

}
function display() {
    $("#break").text(breakLength);
    $("#session").text(sessionLength);
}
function main() {
    display();
    $("#breakminus").click(function () {
        var i = 1;
        setTimeout(function() { console.log(i);i++ }, 100);
        if (breakLength > 0) { breakLength--; }
        display();
    });
    $("#breakplus").click(function () {
        breakLength++;
        display();
    });
    $("#sessionminus").click(function () {
        if (sessionLength > 0) { sessionLength--; }
        display();
    });
    $("#sessionplus").click(function () {
        sessionLength++;
        display();
    });
    var sessionTimer=function(){};
    stopSession= function(){
        clearInterval(sessionTimer);
        breakTimer();
    };
    startSession = function() {
        sessionMilliSecs = minToMilliSec(sessionLength);
        $("#status").text("Session ");
        sessionTimer=setInterval(function() {
                sessionMilliSecs = sessionMilliSecs - 1000;
                var siddu = milliSecTomin(sessionMilliSecs);
                if(sessionMilliSecs<0){
                    console.log("fuck"+sessionMilliSecs);
                    stopSession();
                }
                $("#time").text(siddu);
                console.log("xx"+sessionMilliSecs);
        }, 1000);
        

    };


    $("#clock").click(function() {
        if (bool === false) {
           var sessionMilliSecs = minToMilliSec(sessionLength);

            //stopSession();
            startSession();
            bool = true;
        } else {

            bool = false;
        }
    });
    var breakInterval;
    function stopBreak() {
        clearInterval(breakInterval);
        startSession();
    }
    function breakTimer(){
        $("#status").text("BREAK!!! go take a break");
        var breakMilliSecs = minToMilliSec(breakLength);
        console.log("bbb"+breakMilliSecs);
        breakInterval= setInterval(function() {
            breakMilliSecs= breakMilliSecs- 1000;
            var sidduu = milliSecTomin(breakMilliSecs);
            if (breakMilliSecs < 0) {
              //  console.log("fuck" + sessionMilliSecs);
                stopBreak();
            }
            $("#time").text(sidduu);


            console.log("xx"+sidduu+"br"+breakMilliSecs);

        }, 1000);

    }

}
$(document).ready(main);