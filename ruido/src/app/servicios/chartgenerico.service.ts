import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartGenerico, ConsultaVisita, CONS_NO_ES_COMPETE, CON_PROVISIONAL_ET } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartgenericoService {

  private url = environment.ruidoURL;
  constructor(private http: HttpClient) { }

  chartLoad(consultaVisita: ConsultaVisita): Observable<ChartGenerico[]> {
    let direccion = this.url + "chartNoEsCompetencia";

    if (consultaVisita.vistaSistema === CONS_NO_ES_COMPETE) {
      direccion = this.url + "chartNoEsCompetencia";
    }
    if (consultaVisita.vistaSistema === CON_PROVISIONAL_ET) {
      direccion = this.url + "chartProvisionalET";
    }

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<ChartGenerico[]>(direccion, consultaVisita, {
      'headers': customHeaders,
    });

  }

}
