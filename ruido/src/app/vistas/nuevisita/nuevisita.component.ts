import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConsultaVisita, Pqrs, RdoProfesional, RdoVisita, Visitas } from 'src/app/modelos/ruido.interface';
import { ProfesionalService } from 'src/app/servicios/profesional.service';
import { VisitaruidoService } from 'src/app/servicios/visitaruido.service';
import {  ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { DateFilterFn } from '@angular/material/datepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-nuevisita',
  templateUrl: './nuevisita.component.html',
  styleUrls: ['./nuevisita.component.scss']
})
export class NuevisitaComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
 
  toastContainer!: ToastContainerDirective;
  @ViewChild('element') toast: any;
  @ViewChild('element') element: any;
  @ViewChild('someInput') someInput!: ElementRef;

  rangeFilter(date: Date): boolean {
    let currentDate: Date = new Date();
    let includeDatesWithinNextTwentyDays: boolean = date.valueOf() < (currentDate.valueOf() + 20*60*60*1000*24);
    return includeDatesWithinNextTwentyDays;
}



  public position = { X: 'Center' };
  dummyComponent: any;
  profesional: string = 'xx___';
  listProfesional: RdoProfesional[] = [];
  fechaInicial: Date = new Date();
  pqrActual: Pqrs = { radicado: '' }
  toastr: any;

  constructor(private profesionalService: ProfesionalService,
    private visitaRuidoService: VisitaruidoService,
    private toastrService : ToastrService) {


  }

  ngOnInit(): void {
    this.consultaListaProfesionales();
    setTimeout(() => this.toastr.success('sup'))
    this.toastrService.overlayContainer = this.toastContainer;
    this.visitaRuidoService.pqrObserv.subscribe(x => {
      this.pqrActual = x;
      this.toastrService.overlayContainer = this.toastContainer;
      //  888888888888888888888888888888888
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

  onCreate(dato : any) {
    this.element.show();
  }

  guardarVisita() {
    console.log('xxxx :: zzzz Fecha Inicial::: >>>', this.fechaInicial);

    let visita: Visitas = {
      
      objectid: 0,
      año: 0,
      mes: '',
      latitud: 0,
      longitud: 0,
      profesional_encargado: this.profesional,
      radicado: this.pqrActual.radicado,
      actividad_a_realizar_segun_plan: 0,
      estado_de_la_visita: '',
      solo_si_la_visita_no_fue_efecti: '',
      solo_si_la_visita_fue_efectiva_: '',
      gestion: '',
      observaciones_al_motivo: '',
      numero_de_expediente: 0,
      proceso_actuacion_tecnica_o_res: '',
      nombre_comercial: '',
      razon_social: '',
      codigo_ciiu: 0,
      matricula_mercantil: '',
      nit: '',
      representante_legal: '',
      numero: '',
      telefono: '',
      direccion__via_: 0,
      direccion__numero_: '',
      direccion__letra_: '',
      direccion__bis_: 0,
      direccion__cuadrante_: '',
      direccion__numero1: 0,
      direccion__letra1: '',
      direccion__bis1: '',
      direccion__placa_: '',
      direccion__cuadrante1: 0,
      tipo: 0,
      tipo_de_predio_generador_de_la_: 0,
      actividad_especifica: '',
      localidad: 0,
      upz: '',
      cumplimiento_normativo: '',
      horario_de_la_visita: '',
      lequemision_n_db_a_: 0,
      sellamiento_codigo_de_la_polici: 0,
      valor_para_comparar_con_la_norm: 0,
      visita_programada: 0,
      area_de_actividad_segun_sinupot: 0,
      observaciones_de_area_de_activi: '',
      tipo_documento: '',
      direccion: '',
      municipio: '',
      barrio: '',
      orig_fid: 0,
      globalid: '',
    fechavisita:this.fechaInicial};

    let rdoVisita: RdoVisita = {
      profesional: this.profesional,
      radicado: this.pqrActual.radicado,
      fechavisita: this.fechaInicial,
      estadovisita: '',
      numeroexpediente: 0,
      horariovisita: '',
      direccion: this.pqrActual.direcciones,
      latitud: 0,
      longitud: 0,
    }

    this.visitaRuidoService.guardaVisitaXX(visita).subscribe( x => {
        x;
        console.log('guarda:: ', visita);
        let contenido = "<div class='e-custom'>Take a look at our next generation <b>Javascript</b> <a href='https://ej2.syncfusion.com/home/index.html' target='_blank'>LEARN MORE</a></div>";
        let options= { closeButton:true, tapToDismiss:false, titleClass:'red' ,  timeOut: 3000, progressBar:true, enableHtml:true};
        
        this.toastrService.success('Visita Guardada', visita.radicado, options).onTap.subscribe(() => this.toasterClickedHandler());
        let consultaVisita : ConsultaVisita = {fechaInicial:new Date(), fechaFinal:new Date(), radicado : visita.radicado, vistaSistema:''};
        this.visitaRuidoService.setConsultaVisitaV(consultaVisita);
        this.visitaRuidoService.actualizaInfoVisiPorRadicado(consultaVisita);

        // con esto actualiza el behavior subject ...
          // y debería actualizarse el componente y en la pantalla aparece a este radicado el histórico de visitas.

        //.subscribe(x => {
          //x;
          //console.log('actualizacion del objeto:: ',x);          
        // });
     
       // ******

    });

  }

  toasterClickedHandler() {
    console.log('Toastr clicked');
  }

  dateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  myFilter(d: Date): boolean {
		const day = d.getDay();
    const month = d.getMonth();
		const todays_date = d.getDate();
		const todaysDateObject = new Date();
		const today = todaysDateObject.getDate();
    const actualMonth = todaysDateObject.getMonth();
    console.log(todays_date)

    	/** Prevent actual system date from being selected.*/
    if (month === actualMonth && todays_date === today) {
      return false;
    } else if (day !== 0 && day !== 6) {
      return true;
    } else {
      return false;
    }


  
}


myFilterx = (d: Date  |null ): boolean => {
  const day = (d || new Date()).getDay();
  // Prevent Saturday and Sunday from being selected.
  return day !== 0 && day !== 6;
};

}