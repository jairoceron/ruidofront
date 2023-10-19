import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pqrs, RuiSector, RuidoSector } from '../modelos/ruido.interface';


@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private url = environment.ruidoURL;
   constructor(private http:HttpClient) { }

  consultaSector(sector : RuiSector ) : Observable<RuidoSector[]>{
    let direccion = this.url + "consultaSector";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();       
    customHeaders =customHeaders.append('content-type','application/json');
    customHeaders =customHeaders.append('Authorization', lineax);

    return this.http.post<RuidoSector[]>(direccion, sector, {
      'headers':customHeaders ,
     });

  }

}
