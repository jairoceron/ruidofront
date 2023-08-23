import { Injectable } from '@angular/core';
import { AllTabsColumns, CategoriaI, CilindradaI, ClaseVehiculoI, EstadoEmisionI, Informacionvehiculo, LoginI, MarcaI, PesoVehiculoI, Placa, Propietariovehiculo, TipoCombustibleI, TipoServicioI } from '../modelos/login.interface'
import { ResponseI } from '../modelos/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  //http://localhost:8080/cimab/tablero/authenticate
  // url:string ='http://localhost:8080/cimab/tablero/';
  private url = environment.ruidoURL;


  behaviorSubjectPlaca = new BehaviorSubject('AAA000');
  observable = new Observable(observer => {
    setTimeout(() => observer.next('hello from Observable!'), 1000);
  });

  public placaObserv: Observable<string> = this.behaviorSubjectPlaca.asObservable();

  constructor(private http: HttpClient) { }


  generarEntityTableName(tableName : string): Observable<AllTabsColumns[]> {
    let direccion = this.url + "generarEntityTableName";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);
    return this.http.post<AllTabsColumns[]>(direccion, tableName, {
      'headers': customHeaders,
    });

  }
}