import { Injectable } from '@angular/core';
import {LoginI} from '../modelos/login.interface'
import {ResponseI} from '../modelos/response.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //http://localhost:8080/cimab/tablero/authenticate
  // url:string ='http://localhost:8080/cimab/tablero/';
  private url = environment.ruidoURL;

  constructor(private http:HttpClient) { }
  
  
  loginByEmail(form:LoginI):Observable<ResponseI> {
        let direccion = this.url + "authenticate";
        return this.http.post<ResponseI>(direccion,form);
           
  }


}
