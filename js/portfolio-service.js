'use strict';

var gId = 100;
var gProjects;

createProjects();

function createProjects() {
    var projects = [
        { proName: 'Pop the bubbles', title: 'day-9', desc: 'Pop the bubbles before they disappear.', url: 'http://127.0.0.1:5500/projects/Ex2-Balloons/index.HTML', img: 'img/pop-baloons.png.jpg', time: '13-01-2020' },
        { proName: 'In-Picture', title: 'Day-10', desc: 'Trivia time! open the game and start guessing!', url: 'http://127.0.0.1:5500/projects/in-picture/index.HTML', img: 'img/whats-in-the-picture.png.jpg', time: '14-01-2020' },
        { proName: 'Ball board', title: 'Day-11', desc: 'Play against time, you need to collect balls as much as you can!', url: 'http://127.0.0.1:5500/projects/ball-board-start-here/index.html', img: 'img/ball-board.png.jpg', time: '17-01-2020' },
        { proName: 'Pacman', title: 'Day-12', desc: 'My edition to the amazing game.', url: 'http://127.0.0.1:5500/projects/pacman-inClass-starter/index.html', img: 'img/pacman-pro.png.jpg', time: '18-01-2020' },
        { proName: 'Minesweeper', title: 'Day-14-15 - Sprint 1', desc: 'My first big project- minesweeper, my edition to the Minesweeper game.', url: 'http://127.0.0.1:5500/projects/MineSweeper.pro/index.html', img: 'img/minsweeper-pro.png.jpg', time: '23-01-2020' },
        { proName: 'Task manager', title: 'Day-19', desc: 'Manage your tasks efficiency.', url: 'http://127.0.0.1:5500/projects/todo-mvc-proj/index.html', img: 'img/todo.png.jpg', time: '13-01-2020' },
        { proName: 'Book shop', title: 'Day-20', desc: 'Manage your book shop online.', url: 'http://127.0.0.1:5500/projects/Book-shop.pro/index.html', img: 'img/book-shop-pro.png.jpg', time: '28-01-2020' }
    ].map(function(pro) {
        return createProject(pro.proName, pro.title, pro.desc, pro.url, pro.img, pro.time);
    })
    gProjects = projects;
    $('.row')
}



function createProject(proName, title, desc, url, img, time) {
    return {
        id: gId++,
        proName: proName,
        title: title,
        desc: desc,
        url: url,
        img: img,
        createdAt: time
    }
}

function getProjects() {
    return gProjects;
}