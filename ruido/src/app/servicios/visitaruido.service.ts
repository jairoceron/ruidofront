import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultaVisita, Pqrs, Visitas } from '../modelos/ruido.interface';

//+++++++++++++++++++++++++++++

@Injectable({
  providedIn: 'root'
})
export class VisitaruidoService {

//  visita : Visitas[] = [];

  private url = environment.ruidoURL;
  private visitaBehSub : BehaviorSubject<Visitas[]> = new BehaviorSubject<Visitas[]>([]);   

  public visitaObser : Observable<Visitas[]> = this.visitaBehSub.asObservable();

  constructor(private http:HttpClient) { }

  consultaVisita(consultaVisita: ConsultaVisita): Observable<Visitas[]> { 
    let direccion = this.url + "visitaPorRadicado";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();       
    customHeaders =customHeaders.append('content-type','application/json');
    customHeaders =customHeaders.append('Authorization', lineax);

    return this.http.post<Visitas[]>(direccion, consultaVisita, {
      'headers':customHeaders ,
     });

  } 

  actualizaInfoVisiPorRadicado(consultaVisita : ConsultaVisita) {

    this.consultaVisita(consultaVisita).subscribe(x => {
        x;
        this.visitaBehSub.next(x);
        console.log('Hace la actualizacion de las consultas ... ', x);
    
    });

  }

  
}
