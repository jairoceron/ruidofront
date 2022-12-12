import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VariableSesionI } from 'src/app/modelos/response.interface';
import { VarSesionService } from 'src/app/servicios/sesion.service';
import { MatIconModule } from '@angular/material/icon';
import { EtiquetadoComponent } from 'src/app/etiquetado/etiquetado/etiquetado.component';
import { RuidoComponent } from 'src/app/ruido/ruido/ruido.component';
import { VacioComponent } from 'src/app/vacio/vacio.component';
import { MatInputModule } from '@angular/material/input';
import { ConsultaVisita, CONSUL_TIPO_PREDIO, CONS_NO_ES_COMPETE, CONS_POR_DIRECCION, CONS_POR_ESTADOTRA, CON_PROVISIONAL_ET, Pqrs, PQRS_POR_LOCALIDAD, PREDIO2D_NORMATIVI } from 'src/app/modelos/ruido.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { VisitaruidoService } from 'src/app/servicios/visitaruido.service';
import { RadicadoService } from 'src/app/servicios/radicado.service';
import { ConsultaService } from 'src/app/servicios/consulta.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { timeHours } from 'd3';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {  animate,  state,  style,  transition,  trigger} from "@angular/animations";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class DashboardComponent implements OnInit {

  consDireccionLabel = CONS_POR_DIRECCION;
  estadoTramiteLabel = CONS_POR_ESTADOTRA ;
  tipoDePredioLabel = CONSUL_TIPO_PREDIO; 
  pqrsLocalidaLabel = PQRS_POR_LOCALIDAD;
  noEsCompetencia_et = CONS_NO_ES_COMPETE;
  conProvisionEsTra =  CON_PROVISIONAL_ET;
  predio2D_normativi = PREDIO2D_NORMATIVI;


  excelData : any;
  varSesionI: VariableSesionI = { username: '', modulo: [], menu: [] };
  dummyComponent: any;    //VacioComponent;
  pqrs: Pqrs[] = [];
  pqrsActual : Pqrs = {radicado:''};
  vistaSistema : string = '';
  dataSource: MatTableDataSource<Pqrs> = new MatTableDataSource(this.pqrs);
  displayedColumns = ['radicado', 'asunto_de_radicacion',  'razon_social_del_establecimient', 'localidad', 'direcciones', 'visita','estadoTramite'];
  expandDisplayedColumns = ["optionName", "optionDescription"];

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;


  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatSlideToggle, { static: true })
  stoggle!: MatSlideToggle;

  //http://localhost:8080/cimab/tablero/authenticate
  // url:string ='http://localhost:8080/cimab/tablero/';
  private url = environment.ruidoURL;
  expandedElement: Pqrs | null = {objectid : 0,
      //  ano : string;
      mes : '',
      x : '',
      y : '',
      radicado: '',
      asunto_de_radicacion : '',
      direcciones : '',
      complemento_de_direcciones   : '',
      razon_social_del_establecimient : '',
      sector_reportado : '',
      localidad : '',
      causante_del_origen_quejoso : '',
      estado_del_tramite : 0,
      observaciones_generales : '',
      profesional_asignado_primera_as : '',
      profesional_que_diligencia   : '',
      orig_fid  : 0,
      fecha_del_radicado  : new Date,
      fecha_primera_asignacion : new Date,
      fecha_segunda_asignacion : 0,
      profesional_asignado_segunda_as : '',
      globalid : '',
  };


  constructor(
    
    private excelService : ExcelService,
    private variaSesionService: VarSesionService,
    private router: Router,
    private visitaService: VisitaruidoService,
    private radicadoService: RadicadoService,
    private consultaService: ConsultaService) { }

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
    this.variaSesionService.encuentraModulo(username).subscribe(x => {
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

    console.log('EstadoTrámite ', this.vistaSistema);
   
    let consultaVisita: ConsultaVisita = { 
      fechaInicial: this.fechaInicial,
       fechaFinal: this.fechaFinal,
        radicado: radicadoX,
         vistaSistema:'' ,
         direccion:'' ,
         localidad:'',
         estadoTramite:'',
         tipoPredio:'',
        };
   
    console.log('Actualiza el detalle ..consultaVisita . xxx ',consultaVisita );

    this.consultaService.setConsultaActual(consultaVisita);
    
    this.radicadoService.consultaRadicado(radicadoX).subscribe( x => {
        x;
        this.pqrsActual = x;
        console.log('PQRS actal .. ' , this.pqrsActual);
        this.visitaService.pqrsActual(this.pqrsActual);
        let consultaVisita : ConsultaVisita = {
          fechaInicial:new Date(),
           fechaFinal:new Date(), 
           radicado:x.radicado, 
           vistaSistema:'',
           direccion:'',
           localidad:'',
           estadoTramite:'',
           tipoPredio:'',
          };
        this.visitaService.setConsultaVisitaV(consultaVisita);
        this.visitaService.actualizaInfoVisiPorRadicado(consultaVisita);
//9999999999999999999999
    });

    

    this.visitaService.actualizaInfoVisiPorRadicado(consultaVisita);
  //  33333333333333333333
    // VisitaruidoService
  }

  consultaVisitas() {
    console.log('b1 Estado trámite :. ', this.vistaSistema);
    // let consultaVisita: ConsultaVisita = { 
    //  fechaInicial: this.fechaInicial, 
    //  fechaFinal: this.fechaFinal, 
    //  radicado: '2021ER82639', 
    //  vistaSistema:this.vistaSistema,      
    //  direccion:'',
    //};

    let consultaVisita: ConsultaVisita = new ConsultaVisita();
    consultaVisita.fechaFinal = this.fechaFinal;
    consultaVisita.fechaInicial = this.fechaInicial;
    consultaVisita.vistaSistema = this.vistaSistema;

    this.consultaService.setConsultaActual(consultaVisita);



    console.log('b2');
    //***********


    this.consultaService.consultaObserv.subscribe(x1 => {
      console.log('b3');
      x1; // trae el objeto ConsultaVisita actual
      this.variaSesionService.consultaVisita(x1).subscribe(x => {
        console.log('b4 ', x);
        this.pqrs = x;
        this.dataSource = new MatTableDataSource(this.pqrs);
        this.dataSource.paginator = this.paginator;
  
      });
    } );

    console.log('b5');
    
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

  descargaExcel() {
    console.log('Descarga Excel');
    let data: any = [{
      eid: 'e101',
      ename: 'ravi',
      esal: 1000
    },
    {
      eid: 'e102',
      ename: 'ram',
      esal: 2000
    },
    {
      eid: 'e103',
      ename: 'rajesh',
      esal: 3000
    }];
    this.excelService.exportAsExcelFile(this.pqrs,'ruido.xls')
  }

  readExcel(event:any) {
    console.log('a1');
    let file = event.target.files[0];
    console.log('a2');
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    console.log('a3');
    fileReader.onload = (e) => {
      console.log('a4');
      var workBook = XLSX.read(fileReader.result, {type:'binary'});
      console.log('a5');
      var sheetNames = workBook.SheetNames;
      console.log('a6');
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      console.log('a7');
      console.log(this.excelData);
      this.excelService.cargaDataExcel(this.excelData).subscribe(x => 
        { x ;}
      );
      
    }
  }

  readExcelPQRS(event:any) {
    console.log('a1');
    let file = event.target.files[0];
    console.log('a2');
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    console.log('a3');
    fileReader.onload = (e) => {
      console.log('a4');
      var workBook = XLSX.read(fileReader.result, {type:'binary'});
      console.log('a5');
      var sheetNames = workBook.SheetNames;
      console.log('a6');
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      console.log('a7');
      console.log(this.excelData);
      this.excelService.cargaDataExcelPQRS(this.excelData).subscribe(x => 
        { x ;}
      );
      
    }
  }

}

