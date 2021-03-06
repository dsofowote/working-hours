$(document).ready(function () {

    //Initial transitions
    var transistions = function() {
        $(".pre-transit-f").addClass("transit-f");
        $(".pre-transit-p").addClass("transit-p");

        $(".pre-transit-f").removeClass("pre-transit-f");
        $(".pre-transit-p").removeClass("pre-transit-p");


    };

    transistions();
    
    var timelineFunctions = function () {
        //Position logic
        var tLOffset = $(".timeline-overlay").offset();
        console.log("tloffest - " + tLOffset.top + "");
        $(".working-container").css({
            "top": "386px"
        });

        //Territory position logic
        var timeblock = $(".timestamps").outerWidth();
        var workTime = timeblock * 9.5;
        var workTimeUkr = timeblock * 11;
        var workTimeDe = timeblock * 9;
        $(".wHours").css({
            "width": workTime
        });
        $(".wHours.ukr").css({
            "width": workTimeUkr
        });
        $(".wHours.de").css({
            "width": workTimeDe
        });
        $(".wHours.uk").css({
            "left": timeblock * 8.5
        });
        $(".wHours.ukr").css({
            "left": (timeblock * 6)
        });
        $(".wHours.de").css({
            "left": (timeblock * 8)
        });
        $(".wHours.au").css({
            "left": (timeblock * 21.5)
        });
        $(".wHours.au2").css({
            "left": (timeblock * -4.5)
        });
        $(".wHours.hksg").css({
            "left": (timeblock * 16.5)
        });
        $(".wHours.hksg2").css({
            "left": (timeblock * -7.5)
        });
        $(".wHours.uae").css({
            "left": (timeblock * 4.5)
        });

        //Set back to 00:00 when hour passes 24
        var checkOverlap = function (cTime) {
            if (cTime >= 24) {
                var overlapTime = cTime - 24;
                cTime = overlapTime;
                var cHString = cTime.toString();
                if (cHString.length < 2) {
                    cTime = "0" + cTime;
                }
            }
            return cTime;
        };

        //Set position and time for current time in UK plus timezone conversions
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
            var infoWidth = $(".current-info").outerWidth();

            $(".curtline").css({
                "left": linePos
            });

            $(".current-info").css({
                "left": linePos
            });

            var currentLine = $(this).text();
            var cMString = cMpx.toString();
            if (cMString.length < 2) {
                cMpx = "0" + cMpx;
            }
            var a = parseInt(currentHour);

            $(".currentTime.uk").text("UK - " + checkOverlap((a)) + ":" + cMpx);
            $(".currentTime.ukr").text("UKR - " + checkOverlap((a + 2)) + ":" + cMpx);
            $(".currentTime.de").text("DE - " + checkOverlap((a + 1)) + ":" + cMpx);
            $(".currentTime.au").text("AU - " + checkOverlap((a + 11)) + ":" + cMpx);
            $(".currentTime.hksg").text("HK/SG - " + checkOverlap((a + 8)) + ":" + cMpx);
            $(".currentTime.uae").text("UAE - " + checkOverlap((a + 4)) + ":" + cMpx);
        };
        currentTimeLine();

        //Control tracking line based on mouse movement
        $(".timeline").mousemove(function (event) {
            var xClient = event.clientX;
            var yClient = event.clientY;
            $(".trackline").css({
                "left": xClient
            });
            $(".timeline-info").css({
                "left": (xClient - 210)
            });
        });

        //Simple Parallax Effect
        $(".timeline").mousemove(function (event) {
            var xClient = event.clientX;
            var yClient = event.clientY;
            $(".parallax").css({
                "left": xClient * 0.15
            });
        });

        //Control hours displayed based on user's position on timeline
        $(".stamplines").mousemove(function (event) {
            var currentLine = $(this).text();
            var currentDate = new Date();
            var cM = currentDate.getMinutes();
            var cMString = cM.toString();
            if (cMString.length < 2) {
                cM = "0" + cM;
            }
            var a = parseInt(currentLine);

            $(".selectTime.uk").text("UK - " + checkOverlap((a)) + ":" + cM);
            $(".selectTime.ukr").text("UKR - " + checkOverlap((a + 2)) + ":" + cM);
            $(".selectTime.de").text("DE - " + checkOverlap((a + 1)) + ":" + cM);
            $(".selectTime.au").text("AU - " + checkOverlap((a + 11)) + ":" + cM);
            $(".selectTime.hksg").text("HK/SG - " + checkOverlap((a + 8)) + ":" + cM);
            $(".selectTime.uae").text("UAE - " + checkOverlap((a + 4)) + ":" + cM);
        });

        //Animation/Interaction logic
        $(".timeline").hover(function (event) {
                $(".timeline-info").css({
                    "opacity": "1"
                });
                $(".timeline-info").addClass("hover");
            },
            function () {
                $(".timeline-info").css({
                    "opacity": "0"
                });
                $(".timeline-info").removeClass("hover");
            });

        $(".zone-item, .stamplines").hover(function () {
            $(this).addClass("hover");
        }, function () {
            $(this).removeClass("hover");
        });
    }

    timelineFunctions();

    $(window).resize(function () {
        timelineFunctions();
    });

    // setInterval(function(){
    //     timelineFunctions();
    // }1000,);

    var dstCheck = function (currentDate, timeZone) {
        //Checks if we are in Daylight Savings period of the year
        var currentDate = new Date();
        var sliceme = currentDate.toString();
        var slicedDate = sliceme.slice(4, 7);
        //From 31/03/19 to 27/10/19
        if (slicedDate == "Apr" || slicedDate == "May" || slicedDate == "Jun" || slicedDate == "Jul" || slicedDate == "Aug" || slicedDate == "Sep" || slicedDate == "Oct") {
            console.log("daylight savings", slicedDate);
            var divGen = $("")
        } else {
            console.log("not daylight savings", slicedDate);
        }
    }

    //Top section functionality, Time and working hours
    var getTimezones = function (timeDiff) {
        var currentDate = new Date();
        var currentHour = currentDate.getHours() + timeDiff;
        var currentMinutes = currentDate.getMinutes();
        var cMString = currentMinutes.toString();
        var cHString = currentHour.toString();

        dstCheck(currentDate, timeDiff);

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

    var getWorking = function (timeDiff) {
        $(".timezones").addClass("clear");
        var currentDate = new Date();
        var startMins = 30;
        var endMins = 00;
        currentDate.setHours(08 + timeDiff, startMins);
        var uksHour = currentDate;
        var csString = uksHour.toString();
        currentDate.setHours(18 + timeDiff, endMins);
        var uklHour = currentDate;
        var clString = uklHour.toString();

        if (timeDiff == -2) {
            var startMins = 00;
            var endMins = 00;
            currentDate.setHours(08 + timeDiff, startMins);
            var uksHour = currentDate;
            var csString = uksHour.toString();
            currentDate.setHours(19 + timeDiff, endMins);
            var uklHour = currentDate;
            var clString = uklHour.toString();
        } else if (timeDiff == -1) {
            var startMins = 00;
            var endMins = 00;
            currentDate.setHours(09 + timeDiff, startMins);
            var uksHour = currentDate;
            var csString = uksHour.toString();
            currentDate.setHours(18 + timeDiff, endMins);
            var uklHour = currentDate;
            var clString = uklHour.toString();
        }

        //Omit all data except time
        var slicedStartTime = csString.slice(16, 21);
        var slicedEndTime = clString.slice(16, 21);
        var currentTime = "Start: " + slicedStartTime + " - Finish: " + slicedEndTime + "";
        $(".territory-item").html(currentTime);
        $(".timezones").delay(500).removeClass("clear");
    }


    $(".zone-item").click(function () {
        var timezone = $(this).text();
        switch (timezone) {
            case "UK":
                getTimezones((0));
                getWorking((0));
                break;
            case "AU":
                getTimezones((11));
                getWorking((-11));
                break;
            case "HK/SG":
                getTimezones((8));
                getWorking((-8));
                break;
            case "UAE":
                getTimezones((4));
                getWorking((-4));
                break;
            case "DE":
                getTimezones((1));
                getWorking((-1));
                break;
            case "UKR":
                getTimezones((2));
                getWorking((-2));
                break;
        }
    });

    $(".wHours").hover(function () {
        var timezone = $(this).find(".territory-label").text();
        $(this).find(".territory-label").addClass("hover");
        console.log(timezone);
        switch (timezone) {
            case "UK":
                getTimezones((0));
                getWorking((0));
                break;
            case "AU":
                getTimezones((11));
                getWorking((-11));
                break;
            case "HK/SG":
                getTimezones((8));
                getWorking((-8));
                break;
            case "UAE":
                getTimezones((4));
                getWorking((-4));
                break;
            case "DE":
                getTimezones((1));
                getWorking((-1));
                break;
            case "UKR":
                getTimezones((2));
                getWorking((-2));
                break;
        }
    }, function () {
        $(this).find(".territory-label").removeClass("hover");
    });

});