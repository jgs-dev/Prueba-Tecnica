import { UpdateTableService } from './services/update-table.service';
import { ServerService } from './services/server.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private serverService: ServerService, private formBuilder: FormBuilder, private modalService: NgbModal, private updateTableService: UpdateTableService) { }

  ngOnInit() { }

  personaForm = this.formBuilder.group({
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
      this.updateTableService.isPersonaCreated.next(true)
      console.log(res)
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
    })
  }

  deletePersona(id) {
    const data = {
      id: id
    }
    this.serverService.deletePersona(data).then((res) => {
      console.log(res)
    })
  }
}
