import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RdoAsunto } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class AsuntoService {

  private url = environment.ruidoURL;
  constructor(private http: HttpClient) { }

  consultaAsunto(asunto: RdoAsunto): Observable<RdoAsunto[]> {
    let direccion = this.url + "consultaAsunto";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<RdoAsunto[]>(direccion, asunto, {
      'headers': customHeaders,
    });

  }
}
