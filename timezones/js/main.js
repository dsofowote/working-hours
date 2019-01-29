$(document).ready(function () {
    var timelineFunctions = function () {
        //Position logic
        var tLOffset = $(".timeline-overlay").offset();
        $(".working-container").css({
            "top" : tLOffset.top + 20
        });

        //Territory position logic
        var timeblock = $(".timestamps").outerWidth();
        var workTime = timeblock * 9.5;
        $(".wHours").css({
            "width": workTime
        });
        $(".wHours.uk").css({
            "left": timeblock * 8.5
        });
        $(".wHours.ukr").css({
            "left": (timeblock * 10.5)
        });
        $(".wHours.de").css({
            "left": (timeblock * 9.5)
        });
        $(".wHours.au").css({
            "left": (timeblock * 19.5)
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
            "left": (timeblock * 13)
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
            var cM = currentDate.getMinutes();
            var cMString = cM.toString();
            if (cMString.length < 2) {
                cM = "0" + cM;
            }
            var a = parseInt(currentHour);

            $(".currentTime.uk").text("UK - " + checkOverlap((a)) + ":" + cMpx);
            $(".currentTime.ukr").text("UKR - " + checkOverlap((a + 2)) + ":" + cMpx);
            $(".currentTime.de").text("DE - " + checkOverlap((a + 1)) + ":" + cMpx);
            $(".currentTime.au").text("AU - " + checkOverlap((a + 11)) + ":" + cMpx);
            $(".currentTime.hksg").text("HK/SG - " + checkOverlap((a + 8)) + ":" + cMpx);
            $(".currentTime.uae").text("UAE - " + checkOverlap((a + 4)) + ":" + cMpx);

            console.log(currentHour);
            console.log(currentMinutes);
            console.log(tLWidth);
            console.log(cHpx);
            console.log(cMpx);
            console.log(cMcv);
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
    //Top section functionality, Time and working hours
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

    var getWorking = function (timeDiff) {
        var currentDate = new Date();
        currentDate.setHours(08 + timeDiff, 30);
        var uksHour = currentDate;
        var csString = uksHour.toString();
        console.log(csString);
        currentDate.setHours(18 + timeDiff, 00);
        var uklHour = currentDate;
        var clString = uklHour.toString();
        console.log(csString, clString);

        //Omit all data except time
        var slicedStartTime = csString.slice(16, 21);
        var slicedEndTime = clString.slice(16, 21);
        var currentTime = "Start: " + slicedStartTime + " - Finish: " + slicedEndTime + "";
        $(".territory-item").html(currentTime);
    }

    $(".zone-item").click(function () {
        var timezone = $(this).text();
        console.log(timezone);
        switch (timezone) {
            case "UK":
                getTimezones((0));
                getWorking((0));
                break;
            case "AU":
                getTimezones((11));
                getWorking((11));
                break;
            case "HK/SG":
                getTimezones((8));
                getWorking((8));
                break;
            case "UAE":
                getTimezones((4));
                getWorking((4));
                break;
            case "DE":
                getTimezones((1));
                getWorking((1));
                break;
            case "UKR":
                getTimezones((2));
                getWorking((2));
                break;
        }
    });

});