import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RdoTipopredio, Sbccalidad } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class SbccalidadService {

  private url = environment.ruidoURL;


  constructor(private http: HttpClient) { }

  consultaLocalidad(sbccalidad: Sbccalidad): Observable<Sbccalidad[]> {
    let direccion = this.url + "consultaSbccalidad";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<Sbccalidad[]>(direccion, sbccalidad, {
      'headers': customHeaders,
    });

  }

  
}
