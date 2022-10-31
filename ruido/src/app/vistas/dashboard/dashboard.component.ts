import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VariableSesionI } from 'src/app/modelos/response.interface';
import { VarSesionService } from 'src/app/servicios/sesion.service';
import { MatIconModule } from '@angular/material/icon';
import { EtiquetadoComponent } from 'src/app/etiquetado/etiquetado/etiquetado.component';
import { RuidoComponent } from 'src/app/ruido/ruido/ruido.component';
import { VacioComponent } from 'src/app/vacio/vacio.component';
import { MatInputModule } from '@angular/material/input';
import { ConsultaVisita, Pqrs } from 'src/app/modelos/ruido.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { VisitaruidoService } from 'src/app/servicios/visitaruido.service';
import { RadicadoService } from 'src/app/servicios/radicado.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  varSesionI: VariableSesionI = { username: '', modulo: [], menu: [] };
  dummyComponent: any;    //VacioComponent;
  pqrs: Pqrs[] = [];
  pqrsActual : Pqrs = {radicado:''};
  dataSource: MatTableDataSource<Pqrs> = new MatTableDataSource(this.pqrs);
  displayedColumns = ['radicado', 'asunto_de_radicacion', 'año', 'mes', 'razon_social_del_establecimient', 'localidad', 'direcciones', 'visita'];

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;


  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatSlideToggle, { static: true })
  stoggle!: MatSlideToggle;


  constructor(
    
    private variaSesion: VarSesionService,
    private router: Router,
    private visitaService: VisitaruidoService,
    private radicadoService: RadicadoService) { }

  actualizaVisita() {
    console.log('actualizacion de la visita :: ');
  }

  ngOnInit(): void {
    this.consultaVariables();
  }

  title = 'ruido';
  fechaInicial: Date = new Date();
  fechaFinal: Date = new Date();

  consultaVariables() {

    let username: string = localStorage.getItem("username") || '';
    this.variaSesion.encuentraModulo(username).subscribe(x => {
      console.log('Este xx es el objeto de sesion 00..... ');
      this.varSesionI = x;
      // this.varSesionI.modulo
      console.log(x);

      /*
      for (var menX of this.varSesionI.menu) {
                console.log("este es el modulo ::: " , modul);
               if (menX == 'etiquedado') {
                this.router.navigate(['etiquetado']);
                console.log('ingresa a etiquetado ...');
               }
               if (menX == 'ruido') {
                this.router.navigate(['ruido']);
                console.log('ingresa a ruido ...');
               }
      }
      */

    }
    )

    console.log('Esto funciona bien  fechaInicial ', this.fechaInicial);
    console.log('Esto funciona bien  fechaFinal   ', this.fechaFinal);
  }

  assignComponent(component: string) {
    if (component === "consultavisita") this.dummyComponent = RuidoComponent;
    else if (component === "generarindice") this.dummyComponent = EtiquetadoComponent;
    else this.dummyComponent = VacioComponent;
  }


  // fechaInicialX : Date, fechaFinalX : Date
  actualizaElDetalle(radicadoX: string) {
   
    let consultaVisita: ConsultaVisita = { fechaInicial: this.fechaInicial, fechaFinal: this.fechaFinal, radicado: radicadoX };
   
    console.log('Actualiza el detalle ..consultaVisita . xxx ',consultaVisita );
    
    this.radicadoService.consultaRadicado(radicadoX).subscribe( x => {
        x;
        this.pqrsActual = x;
        console.log('PQRS actal .. ' , this.pqrsActual);
        this.visitaService.pqrsActual(this.pqrsActual);
        let consultaVisita : ConsultaVisita = {fechaInicial:new Date(), fechaFinal:new Date(), radicado:x.radicado};
        this.visitaService.setConsultaVisitaV(consultaVisita);
        this.visitaService.actualizaInfoVisiPorRadicado(consultaVisita);
//9999999999999999999999
    });

    

    this.visitaService.actualizaInfoVisiPorRadicado(consultaVisita);
    33333333333333333333
    // VisitaruidoService
  }

  consultaVisitas() {
    let consultaVisita: ConsultaVisita = { fechaInicial: this.fechaInicial, fechaFinal: this.fechaFinal, radicado: '2021ER82639' };
    this.variaSesion.consultaVisita(consultaVisita).subscribe(x => {
      this.pqrs = x;
      this.dataSource = new MatTableDataSource(this.pqrs);
      this.dataSource.paginator = this.paginator;

    });
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

  ingresarRadicado() {
    this.router.navigate(['radicado']);
  }

}

