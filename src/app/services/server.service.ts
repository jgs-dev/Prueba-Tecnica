import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  /**
   * creates a request to the database, with the method to do, and the information neccessary to do it
   * @param method POST,GET,PUT or delete to do a REST call
   * @param url server url (localhost in this case)
   * @param data information to manipulate in the database 
   */
  private async request(method: string, url: string, data?: any) {

    const result = this.http.request(method, url, {

      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {}
    })

    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject)
    })
  }

  /**
   * generate a request to add a persona
   * @param data JSON data with id,cedula,nombre,apellido
   */
  createPersona(data) {
    return this.request('POST', `${environment.serverUrl}`, data)
  }

  /**
   * generate a request to get a persona
   * @param data JSON data with id
   */
  readPersona(data) {
    return this.request('GET', `${environment.serverUrl}`,data)
  }

  /**
   * generate a request to get all the data in the database
   */
  readPersonas() {
    return this.request('GET', `${environment.serverUrl}`)
  }

  /**
   * generate a request to update a persona
   * @param data JSON data with id,cedula,nombre,apellido
   */
  updatePersona(data) {
    return this.request('PUT', `${environment.serverUrl}`, data)
  }

  /**
   * generate a request to delete a persona
   * @param data JSON data with id
   */
  deletePersona(data) {
    return this.request('DELETE', `${environment.serverUrl}`, data)
  }


}
