
function showCoords(event) {
    var xTimeline = event.clientX;
    var yTimeline = event.clientY;
    var coor = "X coords: " + xTimeline + ", Y coords: " + yTimeline;
    document.getElementById("tti").innerHTML = coor;
}

function clearCoor() {
    document.getElementById("tti").innerHTML = "";
}

$(document).ready(function () {
    //Territory position logic
    var timeblock = $(".timestamps").outerWidth();
    var workTime = timeblock * 10;
    $(".wHours").css({
        "width": workTime
    });
    $(".wHours.uk").css({
        "left": timeblock * 9
    });
    $(".wHours.ukr").css({
        "left": (timeblock * 7) - 7
    });
    $(".wHours.de").css({
        "left": (timeblock * 8) - 7
    });
    $(".wHours.au").css({
        "left": (timeblock * 19) - 3
    });
    $(".wHours.hksg").css({
        "left": (timeblock * 7) - 8
    });
    $(".wHours.uae").css({
        "left": (timeblock * 13) + 14
    });
    var i = 0;
    $(".timestamps").each(function () {
        i++
    });

    var currentTimeLine = function () {
        var currentDate = new Date();
        var currentHour = currentDate.getHours();
        var currentMinutes = currentDate.getMinutes();
        var cHpx = currentHour * 60;
        var cMpx = currentMinutes;
        var cMcv = (cHpx + cMpx) / 60;
        var tLWidth = $(".timeline").outerWidth();
        var hourWidth = (tLWidth / 24);
        var linePos = cMcv * hourWidth;

        $(".curtline").css({
            "left":  linePos
        });

        console.log(currentHour);
        console.log(currentMinutes);
        console.log(tLWidth);
        console.log(cHpx);
        console.log(cMpx);
        console.log(cMcv);
    }
    currentTimeLine();

    $(".timeline").mousemove(function () {
        //var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
        //var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
        var xClient = event.clientX;
        var yClient = event.clientY;
        $(".trackline").css({
            "left": xClient
        });
        $(".timeline-info").css({
            "left": (xClient - 210),
            "top": (yClient + 5)
        });
    });

    $(".stamplines").mousemove(function () {
        var currentLine = $(this).text();
        var currentDate = new Date();
        var cM = currentDate.getMinutes();
        var cMString = cM.toString();
        if (cMString.length < 2) {
            cM = "0" + cM;
        }
        var a = parseInt(currentLine);
        var b = a + 11;
        if (b >= 24) {
            var overlapTime = b - 24;
            b = overlapTime;
            $(".currentTime.au").text("AU - 0" + b + ":" + cM);
        } else {
            $(".currentTime.au").text("AU - " + (a + 11) + ":" + cM);
        }
        $(".currentTime.uk").text("UK - " + a + ":" + cM);
        $(".currentTime.ukr").text("UKR - " + (a + 2) + ":" + cM);
        $(".currentTime.de").text("DE - " + (a + 1) + ":" + cM);

        $(".currentTime.hksg").text("HK/SG - " + (a + 2) + ":" + cM);
        $(".currentTime.uae").text("UAE - " + (a + 4) + ":" + cM);

    });

    //Animation/Interaction logic
    $(".stamplines").hover(function () {
            $(".timeline-info").css({
                "opacity": "1"
            });
        },
        function () {
            $(".timeline-info").css({
                "opacity": "0"
            });
        });

    $(".zone-item, .stamplines").hover(function () {
        $(this).addClass("hover")
    }, function () {
        $(this).removeClass("hover")
    });

    var currentTime = new Date();

    var getTimezones = function (timeDiff) {
        var currentDate = new Date();
        var currentHour = currentDate.getHours() + timeDiff;
        var currentMinutes = currentDate.getMinutes();
        var cMString = currentMinutes.toString();
        var cHString = currentHour.toString();

        if (cMString.length < 2) {
            currentMinutes = "0" + currentMinutes;
        }

        if (currentHour >= 24) {
            var overlapTime = currentHour - 24;
            currentHour = overlapTime;
            cHString = currentHour.toString();
            if (cHString.length < 2) {
                var currentTime = "0" + currentHour + ":" + currentMinutes;
            } else {
                var currentTime = "" + currentHour + ":" + currentMinutes;
            }
        } else {
            var currentTime = "" + currentHour + ":" + currentMinutes;
        }
        $(".current-item").html(currentTime);
    }

    $(".zone-item").click(function () {
        var timezone = $(this).text();
        console.log(timezone);
        switch (timezone) {
            case "UK":
                getTimezones((0));
                break;
            case "AU":
                getTimezones((11));
                break;
            case "HK/SG":
                getTimezones((2));
                break;
            case "UAE":
                getTimezones((4));
                break;
            case "DE":
                getTimezones((1));
                break;
            case "UKR":
                getTimezones((2));
                break;
        }
    });

});