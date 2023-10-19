import { Component, OnInit } from '@angular/core';
import { CONSUL_TIPO_PREDIO, PQRS_POR_LOCALIDAD, RdoTipopredio, RuiLocalidad, SectorReportadoPqrs } from 'src/app/modelos/ruido.interface';
import { ConsultaService } from 'src/app/servicios/consulta.service';
import { LocalidadService } from 'src/app/servicios/localidad.service';
import { TipopredioService } from 'src/app/servicios/tipopredio.service';

@Component({
  selector: 'app-constipopredio',
  templateUrl: './constipopredio.component.html',
  styleUrls: ['./constipopredio.component.scss']
})
export class ConstipopredioComponent implements OnInit {

  listTPredio: SectorReportadoPqrs[] = [];
  tipoPrediox: string = '';

  constructor(
    private tipoPredioService: TipopredioService,
    private consultaService: ConsultaService
  ) { }


  ngOnInit(): void {
    console.log("Consulta por localidad 1a ");
    this.listLocalidad();
  }

  listLocalidad() {
    console.log("Consulta por localidad 1b ");
    let rdoTipoPredio: SectorReportadoPqrs  = { Id: 1, sector_reportado: '' }
    console.log("Consulta por localidad 1c ");
    this.tipoPredioService.consultaLocalidad(rdoTipoPredio).subscribe(
      x => {
        x;
        this.listTPredio = x;
        console.log('las localidades :: ', x);

      });
    console.log("Consulta por localidad 1d ");
  }

  onTipoPredioSelection() {
    console.log("localidad seleccionada .... ", this.tipoPrediox);
    this.consultaService.updateTipoPredio(this.tipoPrediox); // ***********
    this.consultaService.setVistaSistema(CONSUL_TIPO_PREDIO); // *****************

  }
}
