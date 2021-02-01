var gQuests = [
    { id: 1, opts: ['var', 'Nothing'], correctOptIndex: 0 },
    { id: 2, opts: ['dr. Dre', 'Morgan Freeman'], correctOptIndex: 1 },
    { id: 3, opts: ['five fingers', 'eight fingers'], correctOptIndex: 0 },
    { id: 4, opts: ['india flag', 'Madagaskar flag'], correctOptIndex: 1 }
];

var gCurrQuestIdx = 0;
var gDiv = document.querySelector('.box');

function init() {
    renderQuest();
}

function checkAnswer(idx) {
    if (idx === gQuests[gCurrQuestIdx].correctOptIndex) {
        alert('Well done!😎');
        nextQuest()
    } else alert('wrong answer! 😒 Try again!');
}

function nextQuest() {
    ++gCurrQuestIdx
    if (gCurrQuestIdx === 2) {
        var elImg3 = document.querySelector('img');
        elImg3.style.left = 30 + '%';
        console.dir(elImg3);
        console.log(elImg3.classList);
    }
    if (gCurrQuestIdx === 4) {
        if (confirm('Congrads! you finished the game! play again?')) {
            gCurrQuestIdx = -1;
            nextQuest()
        } else alert('It was a good game!')
    } else renderQuest()
}

function renderQuest() {
    var strHTML = `<img class="img" src="img/${gCurrQuestIdx + 1}.jpeg">
    <button class="answerbutton button" onclick="checkAnswer(0)">${gQuests[gCurrQuestIdx].opts[0]}</button>
    <button class="answerbutton2 button" onclick="checkAnswer(1)">${gQuests[gCurrQuestIdx].opts[1]}</button>`;
    gDiv.innerHTML = strHTML;
}

function restart() {
    gCurrQuestIdx = -1;
    nextQuest()
}