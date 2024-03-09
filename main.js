// Add event listener when the window loads to initialize the To-Do List application
window.addEventListener('load', () => {
    // Retrieve or initialize the todos array from local storage
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    // Get the input field for the username and the new todo form
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    // Retrieve the username from local storage or initialize it as an empty string
    const username = localStorage.getItem('username') || '';

    // Set the value of the name input field to the username
    nameInput.value = username;

    // Add event listener to the name input field to update the username in local storage
    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    })

    // Add event listener to the new todo form to handle todo creation
    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        // Create a new todo object with content, category, done status, and creation time
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        // Add the new todo to the todos array
        todos.push(todo);

        // Update the todos array in local storage
        localStorage.setItem('todos', JSON.stringify(todos));

        // Reset the new todo form
        e.target.reset();

        // Display the updated list of todos
        DisplayTodos()
    })

    // Display the initial list of todos when the window loads
    DisplayTodos()
})

// Function to display the list of todos
function DisplayTodos () {
    // Get the todo list container element
    const todoList = document.querySelector('#todo-list');
    // Clear the todo list container
    todoList.innerHTML = "";

    // Iterate through each todo in the todos array
    todos.forEach(todo => {
        // Create HTML elements to represent each todo item
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        // Set attributes and classes for the HTML elements
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        // Set content for the HTML elements
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        // Append HTML elements to create the todo item
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        // Append the todo item to the todo list container
        todoList.appendChild(todoItem);

        // Add class to todo item if it is marked as done
        if (todo.done) {
            todoItem.classList.add('done');
        }
        
        // Add event listener to the checkbox to toggle the done status of the todo
        input.addEventListener('change', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            // Update the UI to reflect the changes
            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            // Redisplay the todos
            DisplayTodos()
        })

        // Add event listener to the edit button to allow editing of todo content
        edit.addEventListener('click', (e) => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e) => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                // Redisplay the todos
                DisplayTodos()
            })
        })

        // Add event listener to the delete button to delete the todo
        deleteButton.addEventListener('click', (e) => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            // Redisplay the todos
            DisplayTodos()
        })

    })
}

// Event listener for when the document content has loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the container for line numbers and the code content
    const lineNumbersContainer = document.getElementById("line-numbers-container");
    const codeContent = document.getElementById("code-content");
    // Split the code content into lines
    const lines = codeContent.innerText.split("\n");
    // Create line number elements and append them to the container
    for (let i = 1; i <= lines.length; i++) {
        const lineNumberElement = document.createElement("pre");
        lineNumberElement.setAttribute("data-line", i);
        lineNumberElement.textContent = i;
        lineNumbersContainer.appendChild(lineNumberElement);
    }
});
