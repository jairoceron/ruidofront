import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pqrs } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {
  listPqrs: Pqrs[] = [];

  /*
     Cuando se consulta un servicio que tiene que ver con
     listPqrs:  Es la lista de la última consulta sobre los PQRS ... 
  */

     private pqrsBehSub : BehaviorSubject<Pqrs[]> = new BehaviorSubject<Pqrs[]>([]);   
     public pqrsObser : Observable<Pqrs[]> = this.pqrsBehSub.asObservable();


  constructor() { }
}
