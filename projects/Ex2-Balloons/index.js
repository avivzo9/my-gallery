console.log('hello');

var gInterval;
var gBaloons = [
    { bottom: 10, speed: 5 },
    { bottom: 10, speed: 15 },
    { bottom: 10, speed: 9 },
    { bottom: 10, speed: 7 },
    { bottom: 10, speed: 13 }
]

function init() {
    var elBaloons = document.querySelectorAll('.baloon')
    gInterval = setInterval(function() {
        for (var i = 0; i < elBaloons.length; i++) {
            moveBaloons()
        }
    }, 100)
}


function moveBaloons() {
    var elBaloons = document.querySelectorAll('.baloon');
    for (var i = 0; i < gBaloons.length; i++) {
        var currBaloon = gBaloons[i];
        var elBaloon = elBaloons[i];
        currBaloon.bottom += currBaloon.speed;
        elBaloon.style.marginBottom = currBaloon.bottom + 'px';
    }
}

function popSound() {
    var sound = new Audio('pop.wav')
    sound.play();
}

function onceClicked(i) {
    popSound()
    var elBaloons = document.querySelectorAll('.baloon')
    console.log(elBaloons);
    elBaloons[i].style.display = 'none';
}

// function renderBaloon() {
//     var strHTML = '';
//     for (var i = 0; i < gBaloons.length; i++) {
//         strHTML += '<div class="baloon baloon' + (i + 1) + '" onclick="onceClicked(' + i + ')"></div>'
//     }
//     // console.log(strHTML);
//     var elWeb = document.querySelector('.web');
//     elWeb.innerHTML = strHTML;
// }