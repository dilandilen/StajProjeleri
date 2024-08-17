document.addEventListener('DOMContentLoaded', () => {
    const todoTitle = document.getElementById('todo-title');
    const todoDescription = document.getElementById('todo-description');
    const todoDate = document.getElementById('todo-date');
    const backButton = document.getElementById('back-button');

    // LocalStorage'dan seçilen todo'yu alır
    const selectedTodo = JSON.parse(localStorage.getItem('selectedTodo'));

    if (selectedTodo) {
        todoTitle.textContent = selectedTodo.text;
        todoDescription.textContent = selectedTodo.description || 'No description';
        todoDate.textContent = selectedTodo.create_date ? new Date(selectedTodo.create_date).toLocaleString() : 'No date';
    }

    backButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Ana sayfaya geri döner
    });
});
