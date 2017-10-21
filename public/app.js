/* global $ */
$(document).ready(() => {
    $.getJSON("api/todos")
        .then(addTodos);
    
    $('#todoInput').keypress((event) => {
       event.which === 13 && createTodo();
           
    });
    
    $('.list').on('click', 'li', function() {
        updateTodo($(this));
    });
    
    $('.list').on('click', 'span', function(event) {
        event.stopPropagation();
        removeTodo($(this).parent());
        //$(this).parent().remove(); 
    });
})

let addTodos = (todos) => {
    //add todos to page here
    todos.forEach((todo => {
        addSingletodo(todo);
    }));
}

let createTodo = () => {
    //send request to create new todo
    const userInput = $('#todoInput').val();
    userInput && $.post('api/todos',  {name: userInput})
        .then((data) =>  {
            addSingletodo(data);
            $('#todoInput').val('');
        })
        .catch((err) => console.log(err));
    
}

let addSingletodo = (todo) => {
    let todoListItem = $(`<li class="task"> ${todo.name} <span>X</span> </li>`);
    todoListItem.data('id', todo._id);
    todoListItem.data('completed', todo.completed);
    todo.completed && todoListItem.addClass('done');
    $('.list').append(todoListItem);
}

let removeTodo = (todo) => {
    let clickedId = todo.data('id');
    let deleteUrl = 'api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    }).then(() => todo.remove())
        .catch(err => console.log(err));
}

let updateTodo = todo =>{
    let isDone = todo.data('completed');
    let clickedId = todo.data('id');
    let updateUrl = 'api/todos/' + clickedId;
    let updateData = {completed: !isDone};
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    }).then(() => {
        todo.toggleClass('done');
        todo.data('completed', !isDone);
    });
}