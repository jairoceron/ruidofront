import { Injectable } from '@angular/core';
import { CategoriaI, CilindradaI, ClaseVehiculoI, EstadoEmisionI, EvaEtiquetado, Informacionvehiculo, LoginI, MarcaI, MetadataArchPDF, PesoVehiculoI, Placa, Propietariovehiculo, TipoCombustibleI, TipoServicioI, TipologiaVehicular } from '../modelos/login.interface'
import { ResponseI } from '../modelos/response.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, map, catchError } from 'rxjs';
import { CONSULTA_VISITA, CONSUL_TIPO_PREDIO, ConsultaVisita } from '../modelos/ruido.interface';


@Injectable({
  providedIn: 'root'
})
export class MicrosensorService {
    //http://localhost:8080/cimab/tablero/authenticate
    // url:string ='http://localhost:8080/cimab/tablero/';
    private url = environment.ruidoURL;
  
    showError = false;
    error = 'someError';
  
  
    behaviorSubjectPlaca = new BehaviorSubject('AAA000');
    observable = new Observable(observer => {
      setTimeout(() => observer.next('hello from Observable!'), 1000);
    });
  
    public placaObserv: Observable<string> = this.behaviorSubjectPlaca.asObservable();
  
    constructor(private http: HttpClient) { }
  
  
    calidadMicrosensor(): Observable<ClaseVehiculoI[]> {
      let consultavisita: ConsultaVisita = CONSULTA_VISITA; 
      let direccion = this.url + "calidadMicroSensor";
      let lineax = "Bearer " + localStorage.getItem("token");
      let customHeaders = new HttpHeaders();
      customHeaders = customHeaders.append('content-type', 'application/json');
      customHeaders = customHeaders.append('Authorization', lineax);
      return this.http.post<ClaseVehiculoI[]>(direccion, consultavisita, {
        'headers': customHeaders,
      });
  
    }
  
  
  }
  