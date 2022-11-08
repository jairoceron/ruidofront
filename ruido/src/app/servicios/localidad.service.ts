import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartLocalidad, ConsultaVisita, RuiLocalidad, RuiSector } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  private url = environment.ruidoURL;
  constructor(private http: HttpClient) { }

  consultaLocalidad(localidad: RuiLocalidad): Observable<RuiLocalidad[]> {
    let direccion = this.url + "consultaLocalidad";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<RuiLocalidad[]>(direccion, localidad, {
      'headers': customHeaders,
    });

  }

  consultaChartLocalidad(consultaLocalidad: ConsultaVisita): Observable<ChartLocalidad[]> {
    let direccion = this.url + "chartlocalidad";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<ChartLocalidad[]>(direccion, consultaLocalidad, {
      'headers': customHeaders,
    });

  }

}
