import { ServerService } from './services/server.service';
import { Component } from '@angular/core';
import { Persona } from './classes/Persona';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * variable for the grid background-color
   */
  color = "#F0F0F0"

  personas: Persona[] = []



  constructor(private serverService: ServerService) {

  }

  createPersona() {
    const persona = {
      cedula: 1014259965,
      nombre: "Test Angular",
      apellido: "App"
    }

    this.serverService.createPersona(persona).then((res) => {
      console.log("creo la persona", res)
      this.readPersonas()
    })
  }

  private readPersonas() {

    this.serverService.readPersonas().then((data: any) => {
      console.log("-----------------")
      console.log(typeof data, data)
      this.personas = data.map(persona => {
        return new Persona(persona.id, persona.cedula, persona.nombre, persona.apellido)
      })

      console.log("-----------------")
    })

  }

  updatePersona() {
    const persona = {
      id: 9,
      cedula: 123456,
      nombre: "cambiado",
      apellido: "cambiada"
    }
    this.serverService.updatePersona(persona).then((res) => {
      console.log(res)
      this.readPersonas()
    })
  }

  deletePersona() {
    const id = {
      id: 9
    }
    this.serverService.deletePersona(id).then((res) => {
      console.log(res)
      this.readPersonas()
    })
  }

  mostrarPersonas() {
    this.personas.map((persona) => {
      console.log(persona)
    })
  }



}
