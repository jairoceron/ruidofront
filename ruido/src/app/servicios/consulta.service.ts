import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultaVisita, Pqrs, RdoVisita, Visitas } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  // consultaVisita: ConsultaVisita
// {fechaInicial:new Date, fechaFinal:new Date, radicado:'xx'}

  private consultaBehSub : BehaviorSubject<ConsultaVisita> = new BehaviorSubject( {fechaInicial:new Date, fechaFinal:new Date, radicado:'xx', vistaSistema:''});   
  public  consultaObserv : Observable<ConsultaVisita> = this.consultaBehSub.asObservable();

  constructor() { }

  setConsultaActual(consultaVisita: ConsultaVisita) {
    this.consultaBehSub.next(consultaVisita);
  }

}
