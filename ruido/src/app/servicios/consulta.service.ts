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

 /* 
consultaVisita : ConsultaVisita = {fechaInicial:new Date,
  fechaFinal:new Date, 
  radicado:'xx',
  vistaSistema:'',
  direccion:'',}*/

  consultaVisita : ConsultaVisita = new ConsultaVisita();

  /*
private consultaBehSub : BehaviorSubject<ConsultaVisita> = new BehaviorSubject( {
    fechaInicial:new Date,
    fechaFinal:new Date, 
    radicado:'xx',
    vistaSistema:'',
    direccion:'',
    });    */

    private consultaBehSub : BehaviorSubject<ConsultaVisita> = new BehaviorSubject( 
      new ConsultaVisita()
    );  


  public  consultaObserv : Observable<ConsultaVisita> = this.consultaBehSub.asObservable();

  constructor() { }

  setConsultaActual(consultaVisita: ConsultaVisita) {
    this.consultaVisita.fechaFinal = consultaVisita.fechaFinal;
    this.consultaVisita.fechaInicial = consultaVisita.fechaInicial;
    this.consultaBehSub.next(this.consultaVisita);
  }

  updateDireccion(direccion : string) {
    console.log('la consulta::: ' , this.consultaVisita);
    this.consultaVisita.direccion = direccion;
  }
  
  setVistaSistema(vistaSistema : string) {
    this.consultaVisita.vistaSistema = vistaSistema;
  }

  updateLocalidad(localidad : string) {
    this.consultaVisita.localidad = localidad;
  }

  updateEstadoTramite(estadoTramite : string) {
    this.consultaVisita.estadoTramite = estadoTramite;
  }

  updateTipoPredio(tipoPredio : string) {
    this.consultaVisita.tipoPredio = tipoPredio;
   // ****************
  }

}
