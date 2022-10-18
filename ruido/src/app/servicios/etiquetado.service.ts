import { Injectable } from '@angular/core';
import {CategoriaI, CilindradaI, ClaseVehiculoI, EstadoEmisionI, LoginI, PesoVehiculoI, TipoCombustibleI} from '../modelos/login.interface'
import {ResponseI} from '../modelos/response.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtiquetadoService {
  //http://localhost:8080/cimab/tablero/authenticate
  // url:string ='http://localhost:8080/cimab/tablero/';
  private url = environment.ruidoURL;

  constructor(private http:HttpClient) { }
  
  
  listClaseVehiculo():Observable<ClaseVehiculoI[]> {
        let direccion = this.url + "listClaseVehiculo";
        let lineax = "Bearer " + localStorage.getItem("token");
        let customHeaders = new HttpHeaders();
        customHeaders =customHeaders.append('content-type','application/json');
        customHeaders =customHeaders.append('Authorization', lineax);
        return this.http.post<ClaseVehiculoI[]>(direccion,'', {
            'headers':customHeaders ,});
           
  }

  listTipoCombustible(idclasevehiculo : number):Observable<TipoCombustibleI[]> {
    let direccion = this.url + "listTipoCombustible";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders =customHeaders.append('content-type','application/json');
    customHeaders =customHeaders.append('Authorization', lineax);

    return this.http.post<TipoCombustibleI[]>(direccion, idclasevehiculo,  {
        'headers':customHeaders ,});
       
}

listEstadoEmision(idclasevehiculo : number):Observable<EstadoEmisionI[]> {
  let direccion = this.url + "listEstadoEmision";
  let lineax = "Bearer " + localStorage.getItem("token");
  let customHeaders = new HttpHeaders();
  customHeaders =customHeaders.append('content-type','application/json');
  customHeaders =customHeaders.append('Authorization', lineax);

  return this.http.post<EstadoEmisionI[]>(direccion, idclasevehiculo,  {
      'headers':customHeaders ,});
     
}

listCilindrada(idclasevehiculo : number):Observable<CilindradaI[]> {
  let direccion = this.url + "listCilindrada";
  let lineax = "Bearer " + localStorage.getItem("token");
  let customHeaders = new HttpHeaders();
  customHeaders =customHeaders.append('content-type','application/json');
  customHeaders =customHeaders.append('Authorization', lineax);

  return this.http.post<CilindradaI[]>(direccion, idclasevehiculo,  {
      'headers':customHeaders ,});
     
}

listCategoria(idclasevehiculo : number):Observable<CategoriaI[]> {
  let direccion = this.url + "listCategoria";
  let lineax = "Bearer " + localStorage.getItem("token");
  let customHeaders = new HttpHeaders();
  customHeaders =customHeaders.append('content-type','application/json');
  customHeaders =customHeaders.append('Authorization', lineax);

  return this.http.post<CategoriaI[]>(direccion, idclasevehiculo,  {
      'headers':customHeaders ,});
     
}

listPesoVehiculo(idclasevehiculo : number):Observable<PesoVehiculoI[]> {
  let direccion = this.url + "listPesovehiculo";
  let lineax = "Bearer " + localStorage.getItem("token");
  let customHeaders = new HttpHeaders();
  customHeaders =customHeaders.append('content-type','application/json');
  customHeaders =customHeaders.append('Authorization', lineax);

  return this.http.post<PesoVehiculoI[]>(direccion, idclasevehiculo,  {
      'headers':customHeaders ,});
     
}

}
