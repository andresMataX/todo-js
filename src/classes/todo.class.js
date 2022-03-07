// Clase dedicada para creación de ToDos

// exportamos la clase para poderse usar fuera del archivo
export class Todo {
    // constructor para recibir la descripción de la tarea
    constructor(tarea) {
        this.tarea = tarea;
        // usamos la representación de horas, minutos, segundos como identificador de tarea
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }

    // Si necesitáramos usar métodos de clase con los todos que ya no son instancias, no podríamos
    // imprimirClase(){
    //     console.log(`${this.tarea} - ${this.id}`);
    // }
    // Cuando leemos del localStorage, perdemos los métodos de lo que estemos guardando ahí, las propiedades no
    // Creamos una nueva instancia en base a valores que vienen del localStorage
    // Desestructuramos el objeto
    static fromJson({ id, tarea, completado, creado }) {
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        // Regresamos la instancia
        return tempTodo;
    }
}