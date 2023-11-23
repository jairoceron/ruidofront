import { Component, OnInit } from '@angular/core';
import { Informacionvehiculo, Placa, Propietariovehiculo } from 'src/app/modelos/login.interface';
import { INFO_VEHICULO } from 'src/app/modelos/ruido.interface';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';

@Component({
  selector: 'app-objetoplaca',
  templateUrl: './objetoplaca.component.html',
  styleUrls: ['./objetoplaca.component.scss']
})
export class ObjetoplacaComponent implements OnInit {

  placa : string = '';
   objPlaca : Placa ;
   informacionvehiculo : Informacionvehiculo ;
   propiedadvehiculo : Propietariovehiculo ;

  constructor(
    private etService: EtiquetadoService,
  ) {
    this.objPlaca  = {
      placa : 'xxxx',
      informacionvehiculo :  INFO_VEHICULO ,
      propietariovehiculo : {}
    };

    this.informacionvehiculo = INFO_VEHICULO ;
    
   
    this.propiedadvehiculo = {};
   }

  ngOnInit(): void {
    this.cargaDatosPlaca();
  }

  cargaDatosPlaca() {
   
    this.etService.placaObserv.subscribe( x => {
      this.placa = x;

      this.etService.consultaObjetoPlaca(this.placa).subscribe(y => {
        this.objPlaca = y;
        this.informacionvehiculo = y.informacionvehiculo;
        this.propiedadvehiculo = y.propietariovehiculo;
   
      });

    });

    
  }
// ***************
}
