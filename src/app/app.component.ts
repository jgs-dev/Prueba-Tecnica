import { ServerService } from './services/server.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from './classes/Persona';
import { FormBuilder, Validators, Form, FormGroup } from '@angular/forms';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   * @var color variable for the grid background-color
   */
  color = "#F0F0F0"

  /**
   * @var displayedColumns order of data to show in the table
   */
  displayedColumns: string[] = ["id", "cedula", "nombre", "apellido", "editar", "eliminar"]

  personas: Persona[] = []



  constructor(private serverService: ServerService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.readPersonas()
  }

  personaForm = this.formBuilder.group({
    cedula: ["", [Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]*$/)]],
    nombre: ["", [Validators.required, Validators.pattern(/^([a-zA-Z]+\s*[a-zA-Z]+){1,}$/)]],
    apellido: ["", [Validators.required, Validators.pattern(/^([a-zA-Z]+\s*[a-zA-Z]+){1,}$/)]]
  })

  modalForm = this.formBuilder.group({
    cedula: ["", [Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]*$/)]],
    nombre: ["", [Validators.required, Validators.pattern(/^([a-zA-Z]+\s*[a-zA-Z]+){1,}$/)]],
    apellido: ["", [Validators.required, Validators.pattern(/^([a-zA-Z]+\s*[a-zA-Z]+){1,}$/)]]
  })

  createPersona() {
    const persona = {
      cedula: +this.personaForm.get("cedula").value,
      nombre: this.personaForm.get("nombre").value,
      apellido: this.personaForm.get("apellido").value
    }

    this.serverService.createPersona(persona).then((res) => {
      console.log("creo la persona", res)
      this.readPersonas()
    })
  }

  private readPersonas() {

    this.serverService.readPersonas().then((data: any) => {

      this.personas = data.map(persona => {
        return persona
      })

    })

  }

  updatePersona(persona) {

    const auxPersona = {
      id: persona.id,
      cedula: persona.cedula,
      nombre: persona.nombre,
      apellido: persona.apellido
    }
    this.serverService.updatePersona(persona).then((res) => {
      console.log(res)
      this.readPersonas()
    })
  }

  deletePersona(id) {
    const data = {
      id: id
    }
    this.serverService.deletePersona(data).then((res) => {
      console.log(res)
      this.readPersonas()
    })
  }

  mostrarPersonas() {
    this.personas.map((persona) => {
      console.log(persona)
    })
  }

  openModal(element, content) {

    this.modalForm.controls["nombre"].setValue(element.nombre)
    this.modalForm.controls["cedula"].setValue(element.cedula)
    this.modalForm.controls["apellido"].setValue(element.apellido)

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      const persona = {
        id: element.id,
        cedula: this.modalForm.get("cedula").value,
        nombre: this.modalForm.get("nombre").value,
        apellido: this.modalForm.get("apellido").value
      }
      this.updatePersona(persona)

    }, (reason) => {
      console.error(reason)
      alert("No se pudo editar!")
    });
  }

  closeModal() {
    this.modalService.dismissAll()
  }
}
