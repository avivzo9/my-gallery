'use strict';

var gId = 100;
var gProjects;

createProjects();

function createProjects() {
    var projects = [
        { proName: 'Pacman', title: 'Game', desc: 'Pacman - my edition to the amazing game.', url: 'http://127.0.0.1:5500/projects/pacman-inClass-starter/index.html', img: 'img/pacman-pro.png.jpg' },
        { proName: 'Minesweeper', title: 'Game', desc: 'my edition to the Minesweeper game.', url: 'http://127.0.0.1:5500/projects/MineSweeper.pro/index.html', img: 'img/minsweeper-pro.png.jpg' },
        { proName: 'Book shop', title: 'Shop Books', desc: 'Book shop was my first site that I build.', url: 'http://127.0.0.1:5500/projects/Book-shop.pro/index.html', img: 'img/book-shop-pro.png.jpg' }
    ].map(function(pro) {
        return createProject(pro.proName, pro.title, pro.desc, pro.url, pro.img);
    })
    gProjects = projects;
    $('.row')
}



function createProject(proName, title, desc, url, img) {
    return {
        id: gId++,
        proName: proName,
        title: title,
        desc: desc,
        url: url,
        img: img
    }
}

function getProjects() {
    return gProjects;
}