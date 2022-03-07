import { Todo } from "../classes";
// Importamos la instancia del todo
import { todoList } from "..";

// Referenicas HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

// Método para crear un todo en el HTML
export const crearTodoHtml = (todo) => {
    // Las `` permiten la multilínea y la interpolación de string, permitiendo agregar variables y código JavaScript
    const htmlTodo = `
    <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    // Creamos el elemento HTML
    // Apesar de querer crear un <li>, se crea un <div> para contener a la lista ordenada 
    const div = document.createElement('div');
    // Agregamos nuestro elemento del todo en el div
    div.innerHTML = htmlTodo;

    // Insertamos únicamente el primer elemento hijo que contiene nuestro <div>, siendo toda la etiqueta <li>
    divTodoList.append(div.firstElementChild);

    // Retornamos el <li> para en otro lugar hacer la inserción
    return div.firstElementChild;
}

// Eventos
// keyup = Cuando la persona suena la tecla
// event nos dice qué tecla presionó el usuario
txtInput.addEventListener('keyup', (event) => {
    // Evaluamos si se presionó la tecla Enter en base a su código de tecla
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        // Todos los objetos pasan por referencia
        // Añadimos el todo creado a la lista de todos
        todoList.nuevoTodo(nuevoTodo);
        // Creamos el elemento HTML según el nuevo todo
        crearTodoHtml(nuevoTodo);
        // Borramos el texto después de haber hecho Enter
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    // Usamos el evento click para conocer el target (elemento HTML completo) al cual se le ha clickado
    // console.log(event.target);
    // Obtenemos únicamente el nombre de la etiqueta
    // console.log(event.target.localName);
    const nombreElemento = event.target.localName;
    // Referencia al <li> para eliminarlo (elemento padre del target que ha sido clickado)
    const todoElemento = event.target.parentElement.parentElement;
    // Extraemos el id del todo con el atributo HTML
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        // Marcar como completado el todo
        // Click en el check
        todoList.marcarCompletado(todoId);
        // Agregar o cambiar una clase HTML
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        // Borramos el todo en el arreglo
        todoList.eliminarTodo(todoId);
        // Borramos la referencia HTML
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener('click', () => {
    // Elimina los todos del arreglo de la clase
    todoList.eliminarCompletados();
    // Eliminamos las referencias HTML barriendo de abajo hacia arriba
    for (let i = divTodoList.children.length - 1; i > -1; i--) {
        // Obtenemos el elemento <li> hijo del div en esa posición
        const elemento = divTodoList.children[i];
        // Revisamos si el elemento está completado con la clase completed
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    // Identificamos la zona a la que se ha adao click
    const filtro = event.target.text;
    if (!filtro) { return; }

    anchorFiltros.forEach(elemento => elemento.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        // Quitar la clase hidden
        elemento.classList.remove('hidden');
        // Preguntamos si la tarea ha sido completada
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                // Todos los elementos completados, clase hidden
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                // Si no lo está, se le agrega
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
            default:
                // No hace nada y muestra todos los todos
                break;
        }
    }
});