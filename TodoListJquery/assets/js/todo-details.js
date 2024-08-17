$(document).ready(function() {
    const todoTitle = $('#todo-title');
    const todoDescription = $('#todo-description');
    const todoDate = $('#todo-date');
    const backButton = $('#back-button');

    // LocalStorage'dan seçilen todo'yu alır
    const selectedTodo = JSON.parse(localStorage.getItem('selectedTodo'));

    if (selectedTodo) {
        todoTitle.text(selectedTodo.text);
        todoDescription.text(selectedTodo.description || 'No description');
        todoDate.text(selectedTodo.create_date ? new Date(selectedTodo.create_date).toLocaleString() : 'No date');
    }

    backButton.on('click', function() {
        window.location.href = 'index.html'; // Ana sayfaya geri döner
    });
});
