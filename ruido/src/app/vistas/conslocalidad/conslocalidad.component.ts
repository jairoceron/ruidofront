import { Component, OnInit } from '@angular/core';
import { PQRS_POR_LOCALIDAD, RuiLocalidad } from 'src/app/modelos/ruido.interface';
import { ConsultaService } from 'src/app/servicios/consulta.service';
import { LocalidadService } from 'src/app/servicios/localidad.service';


@Component({
  selector: 'app-conslocalidad',
  templateUrl: './conslocalidad.component.html',
  styleUrls: ['./conslocalidad.component.scss']
})
export class ConslocalidadComponent implements OnInit {

  listRuiLocalidad : RuiLocalidad[] = [];
  localidadx : string = '';

  constructor(
    private localidadService : LocalidadService,
    private consultaService : ConsultaService
    ) { }


  ngOnInit(): void {
    console.log("Consulta por localidad 1a ");
    this.listLocalidad();
  }

  listLocalidad() {
    console.log("Consulta por localidad 1b ");
    let ruilocalidad: RuiLocalidad = {idLocalidad : 1, nombre : ''}
    console.log("Consulta por localidad 1c ");
    this.localidadService.consultaLocalidad(ruilocalidad).subscribe( 
      x => {
        x; 
        this.listRuiLocalidad = x;
        console.log('las localidades :: ' , x);

    });
    console.log("Consulta por localidad 1d ");
  }
 
  onLocalidadSelection() {
    console.log("localidad seleccionada .... " , this.localidadx);
    this.consultaService.updateLocalidad(this.localidadx);
    this.consultaService.setVistaSistema(PQRS_POR_LOCALIDAD);

}
}
