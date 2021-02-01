'use strict';

const STORAGE_KEY = 'todosDB';
var gTodos;
var gFilterBy = 'all';
var gSortBy = 'txt';

_createTodos();

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

// var nums = [2, 1, 3, 2]
// strs.sort(function(todo1, todo2) {
//     return todo1.txt.localCompare(todo2.txt)

// })

function getTodosForDisplay() {
    if (gFilterBy === 'all') {
        getTodosSortedForDisplay()
        return gTodos;
    }
    var todos = gTodos.filter(function(todo) {
        return (gFilterBy === 'done' && todo.isDone) ||
            (gFilterBy === 'active' && !todo.isDone)
    })
    getTodosSortedForDisplay()
    return todos;
}

function getTodosSortedForDisplay() {
    if (gSortBy === 'txt') {
        return gTodos.sort(function(todo1, todo2) {
            return todo1.txt.localeCompare(todo2.txt)
        })
    } else if (gSortBy === 'created') {
        return gTodos.sort(function(todo1, todo2) {
            return todo2.createdAt - todo1.createdAt;
        })
    } else if (gSortBy === 'importance') {
        return gTodos.sort(function(todo1, todo2) {
            return todo2.importance - todo1.importance;
        })
    }
}

function removeTodo(todoId) {
    console.log('Removing Todo', todoId);
    var idx = gTodos.findIndex(function(todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    console.log('Toggling Todo', todoId);

    var todoToToggle = gTodos.find(function(todo) {
        return todo.id === todoId
    })
    todoToToggle.isDone = !todoToToggle.isDone
    _saveTodosToStorage();
}

function addTodo(txt, importance) {
    var todo = _createTodo(txt, importance);
    gTodos.unshift(todo);
    _saveTodosToStorage();
}

function getTodosCount() {
    return gTodos.length
}

function getActiveTodosCount() {
    var activeTodos = gTodos.filter(function(todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}

//////////// Those functions are private for this file only \\\\\\\\\\\\\

function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    console.log('todos:', todos)
    if (!todos || !todos.length) {
        todos = ['Learn CSS', 'Master HTML'].map(_createTodo);
    }
    gTodos = todos;
    _saveTodosToStorage();
}

function _createTodo(txt, importance) {
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        importance: importance,
        createdAt: Date.now()
    }
    return todo;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos);
}