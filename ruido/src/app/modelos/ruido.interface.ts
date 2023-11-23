import { timestamp } from "rxjs";
import { EvaEtiquetado, FavEtiquetaColor, Informacionvehiculo, Propietariovehiculo } from "./login.interface";

/*
export interface ConsultaVisita {
  fechaInicial: Date;
  fechaFinal: Date;
  radicado: string;
  vistaSistema: string;  // la vista del sistema puede ser: "PQRS por Localidad" -- "Estado Del Trámite"  -- "Provisionales" 
  direccion: string;    //  dirección de ubicación:  CL 52 No. 23 - 25  
} */

export class ConsultaVisita {
  fechaInicial: Date = new Date();
  fechaFinal: Date = new Date();;
  radicado: string = '';
  vistaSistema: string = '';  // la vista del sistema puede ser: "PQRS por Localidad" -- "Estado Del Trámite"  -- "Provisionales" 
  direccion: string = '';    //  dirección de ubicación:  CL 52 No. 23 - 25  
  localidad: string = '';    // localidad: Usme, Ciudad Bolivar
  
  tipoPredio : string = '';
  tipoChart : string = GRAFICA_TIPO_PIE;
  isCbCVencido : boolean = false;
  isCbCPxVenci : boolean = false;
  isCbCPxSinVe : boolean = false;
  peticionario : string = '';
  
  estadoTramite : string = '';
  observacionEstadoTramite : string = '';
}

export class Sbccalidad {
  idsbccalidad : Number = new Number("100");
  variable : String = new String();
  valormaximo : Number = new Number("100");
  valorminimo : Number = new Number("100");
}

export interface RuiSector {
  idSector: number;
  nombre: string;
}

export interface RuidoSector {
  value: string;
  viewValue: string;
}

export interface RdoAsunto {
  value: string;
  viewValue: string;
}
export interface RdoEstado {
  idEstado: number;
  nombre: string;
}

export interface RdoEstadoTramite{
  id: number;
  nombre: string;
}

export interface ObserEstTramite {
  id: number;
  observacion: string;
}

export interface RdoProfesional {
  idProfesional: number;
  nombre: string;
}

export interface Modulousuario {
  usuario: string;
  modulo: string;
}


export interface RuiLocalidad {
  idLocalidad : number, 
  nombre: string;
}

export interface RuidoLocalidad {
  value :string ;
  viewValue : string;
}

export interface RdoTipopredio {
  idtipopredio : number, 
  nombre: string;
}

export interface SectorReportadoPqrs{
  Id : number, 
  sector_reportado: string;
}

export interface ChartLocalidad{
  name : string;
  value : number;
}

export interface ChartGenerico {
  name : string;
  value : number;
}

export interface ChartBarVertical2D {
  name : string;
  series : ChartGenerico[] ;
}  

export interface RdoVisita {
  idvisita?: number;
  profesional ?: string;
  radicado ?: string;
  fechavisita ?: Date;
  estadovisita?: string;
  numeroexpediente?: number;
  horariovisita?: string;
  direccion?: string;
  latitud?: number;
  longitud?: number;

}

export interface Pqrs {
  objectid : number;
  radicado : string ;   
   fecha_radicado : Date ;   
   asunto_radicacion : string; 
   razon_social_establecimiento?: string; 
   sector_reportado : string; 
   localidad: string; 
   entidad_de_control?: string;  
   peticionario?: string; 
   estado_tramite: number; 
   observaciones_estado_tramite : string; 
   observaciones_generales?: string; 
   profesional_1ra_asignacion?: string; 
   fecha_1ra_asignacion?: Date; 
   profesional_2da_asignacion?: String; 
   fecha_2da_asignacion?: Date; 
   profesional_diligencia?: string; 
   x?: number; 
   y?: number; 
   direccion?: string; 
   complemento_direccion?: string ; 

  // shape?: string; 

}

export interface  PqrsDTO {
 
  radicado : string;   
  direccion?: string;  
   
   razon_social_establecimiento?: string; 
   sector_reportado : string; 
   localidad: string; 
   entidad_de_control?: string;  
   asunto_radicacion : string; 
   peticionario?: string; 
   estado_tramite: number; 
   observaciones_estado_tramite : string; 
   observaciones_generales?: string; 
   profesional_1ra_asignacion?: string; 
   fecha_1ra_asignacion?: Date; 
   profesional_2da_asignacion?: String; 
   fecha_2da_asignacion?: Date; 
   profesional_diligencia?: string; 
   x?: number; 
   y?: number; 
  
   complemento_direccion?: string ; 
   diasDeVencido?: number ; 
   banderaVencimiento?: string ; 
   estadoTramiteStr ?: string ; 
   fechaVisita ?: string ; 
   estadoVisita  ?: string ; 
   cantidad_de_reprogramaciones  ?: string ; 
   horario  ?: string ; 
   fecha_radicado?: Date;  
   objectid : number;

  // shape?: string; 

}



export interface Visitas {

