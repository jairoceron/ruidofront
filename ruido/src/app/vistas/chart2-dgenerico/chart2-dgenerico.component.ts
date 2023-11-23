import { Component, OnInit } from '@angular/core';
import { ChartBarVertical2D } from 'src/app/modelos/ruido.interface';
import { Chart2DgenericoService } from 'src/app/servicios/chart2-dgenerico.service';
import { ConsultaService } from 'src/app/servicios/consulta.service';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-chart2-dgenerico',
  templateUrl: './chart2-dgenerico.component.html',
  styleUrls: ['./chart2-dgenerico.component.scss']
})
export class Chart2DgenericoComponent implements OnInit {

  multi: ChartBarVertical2D[] = [];
  view: [number,number] = [1200, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  /*
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };
  */

  colorScheme : string = '#5AA454';
  


  constructor(
    private consultaService : ConsultaService,
    private chart2DgenericoService : Chart2DgenericoService,
   // 99999999999999
   // private estadoService : EstadoService
    ) {
    Object.assign(this, {  })
  }
  ngOnInit(): void {
    this.loadData();
  }

 onSelect(data:any): void {
   
  }

  onActivate(data:any): void {
   
  }

  onDeactivate(data:any): void {
   
  }

  loadData() {
  
  
    this.consultaService.consultaObserv.subscribe(x => {
  
  
      x;
      this.chart2DgenericoService.chartLoad(x ).subscribe(x => {
  
        x;
        this.multi = x;
  
     });
 
    });
}
}