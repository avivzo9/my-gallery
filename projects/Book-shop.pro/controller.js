'use strict';

function init() {
    renderTable();
}

function renderTable() {
    var books = getBooksSortedToDisplay()
    books = getBooksInPageToShow();
    var strHTML = '';
    var elTable = document.querySelector('.table');
    var elPage = document.querySelector('.page');
    strHTML += `<tr><th>Id</th><th>Picture</th><th>Title</th><th>Rank</th><th>Price</th><th>Actions</th></tr>`
    strHTML += books.map(function(book) {
        console.log('book:', book)
        return `<tr><td>${book.id}</td><td>${book.imgUrl}</td><td>${book.bookName}</td><td>⭐ ${book.rank.toFixed(0)}</td><td>$${book.price}</td>
        <td><button onclick="onReadBook(${book.id})">Read</button>|
        <button onclick="onUpdateBook(${book.id})">Update</button>|
        <button onclick="onDeleteBook(${book.id})">Delete</button>
        </tr>`
    }).join('');
    elTable.innerHTML = strHTML;
    elPage.innerText = gPageIdx + 1;
    getBooksSortedToDisplay();
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderTable();
}

function onAddBook(ev) {
    ev.preventDefault();
    var elForm = document.querySelector('form[name="submit-book"]')
    var elBookName = document.querySelector('input[name="book-name"]');
    var elBookPrice = document.querySelector('input[name="book-price"]');
    addBook(elBookName.value, elBookPrice.value);
    elForm.hidden = true;
    elBookName.value = '';
    elBookPrice.value = '';
    renderTable();
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('what is the new price?');
    updateBook(bookId, newPrice);
    renderTable();
}

function onReadBook(bookId) {
    console.log(bookId);
    var elModal = document.querySelector('.modal');
    var book = getBookById(bookId)
    var strHTML = `<div class="sub-container"><button class="close-modal" onclick="closeModal()">X</button>
    <span>Rank: ${book.rank.toFixed(0)}/10</span>
    <input onblur="onRateBook(event, ${bookId})" onkeydown="onRateBook(event, ${bookId})" type="number" min="1" max="10" placeholder="Rate book" name="book-rank" class="book-rank"></div>
    <span class="headlight">Here is your book, Enjoy!</span><br>
    <span class="headlight">BookName:</span>${book.bookName}.<br>
    ${makeLorem(100)}`
    elModal.style.display = 'flex';
    elModal.innerHTML = strHTML;
}

function onRateBook(ev, bookId) {
    if (ev.key === "Enter") rateBook(bookId);
    renderTable();
}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

function onSortFilter() {
    var elSortBy = document.querySelector('select[name=sortBy]');
    setSort(elSortBy.value);
    renderTable();
}

function onShowForm() {
    var elForm = document.querySelector('form[name="submit-book"]')
    if (elForm.hidden) elForm.hidden = false;
    else if (!elForm.hidden) elForm.hidden = true;
}

function onNextPage() {
    var elNextPage = document.querySelector('.next-page');
    nextPage(elNextPage);
    renderTable();
}

function onPreviousPage() {
    var elPrePage = document.querySelector('.previos-page');
    previousPage(elPrePage);
    renderTable();
}

function onFirstPage() {
    firstPage();
    renderTable();
}