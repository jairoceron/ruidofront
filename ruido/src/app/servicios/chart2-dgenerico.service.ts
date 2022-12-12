import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartBarVertical2D, ChartGenerico, ConsultaVisita, CONS_NO_ES_COMPETE, CON_PROVISIONAL_ET, PREDIO2D_NORMATIVI } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class Chart2DgenericoService {
  private url = environment.ruidoURL;
  constructor(private http: HttpClient) { }

  chartLoad(consultaVisita: ConsultaVisita): Observable<ChartBarVertical2D[]> {
 
    let direccion = this.url + "chart2dTipoPredioCumpliNorma";

    if (consultaVisita.vistaSistema = PREDIO2D_NORMATIVI) {
      direccion = this.url + "chart2dTipoPredioCumpliNorma";
    }


    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<ChartBarVertical2D[]>(direccion, consultaVisita, {
      'headers': customHeaders,
    });

  }

}
