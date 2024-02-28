const todos = document.querySelector('.todos'); // selectring the ul to render data in it
const data = JSON.parse(localStorage.getItem("data")) || []; // getting data from local storage or an empty array


// function to add todo
function addTodo() {
    const input = document.querySelector('#todo'); // selecting the input to get the value
    if(input.value === '') return alert('Please enter a todo'); // if input is empty then alert
    const value = input.value; // getting the value of input
    data.push({value, completed: false}); // pushing the value to the data array
    render(); // rendering the data
    input.value = ''; // emptying the input
}

// function to delete todo
function deleteTodo (index) {
    data.splice(index, 1); // deleting the todo from the data array
    render(); // rendering the data again to show the changes
}

const isCompleted = (index) => {
    data[index].completed = !data[index].completed; // changing the completed status of the todo
    render(); //rendering the data again to show the changes
}

// function to render the data
function render() {
    localStorage.setItem('data', JSON.stringify(data)); // saving the data to local storage to keep the data even after the page is refreshed or closed
    todos.innerHTML = ''; // Initializing empty ul to render the data again

    data.forEach((todo, index) => { // looping through the data array to render the data
        const li = document.createElement('li'); // creating a li to add the todo in it 
       if(todo.completed) { // if the todo is completed then add a line through it
           li.innerHTML = `<input type="checkbox" id="check${index}" checked onclick="isCompleted(${index})">
           <del>${todo.value}</del>
           <button onclick="deleteTodo(${index})">Delete</button>`;
         } else { // if the todo is not completed then render it as it is
            li.innerHTML = `<input type="checkbox" id="check${index}" onclick="isCompleted(${index})">
            ${todo.value}
            <button onclick="deleteTodo(${index})">Delete</button>`;
            }
            todos.appendChild(li); // appending the li to the ul
    });
}

render();