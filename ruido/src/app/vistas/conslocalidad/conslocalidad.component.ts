import { Component, OnInit } from '@angular/core';
import { PQRS_POR_LOCALIDAD, RuiLocalidad, RuidoLocalidad } from 'src/app/modelos/ruido.interface';
import { ConsultaService } from 'src/app/servicios/consulta.service';
import { LocalidadService } from 'src/app/servicios/localidad.service';


@Component({
  selector: 'app-conslocalidad',
  templateUrl: './conslocalidad.component.html',
  styleUrls: ['./conslocalidad.component.scss']
})
export class ConslocalidadComponent implements OnInit {

  listRuiLocalidad: RuidoLocalidad[] = [];
  localidadx: string = '';

  constructor(
    private localidadService: LocalidadService,
    private consultaService: ConsultaService
  ) { }


  ngOnInit(): void {
   
    this.listLocalidad();
  }

  listLocalidad() {
   
    let ruilocalidad: RuiLocalidad = { idLocalidad: 1, nombre: '' }
   
    this.localidadService.consultaLocalidad(ruilocalidad).subscribe(
      x => {
        x;
        this.listRuiLocalidad = x;
   

      });
   
  }

  onLocalidadSelection() {
   
    this.consultaService.updateLocalidad(this.localidadx);
    this.consultaService.setVistaSistema(PQRS_POR_LOCALIDAD);

  }
}
