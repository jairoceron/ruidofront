import { Component, OnInit } from '@angular/core';
import { ChartLocalidad, ConsultaVisita } from 'src/app/modelos/ruido.interface';
import { ConsultaService } from 'src/app/servicios/consulta.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { LocalidadService } from 'src/app/servicios/localidad.service';
import { VarSesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-chartlocalidad',
  templateUrl: './chartlocalidad.component.html',
  styleUrls: ['./chartlocalidad.component.scss']
})
export class ChartlocalidadComponent implements OnInit {





  ngOnInit(): void {
    this.loadData();
  }
  single: ChartLocalidad[] = [];

  view: [number,number] = [1000, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  //colorScheme = {
   // domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  //};

  //colorScheme =  '#5AA454';
  

  name = 'Angular';

  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;


  // options for the chart
  showXAxis = true;
  showYAxis = true;


  showXAxisLabel = true;
  xAxisLabel = 'Localidad';
  showYAxisLabel = true;
  yAxisLabel = 'Número de PQRS';
  timeline = true;
  doughnut = true;
 

  constructor(
    private localidadService : LocalidadService,
    private estadoService : EstadoService,
    private varSesionService : VarSesionService,
    private consultaService : ConsultaService,
    ) {
  //  Object.assign(this, { single });
  }
  //onResize(event:any) { this.view = [1900, 1080 ]; }
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  loadData() {
    console.log('a1');
 //   let consultaVisita :ConsultaVisita = { fechaFinal:new Date(), fechaInicial:new Date(), radicado:'000' }
    console.log('a2');
    this.consultaService.consultaObserv.subscribe(x => {
      console.log('a3');
      console.log(x);
      x;
      this.localidadService.consultaChartLocalidad(x ).subscribe(x => {
        console.log('a4');
        this.single = x;
        console.log('<<<<<<<<<< ',x);
     });
 
    });

// ****************
   
    //999999999999999999999999
  }

}
