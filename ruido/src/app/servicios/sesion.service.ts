import { Injectable } from '@angular/core';
import { LoginI } from '../modelos/login.interface'
import { ResponseI, VariableSesionI } from '../modelos/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { ConsultaVisita, CONSUL_TIPO_PREDIO, CONS_POR_DIRECCION, CONS_POR_ESTADOTRA, Pqrs, PQRS_POR_LOCALIDAD } from '../modelos/ruido.interface';




@Injectable({
  providedIn: 'root'
})
export class VarSesionService {

  // username:string= ''  ;
  // modulo:string='';
  private url = environment.ruidoURL;


  constructor(private http: HttpClient) { }


  encuentraModulo(username: string): Observable<VariableSesionI> {
    let direccion = this.url + "variableSesion";
    console.log("estara el token ?  ", localStorage.getItem("token"));

    let lineax = "Bearer " + localStorage.getItem("token");

    // let customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token")});

    let customHeaders = new HttpHeaders();

    customHeaders = customHeaders.append('content-type', 'application/json');
    //  customHeaders =customHeaders.append('Access-Control-Allow-Origin', '*')
    customHeaders = customHeaders.append('Authorization', lineax);
    console.log('004 ', customHeaders);


    // return this.http.post<VariableSesionI>(direccion, JSON.stringify(username), {
    return this.http.post<VariableSesionI>(direccion, username, {
      'headers': customHeaders,
    });

  }

  consultaVisita(consultaVisita: ConsultaVisita): Observable<Pqrs[]> {

    // 999999999999999999999999999
    let direccion = this.url + "consultaVisita";

    if (consultaVisita.vistaSistema === CONS_POR_DIRECCION) {
      // direccion = this.url + "consultaDirecVisita";
      direccion = this.url + "consultaDirecPqrs";
    }

    if (consultaVisita.vistaSistema === PQRS_POR_LOCALIDAD) {
      // direccion = this.url + "consultaDirecVisita";
      direccion = this.url + "consultaPorLocalidad";
     
    } 

    if (consultaVisita.vistaSistema === CONS_POR_ESTADOTRA) {
      // direccion = this.url + "consultaDirecVisita";
      direccion = this.url + "consultaPorEstadoTramite";
     // *****************************
     
    } 

    if (consultaVisita.vistaSistema === CONSUL_TIPO_PREDIO) {
      // direccion = this.url + "consultaDirecVisita";
      direccion = this.url + "consultaPorTipoPredioVisita";
     // *****************************
     
    } 

    
    
    

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);
    console.log('Con esto me voy :::::>> ' + consultaVisita.fechaFinal + ' --- direccion :: ' + consultaVisita.direccion);

    return this.http.post<Pqrs[]>(direccion, consultaVisita, {
      'headers': customHeaders,
    });

  }

}
