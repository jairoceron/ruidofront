import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultaVisita, GRAFICA_TIPO_PIE, Pqrs, RdoVisita, Visitas } from '../modelos/ruido.interface';

//+++++++++++++++++++++++++++++

@Injectable({
  providedIn: 'root'
})
export class VisitaruidoService {

//  visita : Visitas[] = [];

  private url = environment.ruidoURL;
  private visitaBehSub : BehaviorSubject<Visitas[]> = new BehaviorSubject<Visitas[]>([]);   
  public visitaObser : Observable<Visitas[]> = this.visitaBehSub.asObservable();


  private pqrBehSub : BehaviorSubject<Pqrs> = new BehaviorSubject<Pqrs>({
    objectid : -1,
    radicado:'', 
  asunto_radicacion : '', sector_reportado : '' , localidad : '', estado_tramite :1,
  observaciones_estado_tramite : '',
  fecha_radicado : new Date() ,

});
  public  pqrObserv : Observable<Pqrs> = this.pqrBehSub.asObservable();


  public consultaVisitaV : ConsultaVisita = {
    fechaInicial:new Date(),
    fechaFinal:new Date(), 
    radicado:'' , 
    vistaSistema:'',
    direccion:'',
    localidad:'',
    estadoTramite:'',
    tipoPredio:'',
    tipoChart :GRAFICA_TIPO_PIE,
    isCbCVencido : false,
    isCbCPxVenci : false,
    isCbCPxSinVe : false,
    peticionario : '',
    observacionEstadoTramite :  '',
    };

  constructor(private http:HttpClient) { }

  setConsultaVisitaV(consultaVisitaX : ConsultaVisita) {
    this.consultaVisitaV = consultaVisitaX;
  }
  
  getConsultaVisitaV() : ConsultaVisita {
    return this.consultaVisitaV;
  }

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
       
    
    });

  }
  

  pqrsActual(pqrs : Pqrs) {
    this.pqrBehSub.next(pqrs);
    // actualizo el Behavior subject con el pqrs actual.
  }


  guardaVisita(rdoVisita: RdoVisita): Observable<RdoVisita> { 
    let direccion = this.url + "guardaVisita";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();       
    customHeaders =customHeaders.append('content-type','application/json');
    customHeaders =customHeaders.append('Authorization', lineax);

    return this.http.post<RdoVisita>(direccion, rdoVisita, {
      'headers':customHeaders ,
     });

  } 

  guardaVisitaXX(visita: Visitas): Observable<Visitas> { 
    let direccion = this.url + "guardaVisitaXX";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();       
    customHeaders =customHeaders.append('content-type','application/json');
    customHeaders =customHeaders.append('Authorization', lineax);

    return this.http.post<Visitas>(direccion, visita, {
      'headers':customHeaders ,
     });

  }

  consultaVisitasProfesional() : Observable<RdoVisita[]> { 
    let direccion = this.url + "consultaVisitasProfesional";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();       
    customHeaders =customHeaders.append('content-type','application/json');
    customHeaders =customHeaders.append('Authorization', lineax);
    let username = localStorage.getItem("username") ;
   
    return this.http.post<RdoVisita[]>(direccion, username, {
      'headers':customHeaders ,
     });

  } 

  consultaVisitasProfesionalXX() : Observable<Visitas[]> { 
    let direccion = this.url + "consultaVisitasProfesionalXX";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();       
    customHeaders =customHeaders.append('content-type','application/json');
    customHeaders =customHeaders.append('Authorization', lineax);
    let username = localStorage.getItem("username") ;
    
    return this.http.post<Visitas[]>(direccion, username, {
      'headers':customHeaders ,
     });

  } 
  
}
