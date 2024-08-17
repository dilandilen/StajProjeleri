// HTML öğeleri ile bağlantı kuruyoruz
const todoForm = $("#todo-form");
const todoInput = $("#todo-input");
const todoDescription = $("#todo-desc");
const todoListUL = $("#todo-list");

// Mevcut tüm todoları alıyoruz ve listeyi güncelliyoruz
let allTodos = getTodos();
updateTodoList();

// Form submit olduğunda çalışacak event listener
todoForm.on("submit", function (e) {
  e.preventDefault(); // Sayfanın yenilenmesini önler

  // Form doğrulaması
  if (validateForm()) {
    addTodo();
  }
});

function validateForm() {
  const todoText = $.trim(todoInput.val());
  const todoDesc = $.trim(todoDescription.val());

  let valid = true;
  let messages = [];

  if (todoText.length < 3) {
    valid = false;
    messages.push('Title must be at least 3 characters long.');
  }

  if (todoDesc.length > 20) {
    valid = false;
    messages.push('Description must be less than 20 characters.');
  }

  if (!valid) {
    alert(messages.join('\n'));
  }

  return valid;
}

function addTodo() {
  const todoText = $.trim(todoInput.val());
  const todoDesc = $.trim(todoDescription.val());
  if (todoText.length > 0) {
    const newTodo = {
      id: generateGuid(),
      description: todoDesc,
      create_date: new Date(),
      text: todoText,
      completed: false,
    };
    allTodos.push(newTodo);
    updateTodoList();
    saveTodos();
    todoInput.val("");
    todoDescription.val("");
  }
}

function updateTodoList() {
  todoListUL.empty();
  $.each(allTodos, function(todoIndex, todo) {
    const todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  const todoId = todo.id;
  const todoLI = $(`
    <li class="todo">
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoId}" class="todo-text">${todo.text}</label>
        <button class="view-details">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M300-360h60v-160h-60v50h-60v60h60v50Zm100-50h320v-60H400v60Zm200-110h60v-50h60v-60h-60v-50h-60v160Zm-360-50h320v-60H240v60Zm80 450v-80H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v80H320ZM160-280h640v-480H160v480Zm0 0v-480 480Z"/></svg>
        </button>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
    </li>
  `);

  todoLI.find(".delete-button").on("click", function () {
    deleteTodoItem(todoIndex);
  });

  todoLI.find("input").on("change", function () {
    allTodos[todoIndex].completed = $(this).is(":checked");
    saveTodos();
  });

  todoLI.find(".view-details").on("click", function () {
    localStorage.setItem("selectedTodo", JSON.stringify(allTodos[todoIndex]));
    window.location.href = "todo-details.html";
  });

  todoLI.find("input").prop("checked", todo.completed);
  return todoLI;
}

function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}

function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}

function generateGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
