'use strict';

function onInit() {
    console.log('Hi');
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();
    var strHTMLs = todos.map(function(todo) {
        var className = (todo.isDone) ? 'done' : '';
        return `<li class="${className}" onclick="onToggleTodo('${todo.id}')">
                    ${todo.txt + ' (' + todo.importance + ')' + ', created at: ' + todo.createdAt}
                    <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
                </li>`
    })

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('');
    document.querySelector('.total-todos').innerText = getTodosCount();
    document.querySelector('.active-todos').innerText = getActiveTodosCount();
}

function onRemoveTodo(todoId, ev) {
    ev.stopPropagation();
    removeTodo(todoId);
    renderTodos();
}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();

}

function onAddTodo(ev) {
    ev.preventDefault();

    var elTodoTxt = document.querySelector('input[name=todoTxt]');
    console.log('elTodoTxt:', elTodoTxt)
    var elTodoImportance = document.querySelector('input[name=todoImportance]');
    console.log('elTodoImportance:', elTodoImportance)
    var txt = elTodoTxt.value;
    var importance = elTodoImportance.value
    console.log('Adding todo:', txt);
    if (!elTodoTxt.value) return;
    if (!importance) importance = 1;
    addTodo(txt, importance);
    elTodoTxt.value = ''
    renderTodos();
}

function onSetFilter() {
    var elFilterBy = document.querySelector('select[name=filterBy]');
    var filterBy = elFilterBy.value;
    console.log('Filtering by', filterBy);
    setFilter(filterBy);
    renderTodos();
}

function onSortFilter() {
    var elSortBy = document.querySelector('select[name=sortBy]');
    var sortBy = elSortBy.value;
    console.log('sortBy:', sortBy);
    setSort(sortBy);
    renderTodos();
}