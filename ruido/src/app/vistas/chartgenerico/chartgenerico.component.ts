import { Component, OnInit } from '@angular/core';
import { ChartGenerico } from 'src/app/modelos/ruido.interface';
import { ChartgenericoService } from 'src/app/servicios/chartgenerico.service';
import { ConsultaService } from 'src/app/servicios/consulta.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { VarSesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-chartgenerico',
  templateUrl: './chartgenerico.component.html',
  styleUrls: ['./chartgenerico.component.scss']
})
export class ChartgenericoComponent implements OnInit {

 

  ngOnInit(): void {
    this.loadData();
  }
  single: ChartGenerico[] = [];

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
    private estadoService : EstadoService,
    // private localidadService : LocalidadService,
    private varSesionService : VarSesionService,
    private consultaService : ConsultaService,
    private chartgenericoService : ChartgenericoService,

    ) {
  //  Object.assign(this, { single });
  }
  //onResize(event:any) { this.view = [1900, 1080 ]; }
  onSelect(data:any): void {
    console.log('ChartgenericoComponent   ::   Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('ChartgenericoComponent   ::  Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('ChartgenericoComponent   ::  Deactivate', JSON.parse(JSON.stringify(data)));
  }

  loadData() {
    console.log('ChartgenericoComponent   ::  a1');
 
    console.log('ChartgenericoComponent   ::  a2');




    this.consultaService.consultaObserv.subscribe(x => {
      console.log('ChartgenericoComponent   ::  a3');
      console.log(x);
      x;
      this.chartgenericoService.chartLoad(x).subscribe(x => {
        console.log('ChartgenericoComponent   ::  a4');
        this.single = x;
        console.log('ChartgenericoComponent   ::  <<<<<<<<<< ');
     });

    });


  }

}
