// Select DOM elements
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

// Load todos from localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => addTodoToList(todo.text, todo.completed));
}

// Save todos to localStorage
function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Add todo to the DOM
function addTodoToList(todo, completed = false) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    if (completed) todoItem.classList.add("completed");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = completed;
    todoCheckbox.classList.add("todo-checkbox");

    todoCheckbox.addEventListener("change", () => {
        toggleTodoCompletion(todo);
        todoItem.classList.toggle("completed");
    });

    const todoText = document.createElement("span");
    todoText.textContent = todo;

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    // Delete todo event
    deleteBtn.addEventListener("click", () => {
        removeTodoFromStorage(todo);
        todoItem.remove();
    });

    todoItem.appendChild(todoCheckbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteBtn);

    todoList.appendChild(todoItem);
}

// Add todo
function addTodo() {
    const todoText = todoInput.value.trim();
    if (!todoText) return;

    // Save to localStorage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push({ text: todoText, completed: false });
    saveTodos(todos);

    // Add to DOM
    addTodoToList(todoText);

    // Clear input
    todoInput.value = "";
}

// Toggle todo completion
function toggleTodoCompletion(todoText) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = todos.map((todo) =>
        todo.text === todoText ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(updatedTodos);
}

// Remove todo from localStorage
function removeTodoFromStorage(todoText) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = todos.filter((todo) => todo.text !== todoText);
    saveTodos(updatedTodos);
}

// Event listeners
addTodoBtn.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", loadTodos);
