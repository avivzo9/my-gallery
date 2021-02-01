'use strict';

const KEY = 'books';
const NO_PICTURE = '<img src="img/books.png">';
const LEARN_TO_CODE_IMG = '<img src="img/learnToCode.png">';
const LIFE_GOALS = '<img src="img/lifeGoals.png">';
const BOOK_OF_WISDOM = '<img src="img/book_of_wisdom.png">';
const PAGE_SIZE = 3;

var gBookId = 100;
var gBooks;
var gBooksName = ['Learn to code', 'Book of wisdom', 'Life Goals'];
var gSortBy = 'name';
var gPageIdx = 0;

_createBooks();

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = gBooksName.map(function(book) {
            return _createBook(book);
        })
    }
    gBooks = books;
    setImgToLocalBooks();
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

function _createBook(bookName, price, imgU) {
    var imgUrl = (!imgU) ? NO_PICTURE : imgU;
    var bookPrice = (!price) ? getRandomPrice(50, 101) : price;
    var book = {
        id: gBookId++,
        bookName: bookName,
        price: bookPrice,
        imgUrl: imgUrl,
        rank: 1,
        preRank: 0,
        rankCount: 2
    }
    return book;
}

function getBookById(bookId) {
    return gBooks.find(function(book) {
        return book.id === bookId;
    })
}

function getBooks() {
    return gBooks;
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return book.id === bookId;
    })
    console.log(bookIdx);
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function addBook(name, price) {
    var newBook = _createBook(name, price);
    gBooks.unshift(newBook);
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(function(book) {
        return book.id === bookId;
    })
    console.log(book);
    book.price = newPrice;
    _saveBooksToStorage();
}

function rateBook(bookId) {
    var elRate = document.querySelector('input[name="book-rank"]');
    var elRateAvg = document.querySelector('.sub-container span');
    console.log(elRate.value);
    elRateAvg.innerText = 'rate: ' + calcRank(+elRate.value, bookId).toFixed(0) + '/10';
    elRate.value = '';
}

function calcRank(rank, bookId) {
    var book = getBookById(bookId);
    if (book.rank === 1) {
        book.rank = rank;
        book.preRank += rank;
        _saveBooksToStorage();
        return book.rank;
    } else {
        book.rank = (book.preRank + rank) / book.rankCount;
        book.rankCount++;
        book.preRank += rank;
        _saveBooksToStorage();
        return book.rank;
    }
}

function setSort(sortBy) {
    return gSortBy = sortBy;
}

function getBooksSortedToDisplay() {
    if (gSortBy === 'name') {
        return gBooks.sort(function(book1, book2) {
            return book1.bookName.localeCompare(book2.bookName);
        })
    } else if (gSortBy === 'price') {
        return gBooks.sort(function(book1, book2) {
            return book1.price - book2.price;
        })
    } else if (gSortBy === 'rank') {
        return gBooks.sort(function(book1, book2) {
            return book2.rank - book1.rank;
        })
    }
    return gBooks;
}

function getBooksInPageToShow() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function setImgToLocalBooks() {
    var book1 = getBookById(100);
    book1.imgUrl = LEARN_TO_CODE_IMG;
    var book2 = getBookById(101);
    book2.imgUrl = BOOK_OF_WISDOM;
    var book3 = getBookById(102);
    book3.imgUrl = LIFE_GOALS;
}

function nextPage(elNextPage) {
    var elPrePage = document.querySelector('.previos-page');
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx--
        elNextPage.hidden = true;
    } else elPrePage.hidden = false;
}

function previousPage(elPrePage) {
    var elNextPage = document.querySelector('.next-page');
    gPageIdx--;
    if (gPageIdx < 0) {
        gPageIdx = 0;
        elPrePage.hidden = true;
    } else {
        elNextPage.hidden = false;
    }
}

function firstPage() {
    var elPrePage = document.querySelector('.previos-page');
    var elNextPage = document.querySelector('.next-page');
    elNextPage.hidden = false;
    elPrePage.hidden = true;
    gPageIdx = 0;
}