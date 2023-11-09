import { Injectable } from '@angular/core';
import { CategoriaI, CilindradaI, ClaseVehiculoI, EstadoEmisionI, EvaEtiquetado, Informacionvehiculo, LoginI, MarcaI, MetadataArchPDF, PesoVehiculoI, Placa, Propietariovehiculo, TipoCombustibleI, TipoServicioI, TipologiaVehicular } from '../modelos/login.interface'
import { ResponseI } from '../modelos/response.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, map, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EtiquetadoService {
  //http://localhost:8080/cimab/tablero/authenticate
  // url:string ='http://localhost:8080/cimab/tablero/';
  private url = environment.ruidoURL;

  showError = false;
  error = 'someError';


  behaviorSubjectPlaca = new BehaviorSubject('AAA000');
  observable = new Observable(observer => {
    setTimeout(() => observer.next('hello from Observable!'), 1000);
  });

  public placaObserv: Observable<string> = this.behaviorSubjectPlaca.asObservable();

  constructor(private http: HttpClient) { }


  listClaseVehiculo(): Observable<ClaseVehiculoI[]> {
    let direccion = this.url + "listClaseVehiculo";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);
    return this.http.post<ClaseVehiculoI[]>(direccion, '', {
      'headers': customHeaders,
    });

  }

  listTipoServicio(): Observable<TipoServicioI[]> {
    let direccion = this.url + "listTipoServicio";  
    console.log(direccion)
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    // console.log('Tipo de servicio !!!!!!!!! ' , direccion, '--- ' , customHeaders );
    return this.http.post<TipoServicioI[]>(direccion, '1', {
      'headers': customHeaders,
    });

  }

  actualizarPlacaBehavior(placa: string) {
    this.behaviorSubjectPlaca.next(placa);             //      | | | |x|   esta es la placa ::: que entra en una pila
  }

  generarPDFetiquetado(placa: string): Observable<MetadataArchPDF> {
    let direccion = this.url + "generarPDFetiquetadooo";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);
    return this.http.post<MetadataArchPDF>(direccion, placa, {
      'headers': customHeaders,
    });

  }

  imprimirEtiqHolograma(placa: string): Observable<MetadataArchPDF> {
    console.log('Aqui pasamos con la placa de una vez .....placa ', placa);
    let direccion = this.url + "generarEtiquetadPrinterHolograma";
    console.log('>>>>> direccion :: ', direccion);
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);
    return this.http.post<MetadataArchPDF>(direccion, placa, {
      'headers': customHeaders,
    });

  }

  cargaDataBaseDatosInfoVehic(placa: string): Observable<Informacionvehiculo> {
    let direccion = this.url + "cargaDataBaseDatosInfoVehic";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);
    return this.http.post<Informacionvehiculo>(direccion, placa, {
      'headers': customHeaders,
    });

  }

  consultaDataInfoVehic(informacionvehiculo: Informacionvehiculo): Observable<Informacionvehiculo[]> {
    
    let direccion = this.url + "consultaDataInfoVehic";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);
    return this.http.post<Informacionvehiculo[]>(direccion, informacionvehiculo, {
      'headers': customHeaders,
    });

  }


  listTipoCombustible(idclasevehiculo: number): Observable<TipoCombustibleI[]> {
    let direccion = this.url + "listTipoCombustible";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<TipoCombustibleI[]>(direccion, idclasevehiculo, {
      'headers': customHeaders,
    });

  }

  listEstadoEmision(idclasevehiculo: number): Observable<EstadoEmisionI[]> {
    let direccion = this.url + "listEstadoEmision";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<EstadoEmisionI[]>(direccion, idclasevehiculo, {
      'headers': customHeaders,
    });

  }

  listTipologiaVehicular(idTipologiaVehicular: number): Observable<TipologiaVehicular[]> {
    let direccion = this.url + "listTipologiaVehicular";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<TipologiaVehicular[]>(direccion, idTipologiaVehicular, {
      'headers': customHeaders,
    });

  }

 // ddddddddddddddddddddddddddddd9999999999999999999999999999999999999999
  calculoFactosAmbiVehicular(informacionvehiculo: Informacionvehiculo): Observable<EvaEtiquetado> {
    let direccion = this.url + "calculoFactosAmbiVehicular";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<EvaEtiquetado>(direccion, informacionvehiculo, {
      'headers': customHeaders,
    });

  }


  listCilindrada(idclasevehiculo: number): Observable<CilindradaI[]> {
    let direccion = this.url + "listCilindrada";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<CilindradaI[]>(direccion, idclasevehiculo, {
      'headers': customHeaders,
    });

  }

  listMarca(idclasevehiculo: number): Observable<MarcaI[]> {
    let direccion = this.url + "listMarca";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<MarcaI[]>(direccion, idclasevehiculo, {
      'headers': customHeaders,
    });

  }

  listCategoria(idclasevehiculo: number): Observable<CategoriaI[]> {
    let direccion = this.url + "listCategoria";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<CategoriaI[]>(direccion, idclasevehiculo, {
      'headers': customHeaders,
    });

  }

  guardaPropietarioVehiculo(propietarioVehiculo: Propietariovehiculo): Observable<Propietariovehiculo> {

    console.log("metodo :: guardaPropietarioVehiculo propietarioVehiculo>> :: " + propietarioVehiculo );

    let direccion = this.url + "guardaPropietarioVehiculo";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<Propietariovehiculo>(direccion, propietarioVehiculo, {
      'headers': customHeaders,
    });

  }

  propietarioVehiculoPlaca(propietarioVehiculo: Propietariovehiculo): Observable<Propietariovehiculo> {
    let direccion = this.url + "propietarioVehiculoPlaca";
    console.log('TOKEN DE LA PLACA :::: ' , localStorage.getItem("token"));

    if (localStorage.getItem("token") != null) { }
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<Propietariovehiculo>(direccion, propietarioVehiculo, {
      'headers': customHeaders,
    });
  

  }

  /*   loginByEmail(form:LoginI):Observable<ResponseI> {
    let direccion = this.url + "authenticate";
    return this.http.post<ResponseI>(direccion,form);
    */   
