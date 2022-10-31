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

  

  consultaRadicado(strRadicado : string) {
    let direccion = this.url + "consultaRadicado";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();       
    customHeaders =customHeaders.append('content-type','application/json');
    customHeaders =customHeaders.append('Authorization', lineax);
    let pqrs : Pqrs = {radicado:strRadicado} 

// 9999999999999999999999999

    return this.http.post<Pqrs>(direccion, pqrs, {
      'headers':customHeaders ,
     });
  }



}
