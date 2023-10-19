import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VariableSesionI } from 'src/app/modelos/response.interface';
import { ConsultaVisita, Pqrs, Visitas } from 'src/app/modelos/ruido.interface';
import { VarSesionService } from 'src/app/servicios/sesion.service';
import { VisitaruidoService } from 'src/app/servicios/visitaruido.service';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.scss']
})
export class VisitaComponent implements OnInit {

  varSesionI: VariableSesionI = { username: '', modulo: [], menu: [] };
  dummyComponent: any;
  // pqrs : Pqrs[] = []; 
  pqrsActual: Pqrs = {
    objectid: -1,
    radicado: '', asunto_radicacion: '', sector_reportado: '',
    localidad: '', estado_tramite: 1,
    observaciones_estado_tramite: '',
    fecha_radicado: new Date(),

  }
  visita: Visitas[] = [];
  dataSource: MatTableDataSource<Visitas> = new MatTableDataSource(this.visita);
  displayedColumns = ['Fecha', 'Profesional', 'Dirección', 'Observación', 'estado_de_la_visita'];

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;



  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatSlideToggle, { static: true })
  stoggle!: MatSlideToggle;
  fechaInicial: Date = new Date();
  fechaFinal: Date = new Date();
  radicado: string = '2021ER82639';

  constructor(
    private visitaRuidoService: VisitaruidoService,
    private router: Router,
    // private viRuidoService: VisitaruidoService
  ) { }

  ngOnInit(): void {
    // this.consultaVisitas();

    let consultaVisitaV = this.visitaRuidoService.getConsultaVisitaV();
    /*
    this.visitaRuidoService.consultaVisita(consultaVisitaV).subscribe(
     x => {x;
       this.dataSource = new MatTableDataSource(x);
       this.dataSource.paginator = this.paginator;
     }
    );
*/
    console.log('visitacomponent.ts .... xxxx');
    this.visitaRuidoService.pqrObserv.subscribe(x => {
      x;
      this.pqrsActual = x;
      console.log('Va al componente actual ..... visitaCCC ', x);
    })

    this.visitaRuidoService.visitaObser.subscribe(x => {
      x;
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.paginator = this.paginator;
    })

  }
  /*
  

 
} */

  /*
  666666666666666666
  consultaVisitas() {
    let consultaVisita: ConsultaVisita = { fechaInicial: this.fechaInicial, fechaFinal: this.fechaInicial, radicado: this.radicado };
    this.visitaRuido.consultaVisita(consultaVisita).subscribe(x => {
      this.visita = x;
      this.dataSource = new MatTableDataSource(this.visita);
      this.dataSource.paginator = this.paginator;
    });
  }
*/
  nuevaVisita(): void {
    console.log('salto a nueva Visita :: paso 1x ');
    this.router.navigate(['nueVisita']);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
