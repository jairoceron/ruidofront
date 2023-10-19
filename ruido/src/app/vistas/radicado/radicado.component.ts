import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ObserEstTramite, Pqrs, RdoAsunto, RdoEstado, RdoEstadoTramite, RdoProfesional, RuiLocalidad, RuiSector, RuidoLocalidad, RuidoSector } from 'src/app/modelos/ruido.interface';
import { AsuntoService } from 'src/app/servicios/asunto.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { LocalidadService } from 'src/app/servicios/localidad.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';
import { ProfesionalService } from 'src/app/servicios/profesional.service';
import { RadicadoService } from 'src/app/servicios/radicado.service';
import { SectorService } from 'src/app/servicios/sector.service';


export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-radicado',
  templateUrl: './radicado.component.html',
  styleUrls: ['./radicado.component.scss']
})


export class RadicadoComponent implements OnInit {


  fechaRadicacion: Date = new Date();
  public pqrsXX: Pqrs = {
    objectid: -1,
    radicado: '',
    sector_reportado: '',
    localidad: '',
    observaciones_generales: '',
    fecha_radicado: new Date,
    asunto_radicacion: '',
    estado_tramite: 1,
    observaciones_estado_tramite: ''
  };

  //public patientCategory: FormGroup  = new FormGroup({
  // asuntoControl : new FormControl('',Validators.required),

  //});;

  public radicado: string = '';
  public objectid: number = -1;
  public asuntoN: RdoAsunto = { value: '6', viewValue: 'EXPEDIENTE' };
  public direccion: string = '';
  public razonSocial: string = '';
  public x: string = '';
  public y: string = '';
  public sector: string = '';
  public localidad: string = '';
  public cuadrante: string = '';
  public estado: string = '';
  public observEstado: string = '';
  public observacion: string = '';
  public causante: string = '';
  public complemento: string = '';
  public profesional: string = '';
  public fechaPrimeraAsignacion: Date = new Date();
  public fechaRadicado: Date = new Date();
  public estadoTramite: number = 1;

  public listRuiSector: RuidoSector[] = [];

  // public sectorSelected: RuidoSector ={value:'', viewValue:'' }  ;

  public listRuiLocalidad: RuidoLocalidad[] = [];
  // public listRdoAsunto: RdoAsunto[] = [ {value: 6,   nombre: 'EXPEDIENTE'}];
  public listRdoEstado: RdoEstadoTramite[] = [];
  public listObsEstadoTramite: ObserEstTramite[] = [];
  public listProfesional: RdoProfesional[] = [];


  selectedFoods = ['pasta-3', 'Pasta'];
  // public asuntoSelected : RdoAsunto = {value: '6',   nombre: 'EXPEDIENTE'};
  // public asuntoSelected = ['6', 'EXPEDIENTE'];
  public asuntoSelected: RdoAsunto = { value: '6', viewValue: 'EXPEDIENTE' };
  // public sectorSelected = ['3', 'd'];
  public sectorSelected: RuidoSector = { value: '', viewValue: '' }
  // public localidadSelected = ['3', 'd'];
  public localidadSelected: RuidoLocalidad = { value: '', viewValue: '' }

  // public estadoTramiteSelected = [3, 'estado Tramite'];
  public estadoTramiteSelected: RdoEstadoTramite = { id: 3, nombre: 'estado Tramite' };
  // public estObserSelected = ['Observacion Estado', 'Observacion Estado'];

  public estObserSelected: ObserEstTramite = {
    id: 1,
    observacion: ''
  };



