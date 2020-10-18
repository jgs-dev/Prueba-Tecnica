import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateTableService {
  public isPersonaCreated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
