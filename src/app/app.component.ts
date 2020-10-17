import { ServerService } from './services/server.service';
import { Component } from '@angular/core';

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

  constructor(private serverService: ServerService) {

  }

  createPersona() {
    const persona = {
      cedula: 1014259965,
      nombre: "Test Angular",
      apellido: "App"
    }

    this.serverService.createPersona(persona).then(() => {
      console.log("creo la persona")
    })
  }

  private readPersonas() {

  }

  updatePersona() {

  }

  deletePersona() {

  }




}
