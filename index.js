var hamsterOut = 1000;   //地鼠出现的时间间隔
var hiddenTime = 2.9 * 1000;   //从上升到下落结束时间，其中包括两次动画过度
var staticTime = 2.5 * 1000;  //从上升到下落的开始总时间，其中包括一次动画过度
var item = document.getElementById('item');
var hit = document.getElementById('hit');
var startDiv = document.getElementById('startDiv');
var startBtn = document.getElementById('start');
var changeTime = document.getElementById('changeTime');
var option = document.getElementsByTagName('option');
var hitNumber = 0;
var timeNumber = (parseInt(changeTime.value) + 1) * 1000; //定时器在总时间+1秒后结束
var totalTime = changeTime.value; //游戏初始总时间

var dragImage = document.getElementsByTagName('img');
for (var i = 0; i < dragImage.length; i++) {
    dragImage[i].ondragstart = function () {
        return false;
    }
}
// 事件集中器
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
};

// 自定义时间
EventUtil.addHandler(changeTime, "change", function (event) {
    let value = event.srcElement.value;
    timeNumber = (parseInt(value) + 1) * 1000;
    totalTime = value;
})

// 点击按钮开始游戏与重新开始
EventUtil.addHandler(startDiv, "click", function (event) {
    let target = EventUtil.getTarget(event);
    switch (target.id) {
        case "start":
            // 点击开始
            startBtn.hidden = true;
            changeTime.hidden = true;
            for (var i = 0; i < option.length; i++) {
                if (option[i].selected) {
                    setTime(option[i].id);
                }
            }
            start();
            break;
        case "continue":
            // 点击重新游戏还原
            timeNumber = (parseInt(changeTime.value) + 1) * 1000;
            totalTime = changeTime.value;
            hitNumber = 0;
            hit.innerHTML = '0';
            gameOver.hidden = true;
            startBtn.hidden = true;
            changeTime.hidden = true;
            start();
            break;
        case "cancel":
            // 点击取消按钮还原
            timeNumber = (parseInt(changeTime.value) + 1) * 1000;
            totalTime = changeTime.value;
            hitNumber = 0;
            hit.innerHTML = '0';
            gameOver.hidden = true;
            startBtn.hidden = false;
            changeTime.hidden = false;
            break;
    }
})

// 设定时间的快慢
function setTime(id) {
    switch (id) {
        case 'fast':
            hamsterOut = 0.9 * 1000;
            hiddenTime = 1.7 * 1000;
            staticTime = 1.3 * 1000;
            break;
        case 'middle':
            hamsterOut = 1 * 1000;
            hiddenTime = 2.9 * 1000;
            staticTime = 2.5 * 1000;
            break;
        case 'slow':
            hamsterOut = 1.5 * 1000;
            hiddenTime = 3.9 * 1000;
            staticTime = 3.5 * 1000;
            break;
    }
}

// 定时器
var outInterval = null;
var timeLine = null;
// 开始游戏
function start() {
    // 随机选取出现地鼠的个数
    outInterval = setInterval(() => {
        var showShu = Math.floor(Math.random() * 4 + 1);
        var set = new Set();
        for (var i = 0; i < showShu; i++) {
            showIndex = Math.floor(Math.random() * 9 + 1);
            set.add(showIndex);
        }
        set.forEach(function (value) {
            doShow(value);
        })
    }, hamsterOut);

    // 倒计时
    var timeText = document.getElementById('time');
    timeText.innerHTML = totalTime + 's';
    timeLine = setInterval(() => {
        if (totalTime <= 0) clearInterval(timeLine);
        timeText.innerHTML = --totalTime + 's';
    }, 1000);

    // 游戏结束
    setTimeout(() => {
        clearInterval(outInterval);
        clearInterval(timeLine);
        // 游戏结束！打印成绩
        getScore();
        timeText.innerHTML = '';
        changeTime.hidden = false;
    }, timeNumber - hamsterOut);
}

// 地鼠出现
function doShow(randonNumber) {
    var hamster = document.getElementsByTagName('img')[randonNumber];
    hamster.style.animation = 'disper 0.5s';
    setTimeout(function () {
        hamster.style.animation = 'hid 0.5s';
    }, staticTime);
    hamster.hidden = false;
    setTimeout(function () {
        hamster.hidden = true;
    }, hiddenTime);
}

// 点击地鼠得分
EventUtil.addHandler(item, "click", function (event) {
    event = EventUtil.getEvent(event);
    let target = EventUtil.getTarget(event);
    var src = target.attributes['src'];
    item.style.cursor = "url('images/hammed.ico'),default";
    setTimeout(() => {
        item.style.cursor = "url('images/hammer.ico'),default";
    }, 100);
    if (src != undefined && src.nodeValue == 'images/hamster.png' && totalTime > 0) {
        switch (target.id) {
            case "image1":
                hit.innerHTML = ++hitNumber;
                hid('image1'); // 打中地鼠后让它变成一只受伤的地鼠
                break;
            case "image2":
                hit.innerHTML = ++hitNumber;
                hid('image2');
                break;
            case "image3":
                hit.innerHTML = ++hitNumber;
                hid('image3');
                break;
            case "image4":
                hit.innerHTML = ++hitNumber;
                hid('image4');
                break;
            case "image5":
                hit.innerHTML = ++hitNumber;
                hid('image5');
                break;
            case "image6":
                hit.innerHTML = ++hitNumber;
                hid('image6');
                break;
            case "image7":
                hit.innerHTML = ++hitNumber;
                hid('image7');
                break;
            case "image8":
                hit.innerHTML = ++hitNumber;
                hid('image8');
                break;
            case "image9":
                hit.innerHTML = ++hitNumber;
                hid('image9');
                break;
        }
    }

});
var injureHamster = new Image().src = 'images/injureHamster.png';
// 打中地鼠后让它变成一只受伤的地鼠
function hid(id) {
    var img = document.getElementById(id);
    img.src = injureHamster;
    setTimeout(() => {
        img.src = 'images/hamster.png';
    }, 200);
}

// 游戏结束得分
function getScore() {
    var finalShow = document.getElementById('finalShow');
    var gameOver = document.getElementById('gameOver');
    gameOver.hidden = false;
    finalShow.innerHTML = hitNumber + '分';
}