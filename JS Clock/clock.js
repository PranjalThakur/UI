"use strict";

var getCurrentTime = function () {
    var time = new Date();
    return {
        hrs: time.getHours(),
        min: time.getMinutes(),
        sec: time.getSeconds(),
        centiSec: parseInt(time.getMilliseconds()/10)
    };
};

var getStringForNum = function (num) {
    var str = num + "";
    if (str.length === 1) {
        str = "0" + str;
    }
    return str;
}

var setCurrentTime = function () {
    var time = getCurrentTime();

    var clkHrs = document.getElementById('clkHrs');
    var clkMin = document.getElementById('clkMin');
    var clkSec = document.getElementById('clkSec');

    clkHrs.innerText = getStringForNum(time.hrs);
    clkMin.innerText = getStringForNum(time.min);
    clkSec.innerText = getStringForNum(time.sec);
};

var setTimeRepeatedly = function () {
    setCurrentTime();
    setInterval(setCurrentTime, 10);
    var clkSec = document.getElementById('clkSec');
    clkSec.classList.add('blinking');
}

window.onload = setTimeRepeatedly;