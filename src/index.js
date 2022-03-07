import './styles.css';
// import { Todo } from './classes/todo.class';
// import { TodoList } from './classes/todo-list.class';
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

// Creamos instancia de una lista de todos
export const todoList = new TodoList();
// Creamos una nueva tarea
// const tarea = new Todo('Aprender JavaScript');
// Agregamos la tarea a la lista de tareas
// todoList.nuevoTodo(tarea);
// 
// crearTodoHtml(tarea);

// Trabajando con el LocalStorage y SessionStorage
// Únicamente se pueden guardar strings como llaves y valores
// localStorage.setItem('mi-key', 'ABC123');
// sessionStorage.setItem('mi-key', 'ABC123');

// Eliminar un valor del localStorage
// setTimeout(() => {
//     localStorage.removeItem('mi-key');
// }, 1500);

// Llamamos el método crearTodoHtml por cada todo del arreglo
// todoList.todos.forEach(todo => crearTodoHtml(todo));
// El elemento individual está llamando a la función y su argumentos es el primer argumento que regresa sólo un argumento
todoList.todos.forEach(crearTodoHtml);