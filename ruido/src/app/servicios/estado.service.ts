import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartGenerico, ChartLocalidad, ConsultaVisita, RdoEstado } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {


  private url = environment.ruidoURL;
  constructor(private http: HttpClient) { }

  consultaEstado(estado: RdoEstado): Observable<RdoEstado[]> {
    let direccion = this.url + "consultaEstado";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<RdoEstado[]>(direccion, estado, {
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
