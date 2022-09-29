"use strict";

console.log('Connected ...');

// ===========================================================================
// Found this unique way of creating ids, from a github user blog post.
// I lost the URL for the time being but Will find and attached 
// to give credit to developer
// ===========================================================================
function uid() {
  let a = new Uint32Array(3);
  window.crypto.getRandomValues(a);
  return (performance.now().toString(36)+Array.from(a).map(A => A.toString(36)).join("")).replace(/\./g,"");
};
// ===========================================================================

// Elements
const addItemForm = document.querySelector('#addItemForm');
const todoList = document.querySelector('#todoList');

// Check localStorage for tasks
let todo = JSON.parse(localStorage.getItem('todo')) || [];

// If there are tasks, populate DOM
if (todo.length > 0) {
  console.log(todo);

  for (const index of todo) {
    console.log(index.task);

    let todoItem = document.createElement('li');
    todoItem.classList.add('todo_item');      

    todoItem.setAttribute('data-id', index.id);
    
    let todoItemText = document.createElement('span');
    todoItemText.innerText = index.task;
    todoItem.append(todoItemText);

    let deleteButtonItem = document.createElement('button');
    deleteButtonItem.innerHTML = '&#10005;';
    todoItem.append(deleteButtonItem);

    let checkboxItem = document.createElement('input');
    checkboxItem.setAttribute('type', 'checkbox');
    todoItem.prepend(checkboxItem);

    if (index.completed) {
      todoItem.classList.add('crossout');
      checkboxItem.setAttribute('checked' , 'checked');
    }
    
    todoList.append(todoItem);
  }
}

// Form Submit Add New 
addItemForm.addEventListener('submit', function(event) {
  event.preventDefault();

  let id = uid();

  let target = event.currentTarget;
  let todoItem = document.createElement('li');
  todoItem.classList.add('todo_item');
  todoItem.setAttribute('data-id', id);

  let todoItemText = document.createElement('span');
  todoItemText.innerText = target.querySelector('input').value;
  todoItem.append(todoItemText);

  let deleteButtonItem = document.createElement('button');
  deleteButtonItem.innerHTML = '&#10005;';
  todoItem.append(deleteButtonItem);

  let checkboxItem = document.createElement('input');
  checkboxItem.setAttribute('type', 'checkbox');
  todoItem.prepend(checkboxItem);

  todoList.append(todoItem);
  target.querySelector('input').value = '';

  let item = {id: id, completed: false, task: todoItemText.innerText};

  todo.push(item);
  
  localStorage.setItem('todo', JSON.stringify(todo));
});

// List event listeners (done and remove)
todoList.addEventListener('click', function(event) {
  if (event.target.tagName === "INPUT") {
    event.target.parentElement.classList.toggle('crossout');
    for (let index of todo ) {
      if (index.id === event.target.parentElement.getAttribute('data-id')){
        console.log(`Found!`, index.id);
        index.completed = index.completed ? false : true;
      }
    }
    localStorage.setItem('todo', JSON.stringify(todo));
  } 
  else if (event.target.tagName === "BUTTON") {
    event.target.parentElement.remove();
    for (let key in todo ) {
      if (todo[key].id === event.target.parentElement.getAttribute('data-id')){
        console.log(`Found item to delete!`, key);
        todo.splice(key, 1);
      }
    }
    localStorage.setItem('todo', JSON.stringify(todo));
  }
});

