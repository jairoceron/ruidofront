import { Component, OnInit } from '@angular/core';
import { CONS_POR_ESTADOTRA, PQRS_POR_LOCALIDAD, RdoEstado, RuiLocalidad } from 'src/app/modelos/ruido.interface';
import { ConsultaService } from 'src/app/servicios/consulta.service';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-consestramite',
  templateUrl: './consestramite.component.html',
  styleUrls: ['./consestramite.component.scss']
})
export class ConsestramiteComponent implements OnInit {

  listEstadoTramitex : RdoEstado[] = [];
  estadoTramitex : string = '';

  constructor(
    private estadoService : EstadoService,
    private consultaService : ConsultaService
    ) { }


  ngOnInit(): void {
    console.log("Consulta por localidad 1a ");
    this.listLocalidad();
  }

  listLocalidad() {
    console.log("Consulta por localidad 1b ");
    let rdoEstado: RdoEstado = {idEstado : 1, nombre : ''}
    console.log("Consulta por localidad 1c ");

    // consultaEstado(estado: RdoEstado): Observable<RdoEstado[]> {

    this.estadoService.consultaEstado(rdoEstado).subscribe( 
      x => {
        x; 
        this.listEstadoTramitex = x;
        console.log('los estados del tramite :: ' , x);

    });
    console.log("Consulta por estado tramite ");
  }
 
  onEstTramiteSelection() {
    console.log("localidad seleccionada .... " , this.estadoTramitex);
    this.consultaService.updateEstadoTramite(this.estadoTramitex); // ********
    this.consultaService.setVistaSistema(CONS_POR_ESTADOTRA);   // ***************

}


}
