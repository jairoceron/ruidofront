import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartGenerico, ChartLocalidad, ConsultaVisita, ObserEstTramite, RdoEstado, RdoEstadoTramite } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {


  private url = environment.ruidoURL;
  constructor(private http: HttpClient) { }



  
  consultaEstado(estado:  RdoEstadoTramite): Observable<RdoEstadoTramite[]> {
   // **************
    let direccion = this.url + "consultaEstado";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post< RdoEstadoTramite[]>(direccion, estado, {
      'headers': customHeaders,
    });

  }

  consultaObsEstadoTram(estado:  RdoEstadoTramite): Observable<ObserEstTramite[]> {
    console.log('estado :::: ' , estado);
     let direccion = this.url + "observacionTramite";
     let lineax = "Bearer " + localStorage.getItem("token");
     let customHeaders = new HttpHeaders();
     customHeaders = customHeaders.append('content-type', 'application/json');
     customHeaders = customHeaders.append('Authorization', lineax);
 
     return this.http.post< ObserEstTramite[]>(direccion, estado, {
       'headers': customHeaders,
     });
 
   }

  chartEstadoTramite(consultaLocalidad: ConsultaVisita): Observable<ChartGenerico[]> {
    let direccion = this.url + "chartEstadoTramite";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<ChartGenerico[]>(direccion, consultaLocalidad, {
      'headers': customHeaders,
    });

  }


}
