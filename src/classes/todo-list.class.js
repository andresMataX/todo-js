// Clase dedicada para el manejo de la lista de ToDos

import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        // También pudo haber sido un Objeto
        // this.todos = [];
        this.cargarLocalStorage();
    }

    // Creamos una instancia de un todo que recibamos para agregarlo en el arreglo
    nuevoTodo(todo) {
        this.todos.push(todo);
        // Guardamos el cambio
        this.guardarLocalStorage();
    }

    // Eliminamos un todo en base a su id
    eliminarTodo(id) {
        // Método de los arreglos
        // Función callback y tenemos un todo individual que regresa un nuevo arreglo excluyendo el todo que hayamos eliminado
        this.todos = this.todos.filter(todo => todo.id != id);
        // Guardamos el cambio
        this.guardarLocalStorage();
    }

    // Cambiar el estado del todo de no marcado a marcado
    marcarCompletado(id) {
        // Barremos los elementos del arreglo
        for (const todo of this.todos) {
            // Comparamos que sean el mismo, pero no el tipo de dato idéntico
            if (todo.id == id) {
                todo.completado = !todo.completado;
                // Guardamos el cambio
                this.guardarLocalStorage();
                break;
            }
        }
    }

    // Barremos el arreglo eliminando todos los todo que estén completados
    eliminarCompletados() {
        // Retornamos todos los que tengan el inverso a estar completado
        this.todos = this.todos.filter(todo => !todo.completado);
        // Guardamos el cambio
        this.guardarLocalStorage();
    }

    // Hacemos persistente la información de los todos en el dominio de la aplicación
    guardarLocalStorage() {
        // Para almacenar en el local storage deben de ser strings
        // La representación de un objeto en string es "[object Object]"
        // localStorage.setItem('todo', this.todos);
        // Transformar los todos (objeto) en JSON
        localStorage.setItem('todo', JSON.stringify(this.todos));

    }

    // Leemos los JSON de los todos
    cargarLocalStorage() {
        /** if (localStorage.getItem('todo')) {
              Recuperar el objeto original antes al JSON usando el método inverso a stringify
             this.todos = JSON.parse(localStorage.getItem('todo'));
             console.log(this.todos);
         } else {
              Pudo el usuario borrar la caché del localStorage
             this.todos = [];
         }*/
        // Verificamos si el objeto existe
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];

        // Barremos los elementos de un arreglo y retornar un nuevo arreglo con sus elementos mutados
        // this.todos = this.todos.map(obj => Todo.fromJson(obj));
        this.todos = this.todos.map(Todo.fromJson);
    }
}