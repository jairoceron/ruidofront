import { Component, OnInit } from '@angular/core';
import { Informacionvehiculo, Placa, Propietariovehiculo } from 'src/app/modelos/login.interface';
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
      informacionvehiculo :  {  idevapropvehi : 0,
        placa : this.placa,
        tipologiaVehicular:  '',
        tipoServicio: '',
        tipoCombustible:  '',
        cilindraje:  '',
        marca:  '',
        linea:  '',
        modelo:  '',
        fechaImportacion:  new Date(),
        capacidadCarga:  '',
        claseVehiculo: '',
        numeroMotor:  '',
        vin:  '',
        ciudadMatricula:  '',
        vigenciaRTM:  '',
        tecnRedEmision: '',
        estEmisiVehic:  '',
        subContEmision:  '', },
      propietariovehiculo : {}
    };

    this.informacionvehiculo =  {  idevapropvehi : 0,
      placa : this.placa,
      tipologiaVehicular:  '',
      tipoServicio: '',
      tipoCombustible:  '',
      cilindraje:  '',
      marca:  '',
      linea:  '',
      modelo:  '',
      fechaImportacion:  new Date(),
      capacidadCarga:  '',
      claseVehiculo: '',
      numeroMotor:  '',
      vin:  '',
      ciudadMatricula:  '',
      vigenciaRTM:  '',
      tecnRedEmision: '',
      estEmisiVehic:  '',
      subContEmision:  '', };
    this.propiedadvehiculo = {};
   }

  ngOnInit(): void {
    this.cargaDatosPlaca();
  }

  cargaDatosPlaca() {
    console.log('this.placa ::: ' , this.placa);
    this.etService.placaObserv.subscribe( x => {
      this.placa = x;

      this.etService.consultaObjetoPlaca(this.placa).subscribe(y => {
        this.objPlaca = y;
        this.informacionvehiculo = y.informacionvehiculo;
        this.propiedadvehiculo = y.propietariovehiculo;
        console.log(' :::::  ' , y);
      });

    });

    
  }
// ***************
}
