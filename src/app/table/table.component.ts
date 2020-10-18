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

  /**
   * @var personas array of Persona from the database
   */
  personas: Persona[] = []

  constructor(private serverService: ServerService, private formBuilder: FormBuilder, private modalService: NgbModal, public updateTableService: UpdateTableService) {
    this.updateTableService.isPersonaCreated.subscribe(value => {
      this.readPersonas()
    })
  }

  /**
   * @var modalForm restrictions for the edition of the "person"
   */
  modalForm = this.formBuilder.group({
    cedula: ["", [Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]*$/)]],
    nombre: ["", [Validators.required, Validators.pattern(/^([a-zA-Z]+\s*[a-zA-Z]+){1,}$/)]],
    apellido: ["", [Validators.required, Validators.pattern(/^([a-zA-Z]+\s*[a-zA-Z]+){1,}$/)]]
  })


  ngOnInit(): void {
    this.readPersonas() // start the component reading the data from the database
  }

  /**
   * calls the GET method from REST to get all data in the database
   */
  private readPersonas() {
    this.serverService.readPersonas().then((data: any) => {
      this.personas = data.map(persona => {
        return persona
      })
    })
  }

  /**
   * calls the PUT method from REST to update a person in the database, then updates the table
   * @param persona a JSON object with all the info to replace
   */
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

  /**
   * calls the DELETE method from REST to delete a person in the database, then updates the table
   * @param id identification of the person to delete
   */
  deletePersona(id) {
    const data = {
      id: id
    }
    this.serverService.deletePersona(data).then((res) => {
      console.log(res)
      this.readPersonas()
    })
  }

  /**
   * opens a modal to change data of a selected person, then calls the update method
   * @param element all the info of the person to edit
   * @param content body of the modal defined in the html component
   */
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
  /**
   * closes the modal
   */
  closeModal() {
    this.modalService.dismissAll()
  }

}
