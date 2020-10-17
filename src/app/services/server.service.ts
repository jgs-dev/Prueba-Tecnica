import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

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

  createPersona(data) {
    return this.request('POST', `${environment.serverUrl}`, data)
  }

  readPersona() {
    return this.request('GET', `${environment.serverUrl}`)
  }

  updatePersona(data) {
    return this.request('PUT', `${environment.serverUrl}`, data)
  }

  deletePersona(data) {
    return this.request('DELETE', `${environment.serverUrl}`, data)
  }


}
