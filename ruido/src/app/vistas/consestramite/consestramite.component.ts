import { Component, OnInit } from '@angular/core';
import { CONS_POR_ESTADOTRA, PQRS_POR_LOCALIDAD, RdoEstado, RdoEstadoTramite, RuiLocalidad } from 'src/app/modelos/ruido.interface';
import { ConsultaService } from 'src/app/servicios/consulta.service';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-consestramite',
  templateUrl: './consestramite.component.html',
  styleUrls: ['./consestramite.component.scss']
})
export class ConsestramiteComponent implements OnInit {

  listEstadoTramitex : RdoEstadoTramite[] = [];
  estadoTramitex : string = '';

  constructor(
    private estadoService : EstadoService,
    private consultaService : ConsultaService
    ) { }


  ngOnInit(): void {
   
    this.listLocalidad();
  }

  listLocalidad() {
   
    let rdoEstado: RdoEstadoTramite = {id : 1, nombre : ''}
   

    // consultaEstado(estado: RdoEstado): Observable<RdoEstado[]> {

    this.estadoService.consultaEstado(rdoEstado).subscribe( 
      x => {
        x; 
        this.listEstadoTramitex = x;
       

    });
    
  }
 
  onEstTramiteSelection() {
    
    this.consultaService.updateEstadoTramite(this.estadoTramitex); 
    this.consultaService.setVistaSistema(CONS_POR_ESTADOTRA);   

}


}