  public listRdoAsunto: RdoAsunto[] = [{ value: 'SEGUIMIENTO / ACLARATORIO', viewValue: 'SEGUIMIENTO / ACLARATORIO' },
  { value: 'ESTUDIO DE RUIDO', viewValue: 'ESTUDIO DE RUIDO' },
  { value: 'ORGANISMO DE CONTROL (CONTRALORIA, PERSONERIA, PRODURADURIA)', viewValue: 'ORGANISMO DE CONTROL (CONTRALORIA, PERSONERIA, PRODURADURIA)' },
  { value: 'DEPENDENCIA DE APOYO', viewValue: 'DEPENDENCIA DE APOYO' },
  { value: 'ACCION POPULAR', viewValue: 'ACCION POPULAR' },
  { value: 'EXPEDIENTE', viewValue: 'EXPEDIENTE' },
  { value: '#N/D', viewValue: '#N/D' },
  { value: 'TUTELA', viewValue: 'TUTELA' },
  { value: 'ENLACE AL CONCEJO', viewValue: 'ENLACE AL CONCEJO' },
  { value: 'MEMORANDO', viewValue: 'MEMORANDO' },
  { value: 'INFORMACION / INVITACION', viewValue: 'INFORMACION / INVITACION' },
  { value: 'QUEJA / SOLICITUD DE VISITA / QUERELLA', viewValue: 'QUEJA / SOLICITUD DE VISITA / QUERELLA' },
  { value: 'CERTIFICACION AUDITIVA', viewValue: 'CERTIFICACION AUDITIVA' },
  { value: 'SISTEMA DISTRITAL PARA LA GESTION DE PETICIONES CIUDADANAS - SDQS', viewValue: 'SISTEMA DISTRITAL PARA LA GESTION DE PETICIONES CIUDADANAS - SDQS' }]