  id ?: number;
  objectid ?: number;
  año?: number;
  mes?: string; 
  latitud?: number;
  longitud?: number;
  profesional_encargado?: string;
  radicado?: string;
  actividad_a_realizar_segun_plan?: number;
  estado_de_la_visita?: string;
  solo_si_la_visita_no_fue_efecti?: string;
  solo_si_la_visita_fue_efectiva_?: string;
  gestion?: string;
  observaciones_al_motivo?: string;
  numero_de_expediente?: number;
  proceso_actuacion_tecnica_o_res?: string;
  nombre_comercial?: string;
  razon_social?: string;
  codigo_ciiu?: number;
  matricula_mercantil?: string;
  nit?: string;
  representante_legal?: string;
  numero?: string;
  telefono?: string;
  direccion__via_?: number;
  direccion__numero_?: string;
  direccion__letra_?: string;
  direccion__bis_?: number;
  direccion__cuadrante_?: string;
  direccion__numero1?: number;
  direccion__letra1?: string;
  direccion__bis1?: string;
  direccion__placa_?: string;
  direccion__cuadrante1?: number;
  tipo?: number;
  tipo_de_predio_generador_de_la_?: number;
  actividad_especifica?: string;
  localidad?: number;
  upz?: string;
  cumplimiento_normativo?: string;
  horario_de_la_visita?: string;
  lequemision_n_db_a_?: number;
  sellamiento_codigo_de_la_polici?: number;
  valor_para_comparar_con_la_norm?: number;
  visita_programada?: number;
  area_de_actividad_segun_sinupot?: number;
  observaciones_de_area_de_activi?: string;
  tipo_documento?: string;
  direccion?: string;
  municipio?: string;
  barrio?: string;
  orig_fid?: number;
  globalid?: string;
  fechavisita?:Date;
}   


export const PQRS_POR_LOCALIDAD: string = 'PQRS por Localidad :: PQR';
export const CONS_POR_DIRECCION: string = 'Consulta por Dirección :: PQR';
export const CONS_POR_ESTADOTRA: string = 'Estado Del Trámite ::  PQR'; 
export const CONSUL_TIPO_PREDIO: string = 'Tipo de Predio :: Visita';
export const CONS_NO_ES_COMPETE: string = 'Estado Del Trámite NO es competencia ::  PQR';  
export const CON_PROVISIONAL_ET: string = 'Estado Del Trámite Provisional ::  PQR'; 
export const PREDIO2D_NORMATIVI: string = 'Cumplimiento Normativo - Predio Generador ::  Visita'; 
export const CS_ORGANIS_CONTROL: string = 'Organismo de Control ::  PQR'; 
export const CS_MODULO_ALERTAS: string = 'Módulo de Alertas :: '; 
export const GRAFICA_TIPO_PIE: string = 'Torta'; 
export const GRAFICA_TIPO_BAR: string = 'Barra'; 
export const VISITA_NO_EF_REP: string = 'VISITA :: No Efectiva - Reprogramar'; 
export const PQR_REP_PETICION: string = 'PQR :: Reporte Por Peticionario'; 
export const PQR_REP_ANTECEDE: string = 'PQR :: Reporte de Antecedentes'; 
export const PQR_ULTIMOS_50_R: string = 'Ultimos 50 Radicados'; 


export const ESTADO_TRAMITE_NO_ES_COMPETENCIA : number = 9;
export const NO_ES_COMPETENCIA = "NO ES COMPETENCIA";


export const FAV_ETIQUETA_COLOR: FavEtiquetaColor[] = [
  {id:'NARANJA' , nombre:'NARANJA'},
  {id:'GRIS' , nombre:'GRIS'},
  {id:'AMARILLO' , nombre:'AMARILLO'},
  {id:'VERDE' , nombre:'VERDE'},
  {id:'AZUL' , nombre:'AZUL'},
]

export const FAV_ETIQUETA_COL: FavEtiquetaColor = 
  {id:'NARANJA' , nombre:'NARANJA'};
  
//9999999999999999999999999999999999999999rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

export const PROPIETARIOVEHICULO : Propietariovehiculo = {
  idevapropvehi: 1,
  nombre1: '',
  nombre2: '',
  apellido1: '',
  apellido2: '',
  placa: '',
  identificacion: '',
  tipoidentifica: -1,
  email : '@',
}

export const CONSULTA_VISITA : ConsultaVisita = new ConsultaVisita();

export const CIUDADANO : string = 'CIUDADANO' ;
export const PASSWDCIUDADANO : string = 'PASSWDCIUDADANO' ;

export const VEHICULO_PESADO_CARGA : string ='Vehículo pesado de carga';
export const VEHICULO_TRANS_PUBL_PASAJER_URBANO : string ='Vehículos de transporte público de pasajeros urbano';

export const EVA_ETIQUETADO : EvaEtiquetado = {
  clasepapa : '' , 
  clase : '' ,  
  combustible : '' ,
  modelo : '' , 
  estandaremision : '' ,
  cilindrada : '' , 
  indiceetiquetado : -1,
  fe_co : -1,
  fe_thc : -1,
  fe_nox : -1,
  fe_pm : -1,
  fe_co2 : -1,
  fe_ch4 : -1,
  fe_co2eq : -1,
  pn : -1, 
  pm_llsp : -1,
  opa : -1,  
  fav : -1,
  etiquetado : '',   
  tipologiavehicular : ''
}

export const INFO_VEHICULO : Informacionvehiculo = {idevapropvehi: -1,
  placa: '',
  tipologiaVehicular: '',
  tipoServicio: '',
  tipoCombustible: '',
  cilindraje: '',
  marca: '',
  linea: '',
  modelo: '',
  fechaImportacion: new Date,
  capacidadCarga: '',
  capacidadPasajeros : '',
  claseVehiculo: '',
  numeroMotor: '',
  vin: '',
  ciudadMatricula: '',
  vigenciaRTM: '',
  tecnRedEmision: '',
  estEmisiVehic: '',
  subContEmision: '',
  determin_FAV: '',
  asoc_FAV_COLOR: '',
  densidad_HUMO: 0,
  cum_LIM_D_HUMO: '',
  con_MAT_PARTIC: 0,
  con_NUM_PARTIC: 0,
  color_ETIQUETA: '',
  fecha_ETIQUETA: new Date,
  fecha_VIG_FIN_ETIQUETA: new Date,




}





//export const CONSUL_po: string = 'PQRS por Localidad'; 

