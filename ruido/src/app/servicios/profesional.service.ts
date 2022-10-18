import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RdoEstado, RdoProfesional } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {



  private url = environment.ruidoURL;
  constructor(private http: HttpClient) { }

  consultaProfesionales(profesional: RdoProfesional): Observable<RdoProfesional[]> {
    let direccion = this.url + "consultaProfesional";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<RdoProfesional[]>(direccion, profesional, {
      'headers': customHeaders,
    });

  }
}
