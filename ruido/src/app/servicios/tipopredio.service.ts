import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartLocalidad, ConsultaVisita, RdoTipopredio } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class TipopredioService {

  private url = environment.ruidoURL;
  constructor(private http: HttpClient) { }

  consultaLocalidad(tipoPredio: RdoTipopredio): Observable<RdoTipopredio[]> {
    let direccion = this.url + "consultaTipopredio";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<RdoTipopredio[]>(direccion, tipoPredio, {
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