  allfoods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
    { value: 'pasta-3', viewValue: 'Pasta' },
  ];

  constructor(
    private fb: FormBuilder,
    private radicadoService: RadicadoService,
    private toastr: ToastrService,
    private route: Router,
    private sectorService: SectorService,
    private localidadService: LocalidadService,
    private asuntoService: AsuntoService,
    private estadoService: EstadoService,
    private profesionalService: ProfesionalService,
    private pqrsService: PqrsService,
    @Inject(MAT_DIALOG_DATA) public data: {
      radicado: string,
      estado_tramite: number
    }) { }


  ngOnInit(): void {
    this.consultaDelRadicadoDB();
    this.consultaListaSectores();
    this.consultaListaLocalidades();
    //   this.consultaListaAsuntos() ;
    this.consultaListaEstados();
    // this.consultaListaProfesionales() ;
    this.consultaListaEstados();
    this.consultaListaObsEstadTramite(this.estadoTramite); // **************
    // this.asuntoSelected = [6, 'EXPEDIENTE'];



  }

  guardarRadicado() {
    let radicado: Pqrs = {
      objectid: this.objectid,
      radicado: this.radicado,
      sector_reportado: this.sector,
      localidad: this.localidad,
      observaciones_generales: this.observacion,
      fecha_radicado: this.fechaRadicado,
      asunto_radicacion: '',
      estado_tramite: 1,
      observaciones_estado_tramite: '',
    };

    this.radicadoService.guardarRadicado(radicado).subscribe(x => {
      x;
      console.log('Valor de retorno luego del registro :: ', x);
      this.toastr.success('Registro Exitoso', radicado.radicado);
      this.route.navigate(['dashboard']);
      //   this.router.navigate(['etiquetado']);
    });

  }

  consultaListaSectores() {
    let sector: RuiSector = { idSector: 1, nombre: 'xxx' };
    this.sectorService.consultaSector(sector).subscribe(x => {

      x;
      console.log(x);
      this.listRuiSector = x;
      // ************************************
    })
  }

  consultaListaLocalidades() {
    let localidad: RuiLocalidad = { idLocalidad: 1, nombre: 'xxx' };
    this.localidadService.consultaLocalidad(localidad).subscribe(x => {

      x;
      //  console.log(x);
      this.listRuiLocalidad = x;
    })
  }

  consultaListaAsuntos() {
    let asunto: RdoAsunto = { value: '1', viewValue: 'xxx' };
    this.asuntoService.consultaAsunto(asunto).subscribe(x => {

      x;
      console.log('aSUNTOS.... ', x);
      this.listRdoAsunto = x;

      //this.asuntoSelected = [6, 'EXPEDIENTE'];
      this.asuntoN = { value: '6', viewValue: 'EXPEDIENTE' };
    })

    this.asuntoN = { value: '6', viewValue: 'EXPEDIENTE' };
  }
   // ssssssssssssssss
  consultaListaEstados() {
    this.listRdoEstado  = [];  // inicializo el arreglo para evitar valores duplicados ......
    let estado: RdoEstadoTramite = { id: 1, nombre: 'xxx' };
    this.estadoService.consultaEstado(estado).subscribe(x => {

      x;
      console.log(x);
      this.listRdoEstado = x;
    })
  }

  consultaListaObsEstadTramite(idEstadoTramite: number) {
    let estado: RdoEstadoTramite = { id: idEstadoTramite, nombre: 'xxx' };

    // 9999999999999999999
    this.estadoService.consultaObsEstadoTram(estado).subscribe(x => {

      x;
      console.log('observaciones de los estados ::', x);
      this.listObsEstadoTramite = x;
    })
  }

  consultaListaProfesionales() {
    let profesional: RdoProfesional = { idProfesional: 1, nombre: 'xxx' };
    this.profesionalService.consultaProfesionales(profesional).subscribe(x => {

      x;
      console.log(x);
      this.listProfesional = x;
    })
  }

  actualizaRadicado() {
    console.log('Este es el radicado que trajo de la otra pagina :: ', this.data.radicado)
    //  99999999999999999999



    this.pqrsXX = {
      objectid: this.objectid,
      radicado: this.radicado,
      sector_reportado: this.sectorSelected.value,
      localidad: this.localidadSelected.value,

      asunto_radicacion: this.asuntoSelected.value,
      estado_tramite: this.estadoTramiteSelected.id,
      observaciones_estado_tramite: this.estObserSelected.observacion,
      fecha_radicado : this.fechaRadicacion ,
    };

    // observaciones_generales: this.observacion,
    //  fecha_radicado: this.fechaRadicado,
    //  asunto_radicacion: this.asuntoSelected[1],

    console.log('actualizacion de datos ::: ', this.pqrsXX);


    this.radicadoService.updateRadicado(this.pqrsXX).subscribe(x => {
      x;
      console.log('Valor de retorno luego del registro :: ', x);
      this.toastr.success('Registro Exitoso', this.pqrsXX.radicado);
      this.route.navigate(['dashboard']);
      //   this.router.navigate(['etiquetado']);
    });



  }

  consultaDelRadicadoDB() {
    this.asuntoN = { value: '6', viewValue: 'EXPEDIENTE' };
    console.log("Consulta del radicado ...");
    this.radicadoService.consultaRadicado(this.data.radicado).subscribe(x => {
      x;
      console.log(' Consulta radicado ', x);
      let ll: string = '';
      this.asuntoN = { value: '6', viewValue: x.asunto_radicacion };
      console.log(' Consulta radicado  asunto :: ', this.asuntoN);
      //   this.asuntoSelected = [x.asunto_radicacion, x.asunto_radicacion];
      this.asuntoSelected = { value: x.asunto_radicacion, viewValue: x.asunto_radicacion };
      // this.sectorSelected = [x.sector_reportado, x.sector_reportado];
      this.sectorSelected = { value: x.sector_reportado, viewValue: x.sector_reportado };
      // this.localidadSelected = [x.localidad, x.localidad];
      this.localidadSelected = { value: x.localidad, viewValue: x.localidad }
      // this.estadoTramiteSelected = [x.estado_tramite, x.estado_tramite];
      this.estadoTramiteSelected = { id: x.estado_tramite, nombre: 'x.estado_tramite' };
      this.estadoTramite = x.estado_tramite;
      this.consultaListaObsEstadTramite(this.estadoTramite);
      //   this.estObserSelected = [x.observaciones_estado_tramite, x.observaciones_estado_tramite];
      this.estObserSelected = { id: -1, observacion: x.observaciones_estado_tramite };
      this.objectid = x.objectid,
        this.radicado = x.radicado,
        this.fechaRadicacion = x.fecha_radicado

      // this.patientCategory

    });

    //**************

  }


  onEstadoSelection1() {
    console.log('Cambia el estado del trámite :::: ', this.estadoTramiteSelected.id);
    this.consultaListaObsEstadTramite(this.estadoTramiteSelected.id);
  }

}
