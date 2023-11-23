import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { VariableSesionI } from 'src/app/modelos/response.interface';
import { VarSesionService } from 'src/app/servicios/sesion.service';
import { MatIconModule } from '@angular/material/icon';
import { EtiquetadoComponent } from 'src/app/etiquetado/etiquetado/etiquetado.component';
import { RuidoComponent } from 'src/app/ruido/ruido/ruido.component';
import { VacioComponent } from 'src/app/vacio/vacio.component';
import { MatInputModule } from '@angular/material/input';
import { ConsultaVisita, CONSUL_TIPO_PREDIO, CONS_NO_ES_COMPETE, CONS_POR_DIRECCION, CONS_POR_ESTADOTRA, CON_PROVISIONAL_ET, CS_MODULO_ALERTAS, CS_ORGANIS_CONTROL, GRAFICA_TIPO_BAR, GRAFICA_TIPO_PIE, Pqrs, PQRS_POR_LOCALIDAD, PREDIO2D_NORMATIVI, PqrsDTO, VISITA_NO_EF_REP, PQR_REP_PETICION, PQR_REP_ANTECEDE, RdoEstadoTramite, ObserEstTramite, RuidoLocalidad, RuiLocalidad, ESTADO_TRAMITE_NO_ES_COMPETENCIA, PQR_ULTIMOS_50_R } from 'src/app/modelos/ruido.interface';
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
import { animate, state, style, transition, trigger } from "@angular/animations";
import { AiresbcComponent } from '../airesbc/airesbc.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { RadicadoComponent } from '../radicado/radicado.component';
import { EstadoService } from 'src/app/servicios/estado.service';
import { LocalidadService } from 'src/app/servicios/localidad.service';

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

  public listRuiLocalidad: RuidoLocalidad[] = [];
  public listRdoEstado: RdoEstadoTramite[] = [];
  public listObsEstadoTramite: ObserEstTramite[] = [];
  public localidadSelected: RuidoLocalidad = { value: '', viewValue: '' }

  public estadoTramiteSelected: RdoEstadoTramite = { id: 3, nombre: 'estado Tramite' };
  // public estObserSelected = ['Observacion Estado', 'Observacion Estado'];

  public estObserSelected: ObserEstTramite = {
    id: 1,
    observacion: ''
  };


  listEstadoTramitex: RdoEstadoTramite[] = [];
  estadoTramitex: string = '';


  peticionario: string = '';
  isCheckboxChecked: boolean = false;
  isCbCVencido: boolean = false;
  isCbCPxVenci: boolean = false;
  isCbCPxSinVe: boolean = false;



  radicado: string = '2012ER128541';
  formattedDate: any;
  pipe = new DatePipe('en-US');
  graficaPie: string = GRAFICA_TIPO_PIE;
  graficaBar: string = GRAFICA_TIPO_BAR;

  consultaVisitaGen: ConsultaVisita = {
    fechaInicial: new Date,
    fechaFinal: new Date,
    radicado: '',
    vistaSistema: '',
    direccion: '',
    localidad: '',
    estadoTramite: '',
    tipoPredio: '',
    tipoChart: GRAFICA_TIPO_PIE,
    isCbCVencido: false,
    isCbCPxVenci: false,
    isCbCPxSinVe: false,
    peticionario: '',
    observacionEstadoTramite: '',
  }
  consDireccionLabel = CONS_POR_DIRECCION;
  estadoTramiteLabel = CONS_POR_ESTADOTRA;
  tipoDePredioLabel = CONSUL_TIPO_PREDIO;
  pqrsLocalidaLabel = PQRS_POR_LOCALIDAD;
  noEsCompetencia_et = CONS_NO_ES_COMPETE;
  readonly CONS_NO_ES_COMPETE = CONS_NO_ES_COMPETE

  conProvisionEsTra = CON_PROVISIONAL_ET;
  predio2D_normativi = PREDIO2D_NORMATIVI;
  organismo_control_ = CS_ORGANIS_CONTROL;
  modulo_alertas_ = CS_MODULO_ALERTAS;
  readonly VISITA_NO_EF_REP = VISITA_NO_EF_REP;
  readonly PQR_REP_PETICION = PQR_REP_PETICION;
  readonly PQR_REP_ANTECEDE = PQR_REP_ANTECEDE;
  readonly PQR_ULTIMOS_50_R = PQR_ULTIMOS_50_R;


  excelData: any;
  varSesionI: VariableSesionI = { username: '', modulo: [], menu: [] };
  dummyComponent: any;    //VacioComponent;
  pqrs: PqrsDTO[] = [];
  pqrsActual: Pqrs = {
    objectid: -1,
    radicado: '', asunto_radicacion: '',
    sector_reportado: '',

    localidad: '', estado_tramite: 1,
    observaciones_estado_tramite: '',
    fecha_radicado: new Date(),
  };
  vistaSistema: string = '';
  dataSource: MatTableDataSource<PqrsDTO> = new MatTableDataSource(this.pqrs);
  displayedColumns = [
    'actualizar',
    'radicado', 'asunto_de_radicacion', 'razon_social_del_establecimient', 'localidad',
    'direcciones', 'estadoTramite',
    'estadoTramiteStr', 'numDiasVencimiento', 'fecha_del_radicado', 'banderaVencimiento',
    'fechaVisita', 'estadoVisita',
    'cantidad_de_reprogramaciones',
    'horario', 'peticionario',
  ];  //  'visita'
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
  expandedElement: Pqrs | null = {
    objectid: 0,
    //  ano : string;


    radicado: '',
    asunto_radicacion: '',
    direccion: '',
    complemento_direccion: '',
    razon_social_establecimiento: '',
    sector_reportado: '',
    localidad: '',

    estado_tramite: 0,
    observaciones_generales: '',
    profesional_1ra_asignacion: '',
    profesional_diligencia: '',

    fecha_radicado: new Date,
    fecha_1ra_asignacion: new Date,
    fecha_2da_asignacion: new Date,
    profesional_2da_asignacion: '',
    observaciones_estado_tramite: '',

  };


  constructor(
    private estadoService: EstadoService,
    public dialog: MatDialog,
    private localidadService: LocalidadService,
    private excelService: ExcelService,
    private variaSesionService: VarSesionService,
    private router: Router,
    private visitaService: VisitaruidoService,
    private radicadoService: RadicadoService,
    private consultaService: ConsultaService) { }

  actualizaVisita() {
    

  }

  ngOnInit(): void {
    this.consultaListaEstados();
    this.consultaVariables();
    this.listEstadoTramite();
    this.consultaListaLocalidades();
  
    this.consultaListaObsEstadTramite(ESTADO_TRAMITE_NO_ES_COMPETENCIA);
  }

  title = 'ruido';
  fechaInicial: Date = new Date();
  fechaFinal: Date = new Date();

  consultaVariables() {

    let username: string = localStorage.getItem("username") || '';
    this.variaSesionService.encuentraModulo(username).subscribe(x => {
  
      this.varSesionI = x;
     
    }
    )

    
  }


  assignComponent(component: string) {
   
    if (component === "consultavisita") this.dummyComponent = RuidoComponent;
    else if (component === "generarindice") this.dummyComponent = EtiquetadoComponent;
    else if (component === "airesbc") this.dummyComponent = AiresbcComponent;
    else this.dummyComponent = VacioComponent;
  }


  // fechaInicialX : Date, fechaFinalX : Date
  actualizaElDetalle(radicadoX: string) {

   

    let consultaVisita: ConsultaVisita = {
      fechaInicial: this.fechaInicial,
      fechaFinal: this.fechaFinal,
      radicado: radicadoX,
      vistaSistema: '',
      direccion: '',
      localidad: '',
      estadoTramite: '',
      tipoPredio: '',
      tipoChart: GRAFICA_TIPO_PIE,
      isCbCVencido: false,
      isCbCPxVenci: false,
      isCbCPxSinVe: false,
      peticionario: '',
      observacionEstadoTramite: '',
    };

   

    this.consultaService.setConsultaActual(consultaVisita);

    this.radicadoService.consultaRadicado(radicadoX).subscribe(x => {
      x;
      this.pqrsActual = x;
   
      this.visitaService.pqrsActual(this.pqrsActual);
      let consultaVisita: ConsultaVisita = {
        fechaInicial: new Date(),
        fechaFinal: new Date(),
        radicado: '',
        vistaSistema: '',
        direccion: '',
        localidad: '',
        estadoTramite: '',
        tipoPredio: '',
        tipoChart: GRAFICA_TIPO_PIE,
        isCbCVencido: false,
        isCbCPxVenci: false,
        isCbCPxSinVe: false,
        peticionario: '',
        observacionEstadoTramite: '',
      };
      this.visitaService.setConsultaVisitaV(consultaVisita);
      this.visitaService.actualizaInfoVisiPorRadicado(consultaVisita);

    });

    this.visitaService.actualizaInfoVisiPorRadicado(consultaVisita);

  }

  brokerConsultas() {

    let consultaVisita: ConsultaVisita = new ConsultaVisita();
    consultaVisita.vistaSistema = this.vistaSistema;
    consultaVisita.fechaFinal = this.fechaFinal;
    consultaVisita.fechaInicial = this.fechaInicial;
    consultaVisita.isCbCPxSinVe = this.isCbCPxSinVe;
    consultaVisita.isCbCPxVenci = this.isCbCPxVenci;
    consultaVisita.isCbCVencido = this.isCbCVencido;
    consultaVisita.peticionario = this.peticionario;
    consultaVisita.estadoTramite = this.estadoTramiteSelected.id + '';  // con esto un tipo de dato number, se convierte en string 

    consultaVisita.localidad = this.localidadSelected.value;
    consultaVisita.observacionEstadoTramite = this.estObserSelected.observacion;

    



    // ******************************
    this.consultaService.setConsultaActual(consultaVisita);

    if (this.vistaSistema == VISITA_NO_EF_REP) {
      this.addColumnsPQR();
      this.consultaVisita(consultaVisita);
      return;
    }

    if (this.vistaSistema == PQR_REP_PETICION) {
      this.removeColumnsPQR();
      this.consultaVisita(consultaVisita);
      return;
    }

    if (this.vistaSistema == PQR_REP_ANTECEDE) {
      this.removeColumnsPQR();
      this.consultaVisita(consultaVisita);
      return;
    }

    if (this.vistaSistema == CONS_NO_ES_COMPETE) {
      this.removeColumnsPQR();
      this.consultaVisita(consultaVisita);
      return;
    }
    //*****************************

    this.consultaPqrs();

  }

  consultaVisita(consultaVisita: ConsultaVisita) {
    
    // this.consultaService.consultaObserv.subscribe()

    this.variaSesionService.consultaVisitaFase2(consultaVisita).subscribe(x => {
    
      this.pqrs = x;

      this.dataSource = new MatTableDataSource(this.pqrs);
    
      this.dataSource.paginator = this.paginator;
    
    });


  }


  consultaPqrs() {

    this.consultaService.consultaObserv.subscribe(x1 => {


     
      x1;


      this.variaSesionService.consultaVisita(x1).subscribe(x => {

        this.pqrs = x;
      
        this.dataSource = new MatTableDataSource(this.pqrs);
      
        this.dataSource.paginator = this.paginator;
       

      });
    });

  

  }

  applyFilter(filterValue: Event) {
    let filterX = (filterValue.target as HTMLTextAreaElement).value;
    filterX = filterX.trim(); // Remove whitespace
    filterX = filterX.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterX;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ingresarRadicado() {
    this.router.navigate(['radicado']);
  }

  descargaExcel() {
   
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
    this.excelService.exportAsExcelFile(this.pqrs, 'ruido.xls')
  }

  readExcel(event: any) {
   
    let file = event.target.files[0];
   
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
   
    fileReader.onload = (e) => {
   
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
   
      var sheetNames = workBook.SheetNames;
   
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
   
   
      this.excelService.cargaDataExcel(this.excelData).subscribe(x => { x; }
      );

    }
  }

  readExcelPQRS(event: any) {
   
    let file = event.target.files[0];
   
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
   
    fileReader.onload = (e) => {
   
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
   
      var sheetNames = workBook.SheetNames;
   
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
   
   
      this.excelService.cargaDataExcelPQRS(this.excelData).subscribe(x => { x; }
      );

    }
  }

  asignarTipoGraficaTorta() {
    this.consultaService.setTipoGrafica(GRAFICA_TIPO_PIE);
    this.consultaVisitaGen.tipoChart = GRAFICA_TIPO_PIE;
  }

  asignarTipoGraficaBar() {
    this.consultaService.setTipoGrafica(GRAFICA_TIPO_BAR);
    this.consultaVisitaGen.tipoChart = GRAFICA_TIPO_BAR;
  }

  actualizaRadicado(radicadoX: string) {
   
    const dialogRef = this.dialog.open(RadicadoComponent, {
      data: { radicado: radicadoX, estado_tramite: -1 },
    });
    dialogRef.afterClosed().subscribe(result => {
   
      this.radicado = result;
    });
  }


  checked() {
   
  }


  addColumnsPQR() {
    const index = this.displayedColumns.indexOf('fechaVisita');
    if (index == -1) {
      this.displayedColumns.push('fechaVisita');
    }

    const index1 = this.displayedColumns.indexOf('estadoVisita');
    if (index1 == -1) {
      this.displayedColumns.push('estadoVisita');
    }

    const index2 = this.displayedColumns.indexOf('cantidad_de_reprogramaciones');
    if (index2 == -1) {
      this.displayedColumns.push('cantidad_de_reprogramaciones');
    }
    const index3 = this.displayedColumns.indexOf('horario');
    if (index3 == -1) {
      this.displayedColumns.push('horario');
    }
  }

  removeColumnsPQR() {

    // fechaVisita', 'estadoVisita',
    // 'cantidad_de_reprogramaciones',
    // 'horario


    const index = this.displayedColumns.indexOf('fechaVisita');
    if (index !== -1) {
      this.displayedColumns.splice(index, 1);
    }

    const index1 = this.displayedColumns.indexOf('estadoVisita');
    if (index1 !== -1) {
      this.displayedColumns.splice(index1, 1);
    }

    const index2 = this.displayedColumns.indexOf('cantidad_de_reprogramaciones');
    if (index2 !== -1) {
      this.displayedColumns.splice(index2, 1);
    }
    const index3 = this.displayedColumns.indexOf('horario');
    if (index3 !== -1) {
      this.displayedColumns.splice(index3, 1);
    }

  }


  listEstadoTramite() {
    
    let rdoEstado: RdoEstadoTramite = { id: 1, nombre: '' }
    

    // consultaEstado(estado: RdoEstado): Observable<RdoEstado[]> {

    this.estadoService.consultaEstado(rdoEstado).subscribe(
      x => {
        x;
        this.listEstadoTramitex = x;
       

      });
   
  }


  onEstadoSelection1() {
   
    this.consultaListaObsEstadTramite(this.estadoTramiteSelected.id);
  }

  consultaListaObsEstadTramite(idEstadoTramite: number) {
    let estado: RdoEstadoTramite = { id: idEstadoTramite, nombre: 'xxx' };

    // 9999999999999999999
    this.estadoService.consultaObsEstadoTram(estado).subscribe(x => {

      x;
     
      this.listObsEstadoTramite = x;
    })
  }

  consultaListaEstados() {
    let estado: RdoEstadoTramite = { id: 1, nombre: 'xxx' };
    this.estadoService.consultaEstado(estado).subscribe(x => {

      x;
    
      this.listRdoEstado = x;
    })
  }

  consultaListaLocalidades() {
    let localidad: RuiLocalidad = { idLocalidad: 1, nombre: 'xxx' };
    this.localidadService.consultaLocalidad(localidad).subscribe(x => {

      x;
    
      this.listRuiLocalidad = x;
    })
  }


  moduloConsultaCambiado() {

    //********************************* 

    if (this.vistaSistema == PQR_REP_ANTECEDE) {
      this.listEstadoTramite();
    }
  }

}

