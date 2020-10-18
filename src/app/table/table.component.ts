import { UpdateTableService } from './../services/update-table.service';
import { ServerService } from './../services/server.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from './../classes/Persona';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ["id", "cedula", "nombre", "apellido", "editar", "eliminar"]

  personas: Persona[] = []
  /**
   * @var personaCreated check if there was a creation of a person (added to the database)
   */


  constructor(private serverService: ServerService, private formBuilder: FormBuilder, private modalService: NgbModal, public updateTableService: UpdateTableService) {
    this.updateTableService.isPersonaCreated.subscribe(value => {
      this.readPersonas()
    })
  }


  modalForm = this.formBuilder.group({
    cedula: ["", [Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]*$/)]],
    nombre: ["", [Validators.required, Validators.pattern(/^([a-zA-Z]+\s*[a-zA-Z]+){1,}$/)]],
    apellido: ["", [Validators.required, Validators.pattern(/^([a-zA-Z]+\s*[a-zA-Z]+){1,}$/)]]
  })

  ngOnInit(): void {
    this.readPersonas()
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
