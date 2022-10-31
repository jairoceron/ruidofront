import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modulousuario, RdoProfesional } from '../modelos/ruido.interface';

@Injectable({
  providedIn: 'root'
})
export class ModulousuarioService {



  private url = environment.ruidoURL;
  constructor(private http: HttpClient) { }

  cargaModuloUsuario(): Observable<Modulousuario[]> {
    let direccion = this.url + "cargaModuloUsuario";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let username: string = localStorage.getItem("username") || '';

    return this.http.post<Modulousuario[]>(direccion, username, {
      'headers': customHeaders,
    });

  } 


}
