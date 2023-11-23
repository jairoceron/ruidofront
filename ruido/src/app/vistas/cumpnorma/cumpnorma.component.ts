import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultaVisita, CONSUL_TIPO_PREDIO, GRAFICA_TIPO_BAR, GRAFICA_TIPO_PIE, PREDIO2D_NORMATIVI, RdoTipopredio, RuiLocalidad, SectorReportadoPqrs, RuidoLocalidad } from 'src/app/modelos/ruido.interface';
import { AsuntoService } from 'src/app/servicios/asunto.service';
import { ConsultaService } from 'src/app/servicios/consulta.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { LocalidadService } from 'src/app/servicios/localidad.service';
import { ProfesionalService } from 'src/app/servicios/profesional.service';
import { RadicadoService } from 'src/app/servicios/radicado.service';
import { SectorService } from 'src/app/servicios/sector.service';
import { TipopredioService } from 'src/app/servicios/tipopredio.service';

@Component({
  selector: 'app-cumpnorma',
  templateUrl: './cumpnorma.component.html',
  styleUrls: ['./cumpnorma.component.scss']
})
export class CumpnormaComponent implements OnInit {

  listRuiLocalidad: RuidoLocalidad[] = [];
  public localidad: string = '';
  // listTPredio: RdoTipopredio[] = [];
  listTPredio: SectorReportadoPqrs[] = [];
  tipoPrediox: string = '';
  cumplimientoNormativo : string = PREDIO2D_NORMATIVI;
  vistaSistema : string = PREDIO2D_NORMATIVI;
  graficaPie : string = GRAFICA_TIPO_PIE;
  graficaBar : string = GRAFICA_TIPO_BAR;

  consultaVisitaGen: ConsultaVisita = { 
    fechaInicial: new Date,
    fechaFinal: new Date,
    radicado: '',
    vistaSistema:'' ,
    direccion:'' ,
    localidad:'',
    estadoTramite:'',
    tipoPredio:'',
    tipoChart :GRAFICA_TIPO_PIE,
    isCbCVencido : false,
    isCbCPxVenci : false,
    isCbCPxSinVe : false,
    peticionario : '',
    observacionEstadoTramite :  '',
}

  constructor(private radicadoService: RadicadoService,
    private toastr: ToastrService,
    private route: Router,
    private sectorService: SectorService,
    private localidadService: LocalidadService,
    private asuntoService: AsuntoService,
    private estadoService: EstadoService,
    private profesionalService: ProfesionalService,
    private tipoPredioService: TipopredioService,
    private consultaService: ConsultaService) { }

  ngOnInit(): void {

    this.consultaListaLocalidades();
    this.listTiposPredio();

  }

  consultaListaLocalidades() {
    let localidad: RuiLocalidad = { idLocalidad: 1, nombre: 'xxx' };
    this.localidadService.consultaLocalidad(localidad).subscribe(x => {

     
      this.listRuiLocalidad = x;
    })
  }

  listTiposPredio() {
    
    let rdoTipoPredio: SectorReportadoPqrs = { Id: 1, sector_reportado: '' }
    
    this.tipoPredioService.consultaLocalidad(rdoTipoPredio).subscribe(
      x => {
    
        this.listTPredio = x;
    

      });
   
  }
  onTipoPredioSelection() {
   
    this.consultaService.updateTipoPredio(this.tipoPrediox); // ***********
    this.consultaService.setVistaSistema(PREDIO2D_NORMATIVI); 
    this.consultaService.updateLocalidad(this.localidad);
    //*****************

  }

  asignarTipoGraficaTorta() {  
    this.consultaService.setTipoGrafica(GRAFICA_TIPO_PIE );
    this.consultaVisitaGen.tipoChart = GRAFICA_TIPO_PIE;
  }

  asignarTipoGraficaBar() {
    this.consultaService.setTipoGrafica(GRAFICA_TIPO_BAR );
    this.consultaVisitaGen.tipoChart = GRAFICA_TIPO_BAR;
  }
}
