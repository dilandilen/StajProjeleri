document.addEventListener('DOMContentLoaded', function() {
    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

    renderTodoList();

    // Todo formunu dinleyerek yeni todo ekleme
    document.getElementById('todoForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const newTodo = {
            id: generateGuid(),
            title: title,
            description: description,
            create_date: new Date(),
            completed: false
        };

        todoList.push(newTodo);
        saveAndRenderTodoList();
        this.reset();
    });

    // Todo listesini görüntüleme
    function renderTodoList() {
        const todoListElement = document.getElementById('todoList');
        todoListElement.innerHTML = ''; 

        todoList.forEach(function(todo) {
            const li = document.createElement('li');
            li.className = `list-group-item ${todo.completed ? 'completed' : ''}`;
            li.setAttribute('data-id', todo.id);

            li.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${todo.title}</h5>
                        <p>${todo.description}</p>
                        <small>${new Date(todo.create_date).toLocaleString()}</small>
                    </div>
                    <div>
                        <button class="btn btn-success btn-sm me-2 toggle-completed">Tamamla</button>
                        <button class="btn btn-warning btn-sm me-2 edit-todo">Güncelle</button>
                        <button class="btn btn-danger btn-sm delete-todo">Sil</button>
                    </div>
                </div>
            `;

            // Tamamlama işlemi
            li.querySelector('.toggle-completed').addEventListener('click', function() {
                toggleCompleted(todo.id);
            });

            // Silme işlemi
            li.querySelector('.delete-todo').addEventListener('click', function() {
                deleteTodo(todo.id);
            });

            // Güncelleme işlemi
            li.querySelector('.edit-todo').addEventListener('click', function() {
                editTodo(todo.id);
            });

            todoListElement.appendChild(li);
        });
    }

    // Todo'yu tamamlama işlemi
    function toggleCompleted(id) {
        const todo = todoList.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        saveAndRenderTodoList();
    }

    // Todo silme
    function deleteTodo(id) {
        todoList = todoList.filter(todo => todo.id !== id);
        saveAndRenderTodoList();
    }

    // Todo güncelleme
    function editTodo(id) {
        const todo = todoList.find(todo => todo.id === id);
        document.getElementById('title').value = todo.title;
        document.getElementById('description').value = todo.description;
        deleteTodo(id);
    }

    // GUID üretme fonksiyonu
    function generateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0,
                  v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // LocalStorage'a kaydet ve listeyi güncelle
    function saveAndRenderTodoList() {
        localStorage.setItem('todoList', JSON.stringify(todoList));
        renderTodoList();
    }
});
