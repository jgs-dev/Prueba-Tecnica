export class Persona {
    id: number
    cedula: number
    nombre: string
    apellido: string

    constructor(id, cedula, nombre, apellido) {
        this.id = id
        this.cedula = cedula
        this.nombre = nombre
        this.apellido = apellido
    }

    getId() {
        return this.id
    }

    getCedula() {
        return this.cedula
    }

    getNombre() {
        return this.nombre
    }

    getApellido() {
        return this.apellido
    }

    setCedula(cedula) {
        this.cedula = cedula
    }

    setNombre(nombre) {
        this.nombre = nombre
    }
    setApellido(apellido) {
        this.apellido = apellido
    }



}