//}
// aaaaaaaaaaaaaaaaaaaaaaaaffff 

  guardaInfoVehiculo(informacionVehiculo: Informacionvehiculo): Observable<Informacionvehiculo> {
    let direccion = this.url + "guardaInformacionVehiculo";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<Informacionvehiculo>(direccion, informacionVehiculo, {
      'headers': customHeaders,
    });

  }

  handleError = (error: HttpErrorResponse) => {
    console.log('error', error);

    if (error.status === 401) {
      this.showError = true;
      this.error = error.message;
      
      return Observable;

    }
    this.showError = true;
    this.error = error.message;
    return Observable;
  };


  listPropietarioVehiculo(placa: String): Observable<Propietariovehiculo[]> {
    console.log('servicio ::: listPropietarioVehiculo');
    let direccion = this.url + "listaPropietarioVehiculo";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<Propietariovehiculo[]>(direccion, placa, {
      'headers': customHeaders,
    });

  }

  listPesoVehiculo(idclasevehiculo: number): Observable<PesoVehiculoI[]> {
    let direccion = this.url + "listPesovehiculo";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<PesoVehiculoI[]>(direccion, idclasevehiculo, {
      'headers': customHeaders,
    });

  }

  consultaObjetoPlaca(placa: string): Observable<Placa> {
    console.log('xxxx :: placa ', placa );
    let direccion = this.url + "consultaObjetoPlaca";
    console.log('xxxx :: direccion ', direccion );
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);
    return this.http.post<Placa>(direccion, placa, {
      'headers': customHeaders,
    });

  }

}
