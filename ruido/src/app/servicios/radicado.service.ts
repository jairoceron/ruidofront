import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultaVisita, Pqrs, Visitas } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class RadicadoService {
  private url = environment.ruidoURL;


  constructor(private http:HttpClient) { }

  guardarRadicado(pqrs : Pqrs) : Observable<Pqrs>{
    let direccion = this.url + "guardaRadicado";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();       
    customHeaders =customHeaders.append('content-type','application/json');
    customHeaders =customHeaders.append('Authorization', lineax);

    return this.http.post<Pqrs>(direccion, pqrs, {
      'headers':customHeaders ,
     });

  }

  updateRadicado(pqrs : Pqrs) : Observable<Pqrs>{
    let direccion = this.url + "updateRadicado";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();       
    customHeaders =customHeaders.append('content-type','application/json');
    customHeaders =customHeaders.append('Authorization', lineax);

    return this.http.post<Pqrs>(direccion, pqrs, {
      'headers':customHeaders ,
     });

  }

  

  consultaRadicado(strRadicado : string) : Observable<Pqrs> {
    let direccion = this.url + "consultaRadicado";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();       
    customHeaders =customHeaders.append('content-type','application/json');
    customHeaders =customHeaders.append('Authorization', lineax);
    let pqrs : Pqrs = {
      objectid : -1,
      radicado:strRadicado, asunto_radicacion:'' , sector_reportado:'', localidad : '' ,
     estado_tramite : 1,
     observaciones_estado_tramite : '',
     fecha_radicado : new Date() ,
    } 

// 9999999999999999999999999

    return this.http.post<Pqrs>(direccion, pqrs, {
      'headers':customHeaders ,
     });
  }



}
